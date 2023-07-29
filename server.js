const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tonyonline*123",
  database: 'jobSearch'
});
/**
 * le code suivant est entre parentheses car je l'ai executé une seule fois pour creer la base
 * de données. maintenant si je veux me connecter a la base de données et effectuer par exemple une
 * creation de table alors je peux juste l'adapter en utilisant con.connect() + adaptation
 */
con.connect(function(err) {
  if (err) throw err;
  console.log("connection to database server established: Connected!");
  /*Create a database named "mydb":*/
  /*var sql = "CREATE DATABASE Jobsuchetest3";
  con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Database Jobsuchetest3 created");
  });*/
});

/*con.query('CREATE DATABASE IF NOT EXISTS JobSearch;', (err, result) => {
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
}); */

/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE Employer ADD COLUMN type_of_account VARCHAR(255);', (err, result) => {
        if (err) throw err;
        console.log("Column type_of_account added to Employer table");
    });

    con.query('ALTER TABLE JobSeeker ADD COLUMN type_of_account VARCHAR(255);', (err, result) => {
        if (err) throw err;
        console.log("Column type_of_account added to JobSeeker table");
    });
});*/

/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE Employer ADD COLUMN password VARCHAR(255);', (err, result) => {
        if (err) throw err;
        console.log("Column password added to Employer");
    });
});*/

//ajout de nouvelles colonnes dans la table jobseeker
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    const query = `
        ALTER TABLE jobseeker
        ADD COLUMN titleofstay VARCHAR(255),
        ADD COLUMN identitycard VARCHAR(255),
        ADD COLUMN workpermit VARCHAR(255);
    `;

    con.query(query, (err, result) => {
        if (err) throw err;
        console.log("Columns titleofstay, identitycard and workpermit added to jobseeker");
    });
});*/


//creation d'une nouvelle table pour contenir toutes les candidatures aux offres d'emploi
/*con.changeUser({database : 'JobSearch'}, function(err) {
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
}); */

app.get('/api/calcul', (req, res) => {
  const resultat = 2 + 4;
  res.send(resultat.toString());
});

app.post('/api/jobs-offer', (req, res) => {
  const jobOffer = req.body;
  const query = 'INSERT INTO JobOffer SET ?';
  con.query(query, jobOffer, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error when creating the job offer' });
      return;
    }
    res.json({ success: true });
  });
});

app.post('/api/account-creating', async (req, res) => {
  console.log("voici les données récuperées du front-end: ", JSON.stringify(req.body), req.body);
  const user = req.body;

  // Hash the password before storing it in the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  console.log(user.password);
  console.log(user);


  let tableName;
  if(user.type_of_account === 'jobseeker') {
    tableName = 'JobSeeker';
  } else if(user.type_of_account === 'employe') {
    tableName = 'Employer';
  } else {
    res.status(400).json({ error: 'Invalid account type' });
    return;
  }

  const query = `INSERT INTO ${tableName} SET ?`;
  con.query(query, user, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error when creating an account' });
      return;
    }
    console.log('creation de compte ok');
    res.json({ success: true });
  });
});


/*app.post('/api/authentification', (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT * FROM JobSeeker WHERE email = ?', [email], async (error, results) => {
        if (error || results.length === 0) {
            return res.status(400).json({ error: 'Incorrect email address or password' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect email address or password' });
        }

        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

        res.json({ token });
    });
}); */

app.post('/api/uploadFiles', (req , res ) => {
  console.log("voici les fichiers pdf recus du front-end: "+JSON.stringify(req.body));
})



app.post('/api/authentification', (req, res) => {
  console.log("voici les credentials recus du front-end: "+JSON.stringify(req.body));
  const { email, password } = req.body;

  // Check JobSeeker table
  con.query('SELECT * FROM JobSeeker WHERE email = ?', [email], async (error, jobSeekerResults) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }

    // If there is a JobSeeker with this email
    if (jobSeekerResults.length > 0) {
      const user = jobSeekerResults[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect email address or password' });
      }

      const token = jwt.sign({ id: user.id, type: 'JobSeeker' }, 'secretKey', { expiresIn: '1h' });

      //return res.json({ token });
      return res.json({ token, userType: user.type_of_account, userID: user.id });
    }

    // If there is no JobSeeker with this email, check Employer table
    con.query('SELECT * FROM Employer WHERE email = ?', [email], async (error, employerResults) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (employerResults.length === 0) {
        return res.status(400).json({ error: 'Incorrect email address or password' });
      }

      const user = employerResults[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect email address or password' });
      }

      const token = jwt.sign({ id: user.id, type: 'Employer' }, 'secretKey', { expiresIn: '1h' });

      //res.json({ token });
      res.json({ token, userType: user.type_of_account, userID: user.id });
    });
  });
});

//juste un test pour verifier si les données de creation de compte ont veritablement été créés
//dans la base de données
con.query('USE JobSearch', (err, result) => {
  if (err) throw err;

  con.query('SELECT * FROM JobSeeker', (err, result) => {
    if (err) throw err;
    console.log("JobSeeker table contents:");
    console.log(result);
  });

  con.query('SELECT * FROM Employer', (err, result) => {
    if (err) throw err;
    console.log("Employer table contents:");
    console.log(result);
  });
});

app.listen(port, () => {
  console.log('Serveur is running on port 3000');
});
