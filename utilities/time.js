class Time {

year() {
return new Date().getFullYear();
}

dmy(d='/') {
let date = new Date();
return `${date.getDay()}${d}${date.getMonth()}${d}${date.getFullYear()}`;
}
ymd(d='/',from={}) {
let date = new Date();
from.months ? date.setMonth(date.getMonth()+from.months) : '';
return `${date.getFullYear()}${d}${date.getMonth()}${d}${date.getDay()}`;
}

}

module.exports = new Time();