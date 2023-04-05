const routes = require('./routes');

require('./connections');

const serverApp = async(req, res)=>{
    routes(req, res);
}

module.exports = serverApp;