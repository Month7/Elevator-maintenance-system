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

var transfromData = (oldData) => {
  var nameArr = oldData.name.split(',');
  var phoneArr = oldData.phone.split(',');;
  var letterArr = oldData.firstletter.split(',');
  var res = {}
  for(var i=0;i<letterArr.length;i++){
      var obj = {};
      obj['name'] = nameArr[i];
      obj['phone'] = phoneArr[i];
      var arr = [];
      arr.push(obj);
      if(!res[letterArr[i]]){
          res[letterArr[i]] = arr
      } else{
        var obj2 = {};
        obj2['name'] = nameArr[i];
        obj2['phone'] = phoneArr[i];
        var arr2 = res[letterArr[i]]
        arr2.push(obj2);
        res[letterArr[i]] = arr2;
      }
  }
  return JSON.stringify(res);
}

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
      res.send(transfromData(result[0]))
    })
  })
  
})

module.exports = router;