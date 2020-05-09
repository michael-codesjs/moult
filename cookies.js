class Cookies {

constructor() {
this.app = 'Moult.cookies';
}

call(req,res) {
res.cookies = [];
res.cookie = function(cookie, value, exp=3,path='/') {
let date = new Date();
date.setMonth(date.getMonth() + exp);
date = date.toUTCString();
let index = this.cookies.length;
this.cookies.forEach((v,i) => {
index = v.split('=')[0].trimLeft() === cookie ? i: index; });
this.cookies[index] = `${cookie}=${value}; Path=${path}; Expires=${date}`;
this.setHeader('Set-Cookie', this.cookies);
}
res.session = function(session,value) {
let index = res.cookies.length;
res.cookies.forEach((v,i) => {
index = v.split('=')[0].trimLeft() === session ? i : index; });
this.cookies[index] = `${session}=${value}; Path=/`;
this.setHeader('Set-Cookie',res.cookies);
 }

req.cookies = {};
let cookies = req.headers.cookie ? req.headers.cookie.split(';') : [];
cookies.forEach((cookie) => {
req.cookies[cookie.split('=')[0].trimLeft()] = cookie.split('=')[1].trimRight();
});
}

}

module.exports = Cookies;