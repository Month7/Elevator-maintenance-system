var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//数据库连接
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'graduction'
  })
connection.connect();
// utils
var transfromData = (oldData) => {
  var nameArr = oldData.name.split(',');
  var phoneArr = oldData.phone.split(',');
  var letterArr = oldData.firstletter.split(',');
  var res = {}
  for(var i=0;i<letterArr.length;i++){
      var obj = {};
      obj['name'] = nameArr[i];
      obj['phone'] = phoneArr[i];
      var arr = [];
      arr.push(obj);
      if(arr[0] == ','){
        arr.unshift();
      }
      if(!res[letterArr[i]]){
          res[letterArr[i]] = arr
      } else{
        var obj2 = {};
        obj2['name'] = nameArr[i];
        obj2['phone'] = phoneArr[i];
        var arr2 = res[letterArr[i]]
        arr2.push(obj2);
        if(arr2[0] == ','){
          arr2.unshift();
        }
        res[letterArr[i]] = arr2;
      }
  }
  return JSON.stringify(res);
} 
var deleteStr = (name,arr) => {
  var index = arr.indexOf(name);
  arr.splice(index,1);
  return arr.join(',');
} 
// 查询联系人信息
router.get('/info',function(req,res,next){
  var { token,username } = req.query;
  var sql = `select token from user where username='${username}'`;
  connection.query(sql,function(err,result){
    // 验证token失败
    if(token != result[0].token) {
      return;
    }
    sql = `select * from address where username='${username}'`;
    connection.query(sql,function(err,result){
      if(err){
        res.send({
          code: -1,
          msg: '登录信息失效，请重新登录!'
        })
        return;
      }
      var data = result[0];
      if(data.name && data.phone && data.firstletter && data.username) {
        res.send({
          code: 0,
          data: transfromData(data)
        })
      } else {
        res.send({
          code: 2
        })
      }
    })
  })
})

// 添加联系人
router.post('/add',function(req,res,next){
  var token = req.body.token,
      username = req.body.username,
      name2 = req.body.name,
      phone2 = req.body.phone,
      firstLetter2 = req.body.firstLetter;
  var sql = `select token from user where username='${username}'`;
  connection.query(sql,function(err,result){
    if(token != result[0].token) {
      return;
    }
    sql = `select * from address where username='${username}'`;
    connection.query(sql,function(err,result){
      if(err){
        console.log('查询出错')
        return
      }
      var data = result[0];
      var nameArr = data.name.split(',');
      var phoneArr = data.phone.split(',');;
      var letterArr = data.firstletter.split(',');
      nameArr.push(name2);
      phoneArr.push(phone2)
      letterArr.push(firstLetter2);
      var name = nameArr.join(','),
          phone = phoneArr.join(','),
          letter = letterArr.join(',');
      sql = `update address set name='${name}',phone='${phone}',firstletter='${letter}' where username='${username}'`;
      connection.query(sql,function(err,result){
        res.send({
          code: 0,
          msg: '成功添加联系人'
        })
      })
    })
  })
})
// 删除联系人
router.post('/delete',function(req,res,next){
  var {token,username,name2,phone2,firstLetter2 } = req.body
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
      var data = result[0];
      var nameArr = data.name.split(',');
      var phoneArr = data.phone.split(',');
      var letterArr = data.firstletter.split(',');
      var newNameStr = deleteStr(name2,nameArr);
      var newPhoneStr = deleteStr(phone2,phoneArr);
      var newLetterStr = deleteStr(firstLetter2,letterArr);
      sql = `update address set name='${newNameStr}',phone='${newPhoneStr}',firstletter='${newLetterStr}' where username='${username}'`
      connection.query(sql,function(err,result){
        if(err){
          res.send({
            code: -1,
            msg: '删除失败'
          })
          return;
        }
        res.send({
          code: 0,
          msg: 'success'
        })
      })
    })
  })
})

module.exports = router;