var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multipart = require('connect-multiparty'); // form-data 格式的中间件支持
var multipartMiddleware = multipart();
var fs = require('fs');
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport(smtpTransport({
  host: "smtp.163.com",
  secureConnection: true,
  prot: 465,
  auth: {
    user: '18000351426@163.com',
    pass: 'your code'
  }
}));
// 腾讯云短信接口
// var QcloudSms = require("qcloudsms_js");

//数据库连接
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'graduction'
  })
connection.connect();

// 生成随机token
var createToken =  () => {
    return Math.random().toString(36).substr(2);
}
// 生成随机验证码
var createCode = () => {
  var res = '';
  for(let i=0;i<6;i++){
    res += parseInt(Math.random()*10)
  }
  return res;
}
// 聊天记录建表
var createTable = (username,res) => {
  var sql = `create table message_${username}(
    content varchar(255),
    username varchar(255),
    sendname varchar(255)
  ) `;
  connection.query(sql,function(err,result){
    if(err){
      console.log(err);
      return;
    }
    res.send({
      code: 0,
      msg: '注册成功!'
    })
  })
} 

var code = null;
// 邮箱验证码接口
router.post('/email',(req,res)=>{
  var { email } = req.body;
  code = createCode();
  smtpTransport.sendMail({
    from: '18000351426@163.com',
    to: email,
    subject: '感谢注册电梯保',
    html: `<div>您的验证码为${code},6分钟内有效</div>`
  }, function (error, response) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log(response);
      if(!timer) {     // 验证码有效期 3min 
        var timer = setTimeout(()=>{
          code = null;
          clearTimeout(timer);
        },360000)      
      }
      res.send({
        code: 0,
        msg: '发送邮箱验证码成功!'
      })
    }
  });
})
// 验证验证码接口
router.post('/code',(req,res) => {
  var { code2 } = req.body;
  if(code2 == code) {
    res.send({
      code: 0,
      msg: 'success'
    })
    return;
  } else {
    res.send({
      code: -1,
      msg: '验证码错误!'
    })
    return;
  }
})
// 登录接口
router.post('/login',function(req,res,next){
    var { username,password,type } = req.body;
    if(username == undefined || password == undefined){
      return;
    }
    var token = createToken();
    var sql = `select password from user where username='${username}' and type='${type}'`
    connection.query(sql,function(err,result){
      if(err){
        res.send({
          isSuccess: false,
          msg: '用户不存在!'
        })
        return;
      } else if(result == undefined || result[0] == undefined){
        res.send({
          code: -1,
          msg: '用户不存在!'
        })
        return;
      } else {
        // 密码验证成功
        if(result[0].password == password) {
          var sql = "update user set token='".concat(token, "' where username='").concat(username, "'");
          connection.query(sql,function(err,result){
            if(err){
            } else {
              var resData = {
                code: 0,
                token: token,
                username: username,
                type: type,
                msg: '登录成功'
              }
              res.send(JSON.stringify(resData));
              return;
            }        
          })
        } else {  // 密码错误
          res.send({
            isSuccess: false,
            msg: '密码错误'
          })
        }
      }
    })
  })

// 注册接口
router.post('/register',function(req,res,next){
  let { phone,password,type,email } = req.body;
  var token = createToken();
  var defaultAvatUrl = '../../static/头像.jpg'  // 初始的默认头像
  if(!phone || !password || !type || !email) {
    return;
  } else {
    let sql = `insert into user (username,password,type,avat_url,token,email) values ('${phone}','${password}','${type}','${defaultAvatUrl}','${token}','${email}')`;
    connection.query(sql,function(err,result){
      console.log(err);
      if(err){
        res.send({
          code: -1,
          msg: '注册失败!'
        })
        return;
      } else {  // 注册成功
        // createTable(phone,res);
        sql = `insert into address (name,phone,firstletter,username) values ('系统管理员','18000351426','x','${phone}')`;
        connection.query(sql,(err,result) => {
          var date = Date.parse(new Date());
          sql = `insert into message (content,receiveId,sendId,s_time,avat_url,nickname) values('欢迎加入电梯保,发现什么bug可以和我说蛤,但我不一定会改,也不一定会回你','${phone}','18000351426','${date}','../../static/头像.jpg','系统管理员')`;
          connection.query(sql,(err,result) => {
            res.send({
              code: 0,
              msg: '注册成功'
            })
          })
        })
      }
    })
  }
})

