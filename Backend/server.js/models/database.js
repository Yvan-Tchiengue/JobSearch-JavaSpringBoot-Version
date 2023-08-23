const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tonyonline*123",
    database: 'jobSearch'
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection to database server established: tony Connected!");
});

module.exports = con;
