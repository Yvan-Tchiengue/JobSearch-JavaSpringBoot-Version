const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tonyonline*123",
    database: 'jobSearch'
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection to database server established: Connected!");
});

/**
 * JobSearch database creation
 */
const createDatabase = () => {
  con.query('CREATE DATABASE IF NOT EXISTS JobSearch;', (err, result) => {
    if (err) throw err;
    console.log("Database created");

    con.changeUser({database : 'JobSearch'}, function(err) {
      if (err) throw err;

      con.query(`
    CREATE TABLE IF NOT EXISTS Employer (
        id INT AUTO_INCREMENT PRIMARY KEY,
        namee VARCHAR(255),
        adress VARCHAR(255),
        email VARCHAR(255),
        telephone VARCHAR(255)
    )`, (err, result) => {
        if (err) throw err;
        console.log("Employer table created");

        con.query(`
      CREATE TABLE IF NOT EXISTS JobOffer (
          id INT AUTO_INCREMENT PRIMARY KEY,
          employerId INT,
          title VARCHAR(255),
          description TEXT,
          salary FLOAT,
          publicationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          location VARCHAR(255),
          typeContract VARCHAR(255),
          businessSector VARCHAR(255),
          FOREIGN KEY (employerId) REFERENCES Employer(id)
      )`, (err, result) => {
          if (err) throw err;
          console.log("JobOffer table created");

          con.query(`
        CREATE TABLE IF NOT EXISTS JobSeeker (
            id INT AUTO_INCREMENT PRIMARY KEY,
            namee VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            cv TEXT,
            telephone VARCHAR(255),
            motivationLetter TEXT
        )`, (err, result) => {
            if (err) throw err;
            console.log("JobSeeker table created");
          });
        });
      });
    });
  });
};

/**
 * adds an account type
 */
const addTypeOfAccount = () =>{
  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE Employer ADD COLUMN type_of_account VARCHAR(255);', (err, result) => {
      if (err) throw err;
    });

    con.query('ALTER TABLE JobSeeker ADD COLUMN type_of_account VARCHAR(255);', (err, result) => {
      if (err) throw err;
    });
  });
}

/**
 *  adds new password
 */
const addPassword = () =>{
  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE Employer ADD COLUMN password VARCHAR(255);', (err, result) => {
      if (err) throw err;
    });
  });
}

/**
 * adds an application to the database
 */
const addCandidatures = () =>{
  con.changeUser({database : 'JobSearch'}, function(err) {
    if (err) throw err;

    con.query(`
    CREATE TABLE IF NOT EXISTS Candidatures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jobSeekerId INT,
        jobOfferId INT,
        dateCandidature TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (jobSeekerId) REFERENCES jobSeeker(id),
        FOREIGN KEY (jobOfferId) REFERENCES jobOffer(id)
    )`, (err, result) => {
      if (err) throw err;
      console.log("Candidatures table created");
    });
  });
}

/**
 *  function to call for execution in the database
 */
//addCandidatures();
//addPassword();
//addTypeOfAccount();
//createDatabase();


module.exports = con;
