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

// 发布新公告
router.post('/submit',(req,res)=>{
  var { username,token,content,time,title } = req.body;
  var sql = `select token from user where username='${username}'`;
  connection.query(sql,(err,result) => {
    // 验证token失败
    if(token != result[0].token) {
      res.send({
        code: -1,
        msg: '登录信息失效,请重新登录!'
      })
      return;
    } else {
      sql = `insert into notice (time,content,title) values ('${time}','${content}','${title}')`;
      connection.query(sql,(err,result) => {
        if(err){
          res.send({
            code: -1,
            msg: '发布新公告失败'
          })
          return;
        }
        res.send({
          code: 0,
          msg: '发布成功!'
        })
      })
    }
  })
})

// 查询公告内容
router.get('/info',(req,res) => {
  var { username,token } = req.query;
  var sql = `select token from user where username='${username}'`;
  connection.query(sql,(err,result) => {
    if(token != result[0].token) {
      res.send({
        code: -1,
        msg: '登录信息失效,请重新登录!'
      })
      return;
    } else {
      sql = `select * from notice`,
      connection.query(sql,(err,result) => {
        if(err){
          res.send({
            code: -1,
            msg: '登录信息失效,请重新登录!'
          })
          return;
        }
        result.sort((a,b)=>{
          return b.time - a.time
        })
        res.send({
          code: 0,
          data: result
        })
        
      })
    }
  })
})

module.exports = router;