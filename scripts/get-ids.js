// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'bf',
    password = 'danerina is no ballerina';
 
function encrypt(text) {
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
//crypted += cipher.final('hex');
//return crypted;
  return cipher.final('hex');
}
 
function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm,password);
  //var dec = decipher.update(text,'hex','utf8');
  decipher.update(new Buffer(text, 'hex'), 'utf8');
  return decipher.final('utf8');
}
 
for(var i = 25; i < 45; i++) {
    var id = i.toString();
    var hw = encrypt(id)
    console.log(decrypt(hw) + ": " + hw);
}

