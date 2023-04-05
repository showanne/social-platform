const headers = require('../service/headers');
const handleError = require('../service/handleError');

const http = {
  cors(req, res) {
    res.writeHead(200,headers);
    res.end();
  },
  notFound(req, res) {
    errorRoutes = "無此網站路由"
    handleError(res, errorRoutes);
  }
}

module.exports = http;