var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var checkLogin = require('../common/util')

//数据库连接
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'graduction'
  })
connection.connect();

var transfromData = (oldData,content) => {
	var arr = oldData.split(',');
	arr.push(content);
	return arr.join(',');
}


// 0 取最后一条聊天记录 1 取所有的聊天记录
var transfromMessageData = (oldData,type) => {
  var newData = [];
  oldData.sort((a,b)=>{
    return a.s_time < b.s_time
  })
  if(type == 0) {
    var arr = [];        // 记录出现过的发送人id
    for(let i=0;i<oldData.length;i++){
      var obj = oldData[i];
      var sendId = obj['sendId'];
      if(arr.indexOf(sendId) == -1){
        arr.push(sendId);
        var data = {};
        data['username'] = obj['sendId'];
        data['content'] = obj['content'];
        newData.push(data)
      }
    }
  } 
  return newData;
}
// 发送消息 加到聊天记录里
router.post('/send',(req,res) => {
  var { sendname,receivename,sendtime,content } = req.body;
  var sql = `insert into message (content,receiveId,sendId,s_time) values('${content}','${receivename}','${sendname}','${sendtime}')`;
  connection.query(sql,(err,result) => {
    if(err){
      res.send({
        code: -1,
        msg: '发送失败'
      })
      return false;
    }
    res.send({
      code: 0,
      msg: '发送成功'
    })
    return;
  })
})
// 聊天记录(最后一条)
router.get('/messages',(req,res) => {
  var { username,token,type } = req.query;
  if(!checkLogin(connection,username,type,token)){
    res.send({
      code: -1,
      msg: '登录信息失效'
    })
    return;
  }
  var sql = `select * from message where receiveId='${username}'`;
  connection.query(sql,(err,result) => {
    if(err) return;
    res.send({
      code: 0,
      data: transfromMessageData(result,0)
    })
  })
})

// 查询未读消息
router.get('/info',(req,res,next) => {
	var { username,token } = req.query;
	var sql = `select token from user where username='${username}'`;
	connection.query(sql,(err,result) => {
		if(token != result[0].token) {
			res.send({
				code: -1,
					msg: '登录信息失效,请重新登录!'
				})
			return;
		}
		sql = `select * from message_${username}`;
		connection.query(sql,(err,result) => {
			if(err) return;
			res.send({
				code: 0,
				data: transfromMessageData(result,0) 
			})
		})
	})
})

// 聊天记录
router.get('/detail',(req,res) => {
  let { username,token,duifangname,type } = req.query;
  if(!checkLogin(connection,username,type,token)){
    res.send({
      code: -1,
      msg: '登录信息失效'
    })
    return;
  }

  var messagelist = [];
  var sql = `select * from message where sendId='${duifangname}' and receiveId='${username}'`;
	connection.query(sql,(err,result) => {
    messagelist = messagelist.concat(result);
    sql = `select * from message where sendId='${username}' and receiveId='${duifangname}'`
    connection.query(sql,(err,result) => {
      if(err) return;
      messagelist = messagelist.concat(result);
      res.send({
        code: 0,
        data: messagelist
      })
    })
  })
})

module.exports = router;