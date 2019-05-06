
var performSql = (sql,connection,success,error) => {
  connection.query(sql,(err,result) => {
    if(err){
      error.call(this);
    } else {
      success.call(this);
    }
  })
}

export { performSql }