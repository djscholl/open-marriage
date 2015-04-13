#!/usr/bin/env node

var email = require('../lib/email'),
    invs = require('../lib/invitations');

invs.loadInvitations(function (err, invitations) {
    if (err) {
        throw err;
    }

    invitations.forEach(function (invitation, i, a) {
        var names = invitation.guests.map(function (guest) {
            return guest.name.split(' ')[0];
        });
        var emails = invitation.guests.map(function (guest) {
            return guest.email;
        });
        console.log("wedding.danerina.com/rsvp/" + invs.encipherId(invitation.id)
                    + " '" + names.join(' & ') + "', '"
                    + invitation.address + "', " + emails.join(';'));
    });
    process.exit();
});

