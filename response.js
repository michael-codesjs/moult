const fs = require('fs');
const path = require('path');
const stem = require('./stem');
const env = path.dirname(module.parent.parent.filename);
class Response {

constructor(app) {
this.app = 'Moult.response';
this.types = {
'html': 'text/html', 'htm': 'text/html',
'css': 'text/css',
'js': 'text/javascript',
'mjs': 'text/javascript',
'jpg': 'image/jpg', 'jpeg':'image/jpg',
'png': 'image/png',
'mp4': 'video/mp4', 'mp3': 'audio/mp3',
'ttf': 'font/ttf', 'woff': 'font/woff',
'json': 'application/json',
'octet': 'octet/stream'
}
}

async call(req,res,app) {

res.is = (type) => {
res.setHeader('content-type',this.types[type] || this.types['octet']) }

res.redirect = function(route) {
this.writeHead(302, {'Location':route});
this.end();
}

res.file = function(file) {
res.is(file.split('.')[file.split('.').length-1] || 'octet');
let stream = fs.createReadStream(
path.join(env, file))
stream.pipe(this);
stream.on('error',() => { this.end() });
 }
 
res.build = function(type,page,opt={}) {
this.writeHead(200,
{'Content-Type':'text/html'});
fs.readFile(
path.join(
env,app.Sets.views,type,'header.view'),
(err,data) => {
if(err) { this.end(); return 0 }
stem.parse(data.toString(),opt)
.then((temp) => {
this.write(temp);
fs.readFile(path.join(
env,app.Sets.views,type,page+'.view'),
(err,data) => {
if(err) { this.end(); return 0; }
stem.parse(data.toString(),opt)
.then((temp) => {
this.write(temp);
fs.readFile(path.join(
env,app.Sets.views,type,'footer.view'),
(err,data) => {
if(err) return this.end('');
stem.parse(data.toString(),opt)
.then((temp) => {
this.end(temp);
}); }); }); }); }); });
}

res.render = function(file,opt) {
this.is('html');
fs.readFile(path.join(env,app.Sets.views,file+'.view'),
(err,cont) => {
if(err) { return this.end(''); }
stem.parse(cont.toString(),opt).then((temp) => { this.end(temp) }, (error) => { this.end(error) });
});

}


res.stem = function(template,options) {
return new Promise((res,rej) => {
this.is('html');
fs.readFile(template+'.view',
(err,content) => {
if(err) { return rej(err); }
stem.parse(content.toString(),options)
.then((temp) => {
this.write(temp);
res('');
},(error) => { rej(''); });
})
});
}


res.json = function(obj = {}) {
this.end(JSON.stringify(obj));
}

return "response";

}

}

module.exports = Response;
