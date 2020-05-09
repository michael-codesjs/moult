const { join } = require('path');


class Static {

constructor(data={}) {
this.app = 'Moult.static';
this.host = data.host || 'assets';
this.external = data.external || false;
this.cors = data.cors || { methods:'get', origins:'null' }
this.messages = ["Successfully served static file", "Redirected static file request"];
}

async call(req,res,app) {
return this.external ? 
this.redirect(req,res):this.serve(req,res,app);
}

redirect(req,res) {
res.redirect('http://'+this.host+'/'+req.path);
return { message: this.messages[1] };
}

serve(req,res,app) {
let ext = req.path.match(/\.(\w+)$/);
ext = ext ? ext[1] : '';
req.fine = app.Response.types[ext] ? true : false;
if(req.fine) {
res.setHeader('access-control-allow-methods',
this.cors.methods);
res.setHeader('access-control-allow-origin',
this.cors.origins);
res.file(join(this.host,req.path));
}
}

}


module.exports = Static;