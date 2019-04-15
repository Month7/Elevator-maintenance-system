var express = require('express');
var router = express.Router();

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

module.exports = router;
