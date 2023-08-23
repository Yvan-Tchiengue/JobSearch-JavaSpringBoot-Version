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

/**
 * creation de la base de données JobSearch
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
 * ajoute un type de compte
 */
const addTypeOfAccount = () =>{
  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE Employer ADD COLUMN type_of_account VARCHAR(255);', (err, result) => {
      if (err) throw err;
      console.log("Column type_of_account added to Employer table");
    });

    con.query('ALTER TABLE JobSeeker ADD COLUMN type_of_account VARCHAR(255);', (err, result) => {
      if (err) throw err;
      console.log("Column type_of_account added to JobSeeker table");
    });
  });
}

/**
 *  ajoute un mot de passe
 */
const addPassword = () =>{
  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE Employer ADD COLUMN password VARCHAR(255);', (err, result) => {
      if (err) throw err;
      console.log("Column password added to Employer");
    });
  });
}

/**
 * ajoute une candidature dans la base de données
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
 *  fonction a appeler pour execution dans la base de données
 */
//addCandidatures(); //add new table candidatures
//addPassword(); //add column password in table employer
//addTypeOfAccount(); //ajoute une nouvelle colonne dans les tables jobseeker et employer
//createDatabase(); // Appelez la fonction pour créer les tables au démarrage


module.exports = con;
