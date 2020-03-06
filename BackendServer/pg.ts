const { Client } = require("pg");
const client = new Client({
  user: "admin1",
  password: "admin10",
  host: "localhost",
  port: 5432,
  database: "api"
});

client
  .connect()
  .then(() => console.log("successfully connected to database"))
  .catch(e => console.log(e));

const getUser = (req, res) => {
  client.query(
    "select * from employee order by empid asc ",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
const deleteUser = (req, res) => {
  let id = req.params.id;
  client.query(
    "delete from employee where empid = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};
const updateUser = (req, res) => {
  let id = req.params.id;
  console.log(id);
  console.log(req.body);
  const {
    firstname,
    middlename,
    lastname,
    email,
    phone,
    role,
    address
  } = req.body;
  client.query(
    "update employee set firstname =$1,middlename=$2,lastname=$3,email=$4,phone=$5,role=$6,address =$7 where empid=$8",
    [firstname, middlename, lastname, email, phone, role, address, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`Modified entry with Id ${id}`);
    }
  );
};
const newUser = (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    phone,
    role,
    address
  } = req.body;
  console.log(req.body);
  client.query(
    "insert into employee (firstname,middlename,lastname,email,phone,role,address) values($1,$2,$3,$4,$5,$6,$7)returning empid",
    [firstname, middlename, lastname, email, phone, role, address],
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.status(200).json(result.rows);
    }
  );
};

module.exports = { getUser, deleteUser, updateUser, newUser };
