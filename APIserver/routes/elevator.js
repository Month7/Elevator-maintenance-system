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
// 获得电梯信息
router.get('/getInfo',function(req,res,next){
    var { token,username,status } = req.query;
    var sql = `select token from user where username='${username}'`;
    connection.query(sql,function(err,result){
        // 验证token失败
        if(token != result[0].token) {
            res.send({
                code: -1,
                msg: '登录信息失效,请重新登录!'
            })
            return;
        }  // 改switch
        if(status == 6) {           // 是管理员
            sql = `select * from elevator`;
        } else if(status == 0){           // 保养完成的电梯 包含已评价和未评价两种状态
            sql = `select * from elevator where status between '0' and '1'`;
        } else if(status == 3){           // 保养中 只能保养负责人查看
            sql = `select * from elevator where status='3' and headman='${username}'`;
        } else if(status == 7){  // 待评价
            sql = `select * from elevator where status='0'`;
        } else if(status == 8){ // 管理员评价记录
            sql = `select * from elevator where status='1'`;
        } else {                          
            sql = `select * from elevator where status='${status}'`;
        }
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
                    location: result[i].location,
                    status: result[i].status,
                    score1: result[i].score1,
                    score2: result[i].score2
                }
                data.push(obj);
            }
            res.send({
                code: 0,
                data: data
            })
            
        })
    })
})
// 领取任务
router.post('/receive',function(req,res,next){
    var { username,token,code } = req.body;
    var sql = `select token from user where username='${username}'`;
    connection.query(sql,function(err,result){
        if(err) {
            res.send({
                code: -1,
                msg: '登录信息失效，请重新登录!'
            })
        }
        if(token != result[0].token) {
            res.send({
                code: -1,
                msg: '登录信息失效,请重新登录!'
            })
            return;
        }
        sql = `update elevator set status='3',headman='${username}' where code='${code}'`;
        connection.query(sql,function(err,result){
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
})
// 完成任务
router.post('/complete',function(req,res,next){
    var code = req.body.code;
    var sql = `update elevator set status='1' where code='${code}'`;
    connection.query(sql,function(err,result){
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
// 下达任务
router.post('/assign',function(req,res,next){
    var { username,token } = req.body;
    var sql = `select token from user where username='${username}'`;
    // 验证登录
    connection.query(sql,function(err,result){
        if(err) {
            return;
        }
        var { statement,status,wanchengtime,code,location,xiafatime} = req.body;
        sql = `insert into elevator(status,code,location,statement,xiafatime,wanchengtime) values`+
        ` ('${status}','${code}','${location}','${statement}','${xiafatime}','${wanchengtime}')`;
        connection.query(sql,function(err,result){
            if(err) {
                res.send({
                    code: -1,
                    msg: '电梯编号重复!'
                })
                return;
            }
            res.send({
                code: 0,
                msg: '下达任务成功'
            })
        })
    })
})
// 删除任务
router.post('/delete',function(req,res,next){
    var { code,username,token } = req.body;
    var sql = `select token from user where username='${username}'`;
    connection.query(sql,function(err,result){
        if(err) {
            return;
        }
        sql = `delete from elevator where code='${code}'`;
        connection.query(sql,function(err,result){
            if(err){
                res.send({
                    code: -1,
                    msg: '删除任务失败!'
                })
                return;
            }
            res.send({
                code: 0,
                msg: '删除任务成功!'
            })
        })
    }) 
})

// 提交评价结果
router.post('/evaluate',function(req,res,next){
    var { username,token,score1,score2,code,content,pingjiatime } = req.body;
    var sql = `select token from user where username='${username}'`;
    // 验证登录
    connection.query(sql,function(err,result){
        if(err) {
          return;
        }
        sql = `update elevator set score1='${score1}',score2='${score2}',pingjia='${content}',status='1',pingjiatime='${pingjiatime}' where code='${code}'`;
        connection.query(sql,function(err,result){
            if(err) {
                return;
            }
            res.send({
                code: 0,
                msg: 'success'
            })
        })
    })

})

module.exports = router;