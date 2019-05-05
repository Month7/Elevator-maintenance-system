
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var express = require('express');

var bodyParser = require('body-parser');
var path = require('path');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var addressRouter = require('./routes/address');
var elevatorRouter = require('./routes/elevator');
var messageRouter = require('./routes/message');
var noticeRouter = require('./routes/notice');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(path.join(__dirname, 'uploads')));

// 数据库连接
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'graduction'
})
connection.connect();
// 将聊天信息到数据库
function saveMsg(){

}

// 主页面
app.get('/', function(req, res){
  res.send('如果你看到这行字，说明尹铮的聊天室服务器正常运行中');
  console.log('应该跑起来了')
});
// 允许跨域 上线前记得去掉
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Credentials',true);
  next();
});

// sockt.io聊天室
io.on('connection', function(socket){
  console.log('a user connected');
  // console.log(socket.id)
  socket.on('sendMsg',function(msg){
    io.emit('recMsg',msg)
    console.log(msg);
  })
});




app.use('/test', indexRouter);
app.use('/user',userRouter);
app.use('/address',addressRouter);
app.use('/elevator',elevatorRouter);
app.use('/message',messageRouter);
app.use('/notice',noticeRouter)


var saveMsgData = (sendName,content,receiveName) => {
  var sql = `update (sendName,content) value('${sendName}','${content}')`;

}

http.listen(3000, function(){
  console.log('listening on *:3000');
});