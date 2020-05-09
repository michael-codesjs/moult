class Data {

constructor(args) {
for(let property of args) {
Object.assign(this,property);
}}

assign(...args) {
for(let property of args) {
Object.assign(this,property);
}}

}

module.exports = (...args) => { return new Data(args); }