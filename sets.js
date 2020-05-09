const { join } = require('path');
class Sets {

constructor() {
this['404'] = (req,res) => {
res.stem(join(__dirname,'defaults','404'),req).then(() => { res.end(); }, (error) => { res.end(''); });
}
}


}

module.exports = Sets;