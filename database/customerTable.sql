
CREATE TABLE customer
(
    customerId BIGSERIAL PRIMARY KEY,
    customername VARCHAR(20),
    website VARCHAR(20),
    address VARCHAR(30),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP
);