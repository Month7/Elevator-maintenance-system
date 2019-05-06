var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multipart = require('connect-multiparty'); // form-data 格式的中间件支持
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
smtpTransport = nodemailer.createTransport(smtpTransport({
  host: "smtp.163.com",
  secureConnection: true,
  prot: 465,
  auth: {
    user: '18000351426@163.com',
    pass: 'ni cai ya'
  }
}));
// 腾讯云短信接口
// var QcloudSms = require("qcloudsms_js");

// var multer  = require('multer')

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
  for(var i=0;i<6;i++){
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
    html: `<div>您的验证码为${code}</div>`
  }, function (error, response) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log('发送成功');
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
          isSuccess: false,
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
                isSuccess: true,
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
  var phone = req.body.phone;
  var password = req.body.password;
  var type = req.body.type;
  var token = createToken();
  if(!phone && !password && !type) {
    return;
  } else {
    let sql = `insert into user (username,password,type,avat_url,token) values ('${phone}','${password}','${type}','null','${token}')`;
    connection.query(sql,function(err,result){
      if(err){
        console.log('出错!');
      } else {  // 注册成功
        createTable(phone,res);
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
        res.send(JSON.stringify(data));
      })
    }
  })
})

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
module.exports = router;