"use strict";
const { Client } = require("pg");
const client = new Client({
    user: "admin1",
    password: "admin10",
    host: "localhost",
    port: 5432,
    database: "newDb"
});
client
    .connect()
    .then(() => console.log("successfully connected to database"))
    .catch(e => console.log(e));
const getUser = (req, res) => {
    client.query("select users.empid,users.firstname, users.middlename, users.lastname, users.email, users.phone, roles.rolename, users.address, customer.customername from users, roles, customer where users.roleid = roles.roleid and users.customerid = customer.customerid order by empid asc", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
const deleteUser = (req, res) => {
    let id = req.params.id;
    client.query("delete from users where empid = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};
const updateUser = (req, res) => {
    let id = req.params.id;
    console.log(req.body);
    const { firstname, middlename, lastname, email, phone, rolename, address, customername } = req.body;
    client.query("update users set firstname =$1,middlename=$2,lastname=$3,email=$4,phone=$5,roleid=$6,address =$7,customerid =$8 where empid=$9", [
        firstname,
        middlename,
        lastname,
        email,
        phone,
        rolename,
        address,
        customername,
        id
    ], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(`Modified entry with Id ${id}`);
    });
};
const newUser = (req, res) => {
    const { firstname, middlename, lastname, email, phone, roleid, address, customerid } = req.body;
    console.log(req.body);
    client.query("insert into users (firstname,middlename,lastname,email,phone,roleid,address,customerid) values($1,$2,$3,$4,$5,$6,$7,$8) returning empid", [firstname, middlename, lastname, email, phone, roleid, address, customerid], (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.status(200).json(result.rows);
    });
};
const sendRoles = (req, res) => {
    client.query("select roleid,rolename from roles", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};
const sendCustomer = (req, res) => {
    client.query("select customer.customerid,customer.customername from customer", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
};
module.exports = { getUser, deleteUser, updateUser, newUser, sendCustomer, sendRoles };
