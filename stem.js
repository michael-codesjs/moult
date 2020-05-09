const log = console.dir;
const fs = require('fs');
const { dirname } = require('path');
const env = dirname(module.parent.parent.parent.filename);
const { join } = require('path');

class Stem {
constructor() {
this.conditions = /%\(\s*if\(\s*(!?[.a-z]+)\s*\)\s*\)%\s*\{\s*([^\n]*)\s*\}/g,
this.delimiter = /\}\s*%\(\s*end\s*\)%/g
this.delimiter1 = /\)%/g;
this.functions = /%\(\s*stem.(\w+)\(([^\n]*)\)\s*\)%/g;
}

file(path) {
try {
return fs.readFileSync(join(env,
path.trim())).toString();
} catch(error) { return ''; }
}

json(obj, data) {
try { return JSON.stringify(data[obj]); }
catch(error) { return '{}' }
}

parse(raw,data,res) {
return new Promise((res,rej) => {
raw = raw.replace(/\n/g,'');
raw=raw.replace( /\}\s*%\(\s*end\s*\)%/g,'}\n');
raw = raw.replace(/%\(\s*if\(\s*(!?[.a-z]+)\s*\)\s*\)%\s*\{\s*([^\n]*)\s*\}/g,(body,condition,value) => {
let negative = /!/.test(condition)
condition = negative ? condition.replace(/!/g,'') : condition ;
condition = this.catalyze(condition,data);
return negative ? condition ? '' : value : condition ? value : '';
});
raw = raw.replace(/\)%/g,')%\n');
raw = raw.replace(/%\(\s*stem.(\w+)\(([^\n]*)\)\s*\)%/g, (body,func,param) => {
return this[func] ? this[func](param,data): '';
});
raw = raw.replace(/%\(\s*loop\(\s*([.A-Za-z]+)\s*\)\s*\)%\s*\{\s*([^\n]*)\s*}/g, (body,list,temp) => {
body = "";
if(data[list] && data[list].forEach) {
data[list].forEach((vals,i,a) => {
body += temp.replace(/%\{\s*([.a-z]+)\s*\}%/g, (b,v) => { return this.catalyze(v,vals) });
});}
return body;
})
raw = raw.replace(/%\{\s*([.a-zA-Z0-9()]+)\s*\}%/g,
(body,value) => { return this.catalyze(value, data); });
raw = raw.replace(/\n/g,'');
res(raw);
});
}


catalyze(str,data) {
let cat = data;
str.split(".").forEach((v,i) => {
cat = cat[v] ? typeof cat[v] === "function" ? cat[v]() : cat[v] : undefined;
});
return cat;
}
}

module.exports = new Stem();