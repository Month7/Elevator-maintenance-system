var express = require('express');
var router = express.Router();
const app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'APIserverY' });
});
router.post('/login',function(req,res,next){
  var result = false;
  var loginname = req.params.loginname;
  if(loginname == '123456'){
    result = true;
  }
  res.send(result);
  return;
})
router.get('/message', function(req, res, next) {
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
res.header('Access-Control-Allow-Origin', '*');
res.send(data);
});

const server = app.listen(3000, function () {
  console.log('Express app server listening on port %d', server.address().port);
});

module.exports = router;
