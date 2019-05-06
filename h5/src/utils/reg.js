// 手机号码正则验证
function testPhone(phone){
  var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if(!phoneReg.test(phone)){
    return false;
  }
  return true;   
}
var testEmail = (email) => {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if(!reg.test(email)){
    return false;
  }     
  return true;
}

export { testPhone,testEmail }