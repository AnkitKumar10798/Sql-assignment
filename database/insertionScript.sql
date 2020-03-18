INSERT into roles
    (rolename,description)
VALUES
    ('DevOps', 's3 services'),
    ('Developer', 'dr reddys lab'),
    ('QA', 'automation testing'),
    ('uiDesign', 'Working on Angular8');
INSERT into customer
    (customername,website,address)
VALUES('Google', 'www.google.com', 'Mountain View, CA 94043 United States'),
    ('Amazon', 'www.amazon.in', 'L&T business Park,powai,Mumbai ');
insert into Users
    (firstname, middlename , lastname, email, phone,roleid,address,customerid)
values
    ('Ashleigh', 'Kayes', 'Camel', 'ash@sf.com', '9515098235', 1, '01 Lakewood Avenue', 1),
    ('Tobe', 'Sweetenham', 'Fasham', 'tob@sf.com', '2984550774', 2, '8910 Boyd Circle', 2),
    ('Lorenza', 'Seven', 'Piggford', 'iggford2@sf.com', '9986982344', 2, '90 Ridge Oak Alley', 2),
    ('Blondy', 'Hamsson', 'Bilam', 'bbilam@sf.com', '7367661266', 2, '20 Cordelia Lane', 2),
    ('Ty', 'MacAvaddy', 'Karolczyk', 'tkarol@sf.com', '4097655249', 4, '87 Namekagon Place', 2),
    ('Lurlene', 'Pettifer', 'Gallemore', 'lgalle@sf.com', '5715161995', 4, '516 Lakewood Gardens Trail', 1),
    ( 'Claiborne', 'Corsham', 'Rosini', 'crosi@sf.com', '4429416016', 3, '79 Donald Alley', 1),
    ( 'Alix', 'Rome', 'Casero', 'acasero@sf.com', '8649721727', 2, '846 Del Mar Circle', 2),
    ('Morton', 'Aimson', 'Piatto', 'mpiatto@sf.com', '1207995291', 1, '48618 Express Road', 2),
    ('Bonnee', 'Marchington', 'Caple', 'bcaple@sf.com', '3359062094', 3, '72 Hoffman Place', 1);