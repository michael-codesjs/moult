const Server = require('./server');
const Sets = require('./sets');
const Routes = require('./routes');
const Request = require('./request');
const Response = require('./response');
const Middleware = require('./middleware');
const Logs = require('./logs');
const Auth = require('./auth');
const Apify = require('./apify');
const Cookies = require('./cookies');
const Client = require('./client');
const Multipart = require('./multipart');
const Static = require('./static');
const Utilities = require('./utils');
const log = console.log;


class Moult {

static app(name="App") { return new App(name); }
static static(opts) { return new Static(opts); }
static client() { return new Client(); }
static cookies() { return new Cookies(); }
static multipart() { return new Multipart() }
static utils() { return new Utilities(); }

}



class App {

constructor(name) {
this.Name = name;
this.Routes = new Routes();
this.Middleware = new Middleware();
this.Server = new Server((req,res) => { this.serve(req,res) });
this.Sets = new Sets();
this.Request = new Request(this);
this.Response = new Response(this);
this.Logs = new Logs();
this.set('views', 'views');
this.use(this.Server);
this.use(this.Request);
this.use(this.Response);
this.use(this.Logs);
}


routes() { return this.Routes; }
get(path,call) { 
this.Routes.get(path,call);
}
post(path,call) {
this.Routes.post(path,call);
}
route(method,path,call) {
this.Routes.route(path,call);
}
set(set,value) { this.Sets[set] = value; }
sets(set) { return this.Sets[set]; }
use(app) {
this.Middleware.list.push(app);
this.Middleware.apps.push(app.app);
}

async serve(req,res) {
let reports=await this.Middleware.run(req,res,this);
req.addListener('end', () => {
this.Routes.match(req) ?
this.Routes.run(req)(req,res,reports) :
req.fine ? "" : this.Sets['404'](req,res);
});
}

listen(port = process.env.PORT || 8000) {
this.Server.protocol.listen(port,() => {
console.log() || true && this.Logs.mlog(`${this.Name} running on port ${port}`);
this.Middleware.list.forEach((m) => {
this.Logs.mlog(`${m.app} deployed`);;
});});}

}



module.exports = Moult;