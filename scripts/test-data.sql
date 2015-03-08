insert into invitations (address)
       values ('1525 N. Campbell Ave #3, Chicago IL 60622');
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mr', 'Daniel Scholl', 'daniel.scholl@gmail.com', false);

insert into invitations (address)
       values ('2728 Derby Drive');
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mr', 'John Scholl', 'daniel.scholl+john@gmail.com', false);
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mrs', 'Sherry Scholl', 'daniel.scholl+sherry@gmail.com', true);
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mrs', 'Emily Gruber', 'daniel.scholl+emily@gmail.com', true);
