CREATE TABLE Users
(
    empid BIGSERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    middlename VARCHAR(20),
    lastname VARCHAR(30),
    email VARCHAR(50),
    phone VARCHAR(13),
    roleid integer,
    address VARCHAR(40),
    customerid integer,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_on TIMESTAMP NOT NULL
        FOREIGN KEY (roleid) references roles(roleid),
    FOREIGN KEY (customerid) references customer (customerid)


);
