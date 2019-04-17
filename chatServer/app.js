'use strict'
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
    res.send('如果你看到这行字，说明尹铮的聊天室服务器正常运行中');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('sendMsg',function(msg){
    io.emit('recMsg',msg)
    console.log(msg+'发送成功!');
  })
});

http.listen(3004, function(){
  console.log('listening on *:3004');
});