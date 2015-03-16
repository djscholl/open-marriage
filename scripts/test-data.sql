insert into invitations (address)
       values ('1525 N. Campbell Ave #3, Chicago IL 60622');
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mr', 'Daniel Scholl', 'ddmspam@gmail.com', false);

insert into invitations (address)
       values ('2728 Derby Drive');
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mr', 'John Scholl', 'ddmspam+john@gmail.com', false);
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mrs', 'Sherry Scholl', 'ddmspam+sherry@gmail.com', false);
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mrs', 'Emily Gruber', 'ddmspam+emily@gmail.com', true);

insert into invitations (address)
       values ('1 pierce place');
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mr', 'Alex Projansky', 'ddmspam+alex@gmail.com', false);
insert into guests (invitation_id, title, name, email, is_plusone)
       values (currval('invitations_id_seq'), 'Mrs', 'Emily Projansky', 'ddmspam+emilyP@gmail.com', true);
