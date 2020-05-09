var alphabet = [], hash = {}, rehash = {}, points = [10,44,5,33];

for(let x="0".charCodeAt(0); x <= "9".charCodeAt(0); x++) {
	alphabet.push(String.fromCharCode(x));
}
for(let x="A".charCodeAt(0); x<="Z".charCodeAt(0); x++) {
	alphabet.push(String.fromCharCode(x));
}
for(let x="a".charCodeAt(0); x<="z".charCodeAt(0); x++) {
	alphabet.push(String.fromCharCode(x));
}

alphabet.forEach((v,i,a) => {
	hash[v] = alphabet[points[0]]+alphabet[points[1]]+alphabet[points[2]]+alphabet[points[3]];
	rehash[hash[v]] = v;
	points[0] += 4;
	points[1] += 17;
	points[2] += 6;
	points[3] += 2;
	points.forEach((v,i,a) => {
		if(v >= alphabet.length - 1) {
			points[i] -= alphabet.length -1;
		}
	})
});

function mil(str) {
str = str.split('');
str.forEach((v,i,a) => {
str[i] = hash[v] ? hash[v]: v+v+v+v;
});
return str.join('');
}

function mils(str) {
let arr = [];
for(let x = 0; x < str.length - 1; x+=4) {
arr.push(str.slice(x,x+4));
}
arr.forEach((v,i,a) => {
arr[i] = rehash[v] ? rehash[v]: v[0];
});
return arr.join('');
}

module.exports.hash = (str) => {
return mil(str.toString());
}
module.exports.rehash = (str) => {
return mils(str.toString());
}