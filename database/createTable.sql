CREATE TABLE employee
(
    empid BIGSERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    middlename VARCHAR(30),
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE check(email like'%@%.com') NOT NULL,
    phone BIGINT UNIQUE NOT NULL,
    role INTEGER check(role in ('0','1','2','3')),
    address VARCHAR(50) NOT NULL
);