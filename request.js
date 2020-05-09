const url = require('url');
const qs = require('querystring');

class Request {


constructor() {
this.app = 'Moult.request';
this.served = 0;
this.types = {
multipart: /multipart\/form-data/
}
}

async call(req) {
this.served += 1;
req.cookies = {};
req.path = url.parse(req.url).pathname;
req.method = req.method.toLowerCase();
req.params = '';
req.is = (type) => {
return this.types[type] ?
this.types[type].test(req.headers['content-type']) : false;
}
if(!req.is('multipart')) {
req.addListener('data',
(d) => { req.params += d; });
req.addListener('end',() => {
req.params += url.parse(req.url).query || '';
req.params = qs.parse(req.params);
});
}
return "request";
}


}


module.exports = Request;

function log(m) { console.log(m); }