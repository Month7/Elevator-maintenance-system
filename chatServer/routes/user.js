var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// /* GET home page. */
router.get('/login', function(req, res, next) {
  res.send('login success')
});

//数据库连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'graduction'
  })
connection.connect();

// 生成随机token
var createToken = function () {
    return Math.random().toString(36).substr(2);
}
// 登录接口
router.post('/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
    if(username == undefined || password == undefined){
      return;
    }
    var token = createToken();
    var sql = `select password from user where username='${username}' and type='${type}'`
    connection.query(sql,function(err,result){
      if(err){
        // console.log(sql)
        // console.log('查询出错');
        // console.log(err);
        res.send({
          isSuccess: false,
          msg: '用户不存在!'
        })
      } else {
        // 密码验证成功
        if(result[0].password == password) {
          var sql = "update user set token='".concat(token, "' where username='").concat(username, "'");
          connection.query(sql,function(err,result){
            if(err){
              console.log('设置token出错');
              console.log(sql);
              console.log(err);
            } else {
              var resData = {
                isSuccess: true,
                token: token,
                msg: '登录成功'
              }
              res.send(resData);
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
  if(!phone && !password && !type) {
    return;
  } else {
    let sql = `insert into user (username,password,type) values ('${phone}','${password}','${type}')`;
    connection.query(sql,function(err,result){
      if(err){
        
      } else {  // 注册成功
        res.send({
          retCode: 0,
          msg: 'success'
        })
      }
    })
  }
})

module.exports = router;