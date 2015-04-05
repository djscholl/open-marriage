#!/usr/bin/env node

var email = require('../lib/email'),
    invs = require('../lib/invitations');


console.log('Loading invitations from database...');

invs.loadInvitations(function (err, invitations) {
    if (err) {
        throw err;
    }

    invitations.forEach(function (invitation, i, a) {
        var names = invitation.guests.map(function (guest) {
            return guest.name.split(' ')[0];
        });
        console.log("http://wedding.danerina.com/rsvp/" + invs.encipherId(invitation.id)
                    + " '" + names.join(' & ') + "', '"
                    + invitation.address + "'");
    });
    process.exit();
});

