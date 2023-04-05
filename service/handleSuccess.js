const headers = require('../service/headers');

function handleSuccess (res, data) {
  res.writeHead(200,headers);
  res.write(JSON.stringify({
      "status": "success",
      "post": data
  }));
  res.end();
}

module.exports = handleSuccess;