// 查询个人信息接口
router.get('/search',function(req,res,next){
  var { username,type,token } = req.query;
  var sql = `select token from user where username='${username}' and type='${type}'`;
  connection.query(sql,function(err,result){
    if(err){
      res.send({
        code: -1,
        msg: '登录信息失效!请重新登录'
      })
      return;
    } 
    if(!token) {
      res.send({
        code: -1,
        msg: '登录信息失效!请重新登录'
      })
    }
    if(!result[0]){
      return;
    }
    if(token != result[0].token) {
      res.send({
        code: -1,
        msg: '登录信息失效!请重新登录'
      })
    } else {
      sql = `select * from user where username='${username}' and type='${type}'`;
      connection.query(sql,function(err,result){
        var data = {
          username: result[0].username,
          type: result[0].type,
          nickname: result[0].nickname || 'default',
          avat_url: result[0].avat_url
        }
        res.send({
          code: 0,
          data: JSON.stringify(data)
        })
      })
    }
  })
})
// 修改头像接口
router.post('/upload',multipartMiddleware,(req,res,next)=> {
  let { username,token } = req.body;
  var file = req.files.files.originalFilename;
  var oldPath = req.files.files.path;
  fs.rename(oldPath,'./uploads/' + file,(err)=>{
    if(err){
      res.send({
        code: -1,
        msg: '上传头像失败,请重试'
      })
      return;
    } else {
      var sql = `update user set avat_url='http://140.143.34.162:3000/${file}' where username='${username}'`;
      connection.query(sql,function(err,result){
        if(err){
          res.send({
            code: -1,
            msg: '上传头像失败,请重试'
          })
          return;
        }
        res.send({
          code: 0,
          msg: '上传成功!',
          url:  file
        })
      })
    }
  });
})

// 修改昵称接口
router.post('/nick',(req,res) => {
  var { username,token,type,nickname } = req.body;
  var sql = `select token from user where username='${username}' and type='${type}'`;
  connection.query(sql,(err,result) => {
    if(err){
      res.send({
        code: -1,
        msg: '登录信息失效!请重新登录'
      })
      return;
    } else if(token != result[0].token) {
      res.send({
        code: -1,
        msg: '登录信息失效!请重新登录'
      })
    } else {
      sql = `update user set nickname = '${nickname}' where username='${username}'`;
      connection.query(sql,(err,result) => {
        if(err){
          return;
        }
        res.send({
          code: 0,
          msg: 'success'
        })
      })
    }
  })
})

var resetCode = null;
// 重置密码发送邮箱验证码接口
router.post('/resetemail',(req,res) => {
  var { username,email } = req.body;
  var sql = `select email from user where username='${username}'`;
  connection.query(sql,(err,result) => {
    if(err){
      return false;
    }
    if(result[0].email != email) {
      res.send({
        code: -1,
        msg: '该用户不存在或验证邮箱有误!'
      })
      return false;
    }
    resetCode = createCode();
    smtpTransport.sendMail({
      from: '18000351426@163.com',
      to: email,
      subject: '电梯保重置密码',
      html: `<div>您的验证码为${resetCode},3分钟内有效</div>`
    }, function (error, response) {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log('发送成功');
        if(!timer) {     // 验证码有效期 3min 
          var timer = setTimeout(()=>{
            resetCode = null;
            clearTimeout(timer);
          },180000)      
        }
        res.send({
          code: 0,
          msg: '发送邮箱验证码成功!'
        })
      }
    });
  })
})

// 重置密码接口
router.post('/reset',(req,res) => {
  var { username,email,password,code } = req.body;
  if(code != resetCode) {
    res.send({
      code: -1,
      msg: '验证码错误!'
    })
    return false;
  }
  var sql = `update user set password='${password}' where username='${username}' and email='${email}'`;
  connection.query(sql,(err,result) => {
    if(err){ // 给一个错误码假装真的有错误处理
      res.send({
        code: -1,
        msg: '系统出现未知错误,请退出重试 code=7'    
      })
      return;
    }
    res.send({
      code: 0,
      msg: '重置密码成功!'
    })
  })
  // connection.query(sql,(err,result) => {
  //   if(err){ // 给一个错误码假装真的有错误处理
  //     res.send({
  //       code: -1,
  //       msg: '系统出现未知错误,请退出重试 code=7'    
  //     })
  //     return;
  //   }
  //   if(result[0].email != email) {
  //     res.send({
  //       code: -1,
  //       msg: '该用户不存在或验证邮箱有误!'
  //     })
  //     return;
  //   }
  //   sql = `update user set password='${password}' where username='${username}' and email='${email}'`;
  //   connection.query(sql,(err,result) => {
  //     if(err){
  //       return;
  //     }
  //     res.send({
  //       code: 0,
  //       msg: '重置密码成功!'
  //     })
  //   })
  // })
})

module.exports = router;