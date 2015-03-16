var dbm  = require('db-migrate'),
    type = dbm.dataType;

exports.up = function (db, callback) {
    db.createTable('invitations', {
        columns: {
            id: {
                autoIncrement: true,
                primaryKey   : true,
                type         : 'int'
            },

            address      : 'text',
            rsvp         : 'boolean'
        },

        ifNotExists: true
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('invitations', {ifExists: true}, callback);
};
