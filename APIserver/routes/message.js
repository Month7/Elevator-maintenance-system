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

var transfromData = (oldData,content) => {
	var arr = oldData.split(',');
	arr.push(content);
	return arr.join(',');
}
// 0 取最后一条聊天记录 1 取所有的聊天记录
var transfromMessageData = (oldData,type) => {
	var newData = [];
	for(let i=0;i<oldData.length;i++){
		var content = oldData[i].content.split(',');
		var len = content.length - 1;
		var data = {};
		var data2 = {};
		
		if(type == 0) {
			data2['username'] = oldData[i].sendname
			data['author'] = data2;
			data['content'] = content[len];
			newData.push(data);
		} else {
				for(let j=0;j<content.length;j++){
				// console.log(oldData[i]);
				var arr = [];
				var data = {};
				var data2 = {};
				data2['sendName'] = oldData[i].sendname;
				data2['receiveName'] = oldData[i].username;
				data['author'] = data2;
				data['content'] = content[j];
				newData.push(data);
			}
		}
		
		
	}
	return newData;
}
// add聊天记录
router.post('/add',(req,res,next) => {
    var { username,sendName,token,content,receiveName } = req.body;
    var sql = `select token from user where username='${username}'`;
    connection.query(sql,function(err,result){
        // 验证token失败
        if(token != result[0].token) {
          res.send({
            code: -1,
              msg: '登录信息失效,请重新登录!'
            })
          return;
        } else {
					sql = `select content from message_${username} where sendname='${sendName}'`;
					connection.query(sql,function(err,result){
						if(result[0].content == undefined){
							sql = `insert into message_${username} (sendname) values ('${sendName}')`;
							connection.query(sql,function(err,result){
								var oldData = result[0].content;
								var newData = transfromData(oldData,content)
								sql = `update message_${username} set content='${newData}' where sendname='${sendName}'`
								connection.query(sql,function(err,result){
									if(err) return;
									res.send({
										code: 0,
										msg: 'success'
									})
								})
							})
						} else {
							var oldData = result[0].content;
							var newData = transfromData(oldData,content)
							sql = `update message_${username} set content='${newData}' where sendname='${sendName}'`
							connection.query(sql,function(err,result){
								if(err) return;
								res.send({
									code: 0,
									msg: 'success'
								})
							})
						}
					
					})
					
				}
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
	let { username,token,duifangname } = req.query;
	var sql = `select * from message_${username} where sendname='${duifangname}'`
	connection.query(sql,(err,result) => {
		res.send({
			code: 0,
			data: transfromMessageData(result,1)
		})
	})
})

module.exports = router;