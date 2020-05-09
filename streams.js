const streams = require('stream');
const fs = require("fs");

class Stream extends streams.Duplex {

constructor() { super(); }
_write(chunk) { this.push(chunk) }
_read() { }

}

module.exports = {
stream: () => { return new Stream(); },
Stream: Stream
}

function log(w) {
	console.log(w)
}