const os = require('os');
const qs = require('querystring');
const url = require('url');
const fs = require('fs');
const streams = require('./streams');

class Multipart {
constructor() {
this.app = 'Moult.multipart';
}
call(req,res) {
if(req.is('multipart')) {
res.setHeader('access-control-allow-origin', '*');
res.setHeader('access-control-allow-methods', 'post');
req.params = qs.parse(url.parse(req.url).query || '');
let length = parseInt(
req.headers['content-length'],10);
let boundary = req.headers['content-type'].match(/boundary=(.+)/)[1];
let raw = [];
req.addListener('data',c => raw.push(c));
req.addListener('end',() => {
let first = false;
raw = Buffer.concat(raw);
while(raw.indexOf(boundary)) {
if(raw.indexOf('Content-Disposition') >= 0) {
let suf = first ? 2 : 0;
let headers = raw.slice(raw.indexOf('--'+boundary),raw.indexOf("\r\n\r\n")+4).toString(); let pids = this.pids(headers);
raw = raw.slice(headers.length+suf, raw.length);
pids.buffer = raw.slice(0,raw.indexOf(`\r\n--${boundary}`));
raw = raw.slice(pids.buffer.length,raw.length);
req.params[pids.name] = pids;
first = true;
} else { break; }
}
});
}

}

pids(raw) {
let values = {};
values.name = raw.match(/name="(\w*)";?/)[1];
values.file = raw.match(/filename="(.*)"/);
values.file = values.file ? values.file[1] : undefined;
values.type = raw.match(/Content-Type: (.+)\s/);
values.type = values.type ? values.type[1] : undefined;
values.extension = values.type ? values.type.split('/')[1] : undefined;
return values;
}

}

module.exports = Multipart;
