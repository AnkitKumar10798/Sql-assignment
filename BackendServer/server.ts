"use strict";
import { request } from "http";
import { chmod, readFileSync } from "fs";
import { raw, urlencoded } from "body-parser";
import { Request, Response } from "express";
let Db = require("./pg");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let port = 3000;
app.listen(port);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.get("/crud/fetch", Db.getUser);
app.delete("/crud/delete/:id", Db.deleteUser);
app.put("/crud/edit/:id", Db.updateUser);
app.post("/crud/createnew", Db.newUser);
app.get("/crud/fetchCustomers", Db.sendCustomer);
app.get("/crud/fetchRoles",Db.sendRoles);
