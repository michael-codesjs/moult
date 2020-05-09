class Logs {

constructor() { this.app = 'Moult.logs'; }

async call(req,res) {
req.addListener('end',() => {
this.rlog(`${req.method}: ${req.path} `);
});
return "logs";
}

rlog(m) { console.log(` (/) ${m}`); }
mlog(m) { console.log(` (-) ${m}`) }


}

module.exports = Logs