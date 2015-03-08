var crypto = require('crypto'),
    config = { invitationSecret: 'danerina is no ballerina' };

function encipherId(id) {
    var cipher = crypto.createCipher('bf', config.invitationSecret);
    cipher.update(String(id), 'utf8', 'hex');
    return cipher.final('hex');
}

function decipherId(encipheredId) {
    var decipher = crypto.createDecipher('bf', config.invitationSecret);

    // TODO: Remove Buffer once bug is fixed:
    // https://github.com/joyent/node/pull/5725
    decipher.update(new Buffer(encipheredId, 'hex'), 'utf8');
    return decipher.final('utf8');
}

ids = ['28', '29', '30', '31', '32', '33', '34', '35']
ids.map(function(id) {
    var ct = encipherId(id)
    console.log(decipherId(ct) + ": " + ct);
});

