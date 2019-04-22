var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//数据库连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'graduction'
  })
connection.connect();

router.get('/info',function(req,res,next){
  var token = req.query.token;
  var username = req.query.username;
  
  var sql = `select token from user where username='${username}'`;
  connection.query(sql,function(err,result){
    // 验证token失败
    if(token != result[0].token) {
      return;
    }
    sql = `select * from address where username='${username}'`;
    connection.query(sql,function(err,result){
      if(err){
        console.log('查询出错')
      }
      var data =  {
        username: '18000351426',
        name: '东哥,雷军',
        phone: '1800031425,18000351426' }
      var nameStr = result[0].name;
      var nameArr = nameStr.split(',');
      var phoneStr = result[0].phone;
      var phoneArr = nameStr.split(',');
      console.log(result[0]);
    })
  })
  
})

module.exports = router;