const log = console.log;
class Client {
constructor() {
this.app = 'Moult.client';
this.message = "Users agent info can be accessed through the user property of the request object passed to your response function."
}

async call(req,res) {
let client = req.headers['user-agent'];
let indexes = { os: 1, model: 2 };
let devinfo = client.match(/\(([^\)]+)/);
devinfo = devinfo ? devinfo[1] : "";
devinfo = devinfo.split(";");
devinfo.forEach((v,i) => { devinfo[i] = v.trim(); });
req.user = {};
req.user.browser = /Chrome/.test(client) && !/Chromium/.test(client) && !/OPR/.test(client) ? "Chrome" : /Firefox/.test(client) && !/Seamonkey/.test(client) ? "Firefox" : /Chromium/.test(client) ? "Chromium" : /Safari/.test(client) && !/Chrome/.test(client) && !/Chromium/.test(client) ? "Safari" : /OPR/.test(client) ? "OPR": /Opera/.test(client) ? "Opera" : /curl/.test(client) ? "curl" : /MSIE/.test(client) ? "Internet Explorer" : "Unknown";
req.user.version = client.match(`${req.user.browser}\/([0-9.]+)`);
req.user.version = req.user.version ? req.user.version[1] : "N/A";
req.user.is = /Mobi/.test(client) ? "Mobile" : "Desktop";
if(req.user.browser === "OPR") Object.assign(indexes, { os: 2, model: 3});
req.user.os = devinfo[indexes.os];
req.user.model = devinfo[indexes.model];
return { message: this.message }
}

}

module.exports = Client;