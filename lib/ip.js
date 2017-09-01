var os = require('os');
var o = os.networkInterfaces();
var ip = '';
for (var dev in o) {
  o[dev].forEach(d => {  
    if (d.family == 'IPv4') {  
      if (d.address != '127.0.0.1' && !ip) {
        ip = d.address;
      }
    }
  });  
}
module.exports = {
  ip
};
