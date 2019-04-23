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
// 获得电梯信息
router.get('/getInfo',function(req,res,next){
    var token = req.query.token;
    var username = req.query.username;
    var status = req.query.status;
    var sql = `select token from user where username='${username}'`;
    connection.query(sql,function(err,result){
        // 验证token失败
        if(token != result[0].token) {
            res.send({
                msg: '登录信息失效,请重新登录!'
            })
            return;
        }
        sql = `select * from elevator where status='${status}'`;
        connection.query(sql,function(err,result){
            if(err) return;
            var data = [];
            for(var i=0;i<result.length;i++){
                var obj = {
                    code: result[i].code,
                    statement: result[i].statement,
                    xiafatime: result[i].xiafatime,
                    baoyangtime: result[i].baoyangtime,
                    pingjiatime: result[i].pingjiatime,
                    location: result[i].location
                }
                data.push(obj);
            }
            res.send(JSON.stringify(data));
        })
    })
})
// 领取任务
router.post('/receive',function(req,res,next){
    var code = req.body.code;
    var sql = `update elevator set status='2' where code='${code}'`;
    connection.query(sql,function(err,result){
        console.log(result);
        if(err){
            res.send({
                code: 1,
                msg:'领取任务失败'
            })
            return;
        }
        res.send({
            code: 0,
            msg:'领取任务成功'
        })
        return;
    })
})


module.exports = router;