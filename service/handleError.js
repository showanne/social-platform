const headers = require('./headers');

function handleError (res, error) {
  res.writeHead(400,headers);
  let errorMsg = ''
  if (error) {
    errorMsg = error
  } else {
    errorMsg = "欄位未填寫正確"
  }
  console.log(errorMsg);
  res.write(JSON.stringify({
      "status": "false",
      "message": errorMsg,
  }));
  res.end();
}

module.exports = handleError;