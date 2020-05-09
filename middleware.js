

class Middleware {

constructor() {
this.list = [];
this.apps = [];
}

deployed(app) {
return this.apps.includes(app);
}

async run(req,res,a) {
let middleware_reports = [];
for(let x=0; x<this.list.length; x++) {
let rep = {};
try {
rep.report = await this.list[x].call(req,res,a);
rep.success = true;
} catch(error) {
rep.report = error;
rep.success = false;
}
middleware_reports.push(rep);
}
return middleware_reports;
}

}

module.exports = Middleware;