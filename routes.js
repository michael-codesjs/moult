
class Routes {

constructor() {
this.paths_set = new Map([
['get', {}], ['post', {}],
['connect', {}], ['delete', {}],
['put', {}]
]);
}
route(method,route,call) {
this.paths_set.get(method)[route] = call;
}

get(route,call) {
this.route('get',route, call);
return this;
}
post(route,call) {
this.route('post',route, call);;
return this;
}

match(req) {
return this.paths_set.has(req.method) ?
this.paths_set.get(req.method)[req.path] ? true : false : false;
}

run(req) {
return this.paths_set.get(req.method)[req.path] || new Function();
}

}

module.exports = Routes;