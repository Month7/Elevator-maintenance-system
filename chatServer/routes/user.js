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

router.post('/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    if(username == undefined || password == undefined){
      return;
    }
    var token = createToken();
    var sql = "select password from user where username='".concat(username, "'");
    connection.query(sql,function(err,result){
      if(err){
        console.log(sql)
        console.log('查询出错');
        console.log(err);
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
              res.send(token);
              return;
            }
          })
        }
        // console.log(result[0].password);
        
      }
    })
  })

module.exports = router;