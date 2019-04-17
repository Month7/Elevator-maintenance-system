const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
  app.get('/message', function(req, res, next) {
    var data = {
      "messages":[{
          "has_read": "false",
          "author": {
              "username": "Pony马",
              "avatar_url": "../../static/头像.jpg"
          },
          "content": "你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了..."
      }]
  }
  
  res.send(data);
  });

app.listen(3000, () => console.log('Example app listening on port 3000!'))