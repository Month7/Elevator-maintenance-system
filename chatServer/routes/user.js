var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// /* GET home page. */
// router.get('/login', function(req, res, next) {
//   res.send('login success')
// });

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

module.exports = router;