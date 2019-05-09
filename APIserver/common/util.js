
var performSql = (sql,connection,success,error) => {
  connection.query(sql,(err,result) => {
    if(err){
      error.call(this);
    } else {
      success.call(this);
    }
  })
}

var checkLogin = (connection,username,type,token) => {
  var sql = `select token from user where username='${username}' and type='${type}'`;
  connection.query(sql,function(err,result){
    if(err || !result[0]) {
      return false;
    }
    
    if(token != result[0].token) {
      return false;
    }
  })
  return true;
}

module.exports = checkLogin;