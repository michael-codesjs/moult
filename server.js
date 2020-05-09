const http = require('http');

class Server {

constructor(serve) {
this.protocol = http.createServer(serve);
this.app = 'Moult.server';
this.message = "Headers Set!;";
}

async call(req,res) {
res.setHeader('server','moult/node');
res.setHeader('x-powered-by','moult');
return { message: this.message };
}
}


module.exports = Server;