const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');
const axios = require('axios');
const qs = require('querystring');

var mysql = require('mysql');
const SECRET_KEY = "secretKey"; // Votre clé secrète pour décoder le JWT
const CLIENT_SECRET = "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";
const CLIENT_ID = "430293578110-s62eca6u9a3r6ohg3h2akjanugcgiv0u.apps.googleusercontent.com";
const CLIENT_NAME = "jobsearch";
const ORIGIN_URI = "http://localhost:4200";
const REDIRECT_URL = "http://localhost:3000/oauth2callback";


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

//je veux supprimer toutes les informations de la table candidatures avant de continuer
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('DELETE FROM candidatures', (err, result) => {
        if (err) throw err;
        console.log("All records deleted from candidatures");
    });
});*/

/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE jobseeker ADD COLUMN cv BLOB', (err, result) => {
        if (err) throw err;
        console.log("Column 'cv' added to jobseeker");
    });
});*/


//suppression des tables cv pour creer une nouvelle.
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE jobseeker DROP COLUMN cv', (err, result) => {
        if (err) throw err;
        console.log("Column 'tony' deleted from jobseeker");
    });
});*/

//suppression des tables titleofstay pour creer une nouvelle.
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE jobseeker DROP COLUMN titleofstay', (err, result) => {
        if (err) throw err;
        console.log("Column 'tony' deleted from jobseeker");
    });
});*/

//suppression des tables workpermit pour creer une nouvelle.
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE jobseeker DROP COLUMN workpermit', (err, result) => {
        if (err) throw err;
        console.log("Column 'tony' deleted from jobseeker");
    });
});*/

//suppression des tables identitycard pour creer une nouvelle.
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE jobseeker DROP COLUMN identitycard', (err, result) => {
        if (err) throw err;
        console.log("Column 'tony' deleted from jobseeker");
    });
});*/

//suppression des tables motivationLetter pour creer une nouvelle.
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE jobseeker DROP COLUMN motivationLetter', (err, result) => {
        if (err) throw err;
        console.log("Column 'tony' deleted from jobseeker");
    });
});*/

//modifier la table candidatures pour ajouter le employerID
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE candidatures ADD COLUMN employerId INT(11);', (err, result) => {
        if (err) throw err;
        console.log("Column employerId added to candidatures");
    });
});*/


//modifier la table candidatures pour ajouter la confirmation
/*con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    con.query('ALTER TABLE candidatures ADD COLUMN confirmation VARCHAR (255);', (err, result) => {
        if (err) throw err;
        console.log("Column confirmation added to candidatures");
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

/*app.post('/api/accept-candidatures', (req, res) => {
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
});*/

app.post('/api/reject-candidatures', (req, res) => {
  const jobOffer = req.body;
  console.log('demande de rejet de cette candidature bien recu');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;

  const title = req.body.title ;
  const description = req.body.description;
  const location = req.body.location;
  const jobsID = req.body.id ;
  const employerID = req.body.employerId;


  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);

  console.log(`Description: ${description}`);
  console.log(`Location: ${location}`);
  console.log(`JobsID: ${jobsID}`);
  console.log(`EmployerID: ${employerID}`);
  console.log(`Title: ${title}`);

  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;
    const note = "rejected"

    let sqlUpdate = `UPDATE candidatures SET confirmation = ? WHERE jobOfferId = ?`;
    con.query(sqlUpdate, [note, jobsID], (err, result) => {
      if (err) throw err;
      console.log("confirmation updated in candidatures for user with ID "+userId);
    });
  });
});

app.post('/api/accept-candidatures', (req, res) => {
  const jobOffer = req.body;
  console.log('demande dacceptation de cette candidature bien recue');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;

  const title = req.body.title ;
  const description = req.body.description;
  const location = req.body.location;
  const jobsID = req.body.id ;
  const employerID = req.body.employerId;


  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);

  console.log(`Description: ${description}`);
  console.log(`Location: ${location}`);
  console.log(`JobsID: ${jobsID}`);
  console.log(`EmployerID: ${employerID}`);
  console.log(`Title: ${title}`);

  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;
    const note = "accepted"

    let sqlUpdate = `UPDATE candidatures SET confirmation = ? WHERE jobOfferId = ?`;
    con.query(sqlUpdate, [note, jobsID], (err, result) => {
      if (err) throw err;
      console.log("confirmation updated in candidatures for user with ID "+userId);
    });
  });
});

//affiche tous les jobs disponibles dans la base de données pour une possible candidature
app.get('/api/jobsOffer', (req, res) => {

  console.log('demande tres bien recu');
  con.query('USE JobSearch', (err) => {
    if (err) throw err;

    let sqlSelect = `SELECT * FROM joboffer`;
    con.query(sqlSelect, (err, results) => {
      if (err) throw err;
      console.log("offres trouvées et envoyées");
      res.json(results);  // renvoie les résultats au frontend
    });
  });

});

app.get('/api/see-confirmation', (req, res) => {

  console.log('demande see confirmation tres bien recu');

  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);

  /*con.query('USE JobSearch', (err) => {
      if (err) {
          console.error("Error using database:", err);
          throw err;
      }

      const notes = "accepted"
      console.log("UserId is:", userId);
      let sqlSelect = `SELECT jobOfferId FROM candidatures WHERE confirmation = ? AND jobSeekerId = ?`;
      con.query(sqlSelect,[notes ,userId], (err, results) => {
          if (err) throw err;
          console.log(results);

          let allJobOffers = [];

          // keep track of remaining async operations
          let remaining = results.length;
          if (remaining === 0) {
              res.json(allJobOffers);
              return;
          }
          results.forEach(result => {
              let sqlSelectJob = `SELECT title, description, location, id, employerId FROM joboffer WHERE id = ?`;
              con.query(sqlSelectJob, [result.jobOfferId], (err, jobOffers) => {
                  if (err) throw err;
                  allJobOffers.push(...jobOffers);
                  remaining -= 1;
                  if (remaining === 0) {
                      // send response when all async operations finished
                      res.json(allJobOffers);
                  }
              });
          });
      });
  });*/

  con.query('USE JobSearch', (err) => {
    if (err) {
      console.error("Error using database:", err);
      throw err;
    }

    console.log("UserId is:", userId);
    let sqlSelect = `SELECT jobOfferId, confirmation FROM candidatures WHERE jobSeekerId = ? AND confirmation IS NOT NULL`;
    con.query(sqlSelect, [userId], (err, results) => {
      if (err) throw err;
      console.log(results);

      let allConfirmationsAndOffers = [];

      // keep track of remaining async operations
      let remaining = results.length;
      if (remaining === 0) {
        res.json(allConfirmationsAndOffers);
        return;
      }
      results.forEach(result => {
        let sqlSelectJob = `SELECT title, description, location FROM joboffer WHERE id = ?`;
        con.query(sqlSelectJob, [result.jobOfferId], (err, jobOffers) => {
          console.log(jobOffers);
          if (err) throw err;
          jobOffers.forEach(jobOffer => {
            jobOffer.confirmation = result.confirmation;
            allConfirmationsAndOffers.push(jobOffer);
          });
          remaining -= 1;
          if (remaining === 0) {
            // send response when all async operations finished
            console.log(allConfirmationsAndOffers);
            res.json(allConfirmationsAndOffers);
          }
        });
      });
    });
  });


});


app.get('/api/myJobsCandidatures', (req, res) => {

  console.log('demande de voir les candidatures bien recu');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);

  con.query('USE JobSearch', (err) => {
    if (err) {
      console.error("Error using database:", err);
      throw err;
    }

    console.log("UserId is:", userId);
    let sqlSelect = `SELECT candidatures.jobOfferId, candidatures.jobSeekerId FROM candidatures WHERE employerId = ?`;
    con.query(sqlSelect,[userId], (err, results) => {
      if (err) throw err;
      console.log(results);

      let allJobOffers = [];

      // keep track of remaining async operations
      let remaining = results.length;
      if (remaining === 0) {
        res.json(allJobOffers);
        return;
      }
      results.forEach(result => {
        let sqlSelectJob = `SELECT title, description, location, id, employerId FROM joboffer WHERE id = ?`;
        con.query(sqlSelectJob, [result.jobOfferId], (err, jobOffers) => {
          if (err) throw err;
          // Ensure jobOffers contains a valid result before processing
          if (jobOffers && jobOffers[0]) {
            const jobOffer = jobOffers[0];
            jobOffer.jobSeekerId = result.jobSeekerId;  // Adding jobseekerId to the job offer data
            allJobOffers.push(jobOffer);
          }
          remaining -= 1;
          //allJobOffers.push(...jobOffers);
          //remaining -= 1;
          if (remaining === 0) {
            // send response when all async operations finished
            console.log(allJobOffers);
            res.json(allJobOffers);
          }
        });
      });
    });
  });
});

//recherche des jobs enregistres par un employer specifique
app.get('/api/myJobsOffer', (req, res) => {

  console.log('demande bien recu');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);

  con.query('USE JobSearch', (err) => {
    if (err) throw err;

    let sqlSelect = `SELECT * FROM joboffer WHERE employerId = ?`;
    con.query(sqlSelect, [userId], (err, results) => {
      if (err) throw err;
      console.log("Joboffer fetched for employer with ID: " + userId);
      res.json(results);  // renvoie les résultats au frontend
    });
  });

});

app.post('/api/upload-candidature', (req, res) => {
  console.log('Bewerbung envoyé');
  console.log(JSON.stringify(req.body));
  console.log(req.headers);

  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;
  const title = req.body.title ;
  const description = req.body.description;
  const location = req.body.location;
  const jobsID = req.body.id ;
  const employerID = req.body.employerId;

  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`Title: ${title}`);

  console.log(`Description: ${description}`);
  console.log(`Location: ${location}`);
  console.log(`JobsID: ${jobsID}`);
  console.log(`EmployerID: ${employerID}`);

  con.query('USE JobSearch', (err) => {
    if (err) throw err;

    let sqlInsert = `INSERT INTO candidatures (jobSeekerId, jobOfferId, employerId ) VALUES (?, ?, ?)`;
    con.query(sqlInsert, [userId, jobsID, employerID], (err, result) => {
      if (err) throw err;
      console.log("candidature sent for jobSeeker with ID: " + userId);
    });
  });

});


app.post('/api/booking-request', (req, res) => {
  console.log('booking request bien recu');
  console.log(req.body);

  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;
  const title = req.body.title ;
  const description = req.body.description;
  const location = req.body.location;

  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);

  console.log(`User ID: ${title}`);
  console.log(`User Type: ${description}`);
  console.log(`JWT Token: ${location}`);

  con.query('USE JobSearch', (err) => {
    if (err) throw err;

    let sqlInsert = `INSERT INTO joboffer (employerId, title, description, location) VALUES (?, ?, ?, ?)`;
    con.query(sqlInsert, [userId, title, description, location], (err, result) => {
      if (err) throw err;
      console.log("Joboffer updated for employer with ID: " + userId);
    });
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

//stockage du du titre de sejour dans le disque dur et son lien dans la base de données
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets');
  },
  filename: (req, file, cb) => {
    const bearerHeaderMLetter = req.headers['authorization'];
    const bearerTokenMLetter = bearerHeaderMLetter.split(' ')[1];
    const bearerObjectMLetter = JSON.parse(bearerTokenMLetter);
    const userIdMLetter = bearerObjectMLetter.userID;
    cb(null, `titleofstay${userIdMLetter}.pdf`);
  }
});

const upload = multer({storage: storage});

app.post('/api/uploadTitleOfStayFiles', upload.single('titleOfStay'), async (req, res) => {
  // Vérifiez si le fichier a été reçu
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerObject.userID;
  const userType = bearerObject.userType;
  const jwtToken = bearerObject.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userId}`);
  console.log(`User Type: ${userType}`);
  console.log(`JWT Token: ${jwtToken}`);


  // Construisez le chemin d'accès au fichier
  const filePath = `C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets/titleofstay${userId}`;

  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    let sqlUpdate = `UPDATE ${userType} SET titleofstay = ? WHERE id = ?`;
    con.query(sqlUpdate, [filePath, 1], (err, result) => {
      if (err) throw err;
      console.log("titleOfStay updated in JobSeeker for user with ID 1");
    });
  });
});

// sauvegarde de la carte d'identité
const storageICard = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets');
  },
  filename: (req, file, cb) => {
    const bearerHeaderMLetter = req.headers['authorization'];
    const bearerTokenMLetter = bearerHeaderMLetter.split(' ')[1];
    const bearerObjectMLetter = JSON.parse(bearerTokenMLetter);
    const userIdMLetter = bearerObjectMLetter.userID;
    cb(null, `identitycard${userIdMLetter}.pdf`);
  }
});

const uploadICard = multer({storage: storageICard});

app.post('/api/uploadIdentityCardFiles', uploadICard.single('identityCard'), async (req, res) => {
  // Vérifiez si le fichier a été reçu
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Décodez le token JWT
  const bearerHeaderICard = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeaderICard);
  const bearerTokenICard = bearerHeaderICard.split(' ')[1];
  console.log(bearerTokenICard);
  const bearerObjectICard = JSON.parse(bearerTokenICard);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userIdICard = bearerObjectICard.userID;
  const userTypeICard = bearerObjectICard.userType;
  const jwtTokenICard = bearerObjectICard.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userIdICard}`);
  console.log(`User Type: ${userTypeICard}`);
  console.log(`JWT Token: ${jwtTokenICard}`);

  const filePathICard = `C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets/identitycard${userIdICard}`;

  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    let sqlUpdate = `UPDATE ${userTypeICard} SET identitycard = ? WHERE id = ?`;
    con.query(sqlUpdate, [filePathICard, userIdICard], (err, result) => {
      if (err) throw err;
      console.log("Identity Card updated in JobSeeker for user with ID ", userIdICard);
    });
  });
});

//stockage du permit de travail
const storageWPermit = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets');
  },
  filename: (req, file, cb) => {
    const bearerHeaderMLetter = req.headers['authorization'];
    const bearerTokenMLetter = bearerHeaderMLetter.split(' ')[1];
    const bearerObjectMLetter = JSON.parse(bearerTokenMLetter);
    const userIdMLetter = bearerObjectMLetter.userID;
    cb(null, `workpermit${userIdMLetter}.pdf`);
  }
});

const uploadWPermit = multer({storage: storageWPermit});

app.post('/api/uploadWorkPermitFiles', uploadWPermit.single('workPermit'), async (req, res) => {
  // Vérifiez si le fichier a été reçu
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Décodez le token JWT
  const bearerHeaderWPermit = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeaderWPermit);
  const bearerTokenWPermit = bearerHeaderWPermit.split(' ')[1];
  console.log(bearerTokenWPermit);
  const bearerObjectWPermit = JSON.parse(bearerTokenWPermit);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userIdWPermit = bearerObjectWPermit.userID;
  const userTypeWPermit = bearerObjectWPermit.userType;
  const jwtTokenWPermit = bearerObjectWPermit.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userIdWPermit}`);
  console.log(`User Type: ${userTypeWPermit}`);
  console.log(`JWT Token: ${jwtTokenWPermit}`);


  // Construisez le chemin d'accès au fichier
  const filePathWPermit = `C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets/workpermit${userIdWPermit}`;

  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    let sqlUpdate = `UPDATE ${userTypeWPermit} SET cv = ? WHERE id = ?`;
    con.query(sqlUpdate, [filePathWPermit, userIdWPermit], (err, result) => {
      if (err) throw err;
      console.log("Work Permit updated in JobSeeker for user with ID ", userIdWPermit);
    });
  });
});

//reception et stockage de la lettre de motivation breff ca ou bien le cv
const storageMLetter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets');
  },
  /*filename: (req, file, cb) => {
      cb(null, file.originalname);
  }*/
  filename: (req, file, cb) => {
    const bearerHeaderMLetter = req.headers['authorization'];
    const bearerTokenMLetter = bearerHeaderMLetter.split(' ')[1];
    const bearerObjectMLetter = JSON.parse(bearerTokenMLetter);
    const userIdMLetter = bearerObjectMLetter.userID;
    cb(null, `cv${userIdMLetter}.pdf`);
  }
});

const uploadMLetter = multer({storage: storageMLetter});

app.post('/api/uploadMotivationLetterFiles', uploadMLetter.single('motivationLetter'), async (req, res) => {
  // Vérifiez si le fichier a été reçu
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Décodez le token JWT
  const bearerHeaderMLetter = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeaderMLetter);
  const bearerTokenMLetter = bearerHeaderMLetter.split(' ')[1];
  console.log(bearerTokenMLetter);
  const bearerObjectMLetter = JSON.parse(bearerTokenMLetter);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userIdMLetter = bearerObjectMLetter.userID;
  const userTypeMLetter = bearerObjectMLetter.userType;
  const jwtTokenMLetter = bearerObjectMLetter.token;

  // Affiche les informations extraites
  console.log(`User ID: ${userIdMLetter}`);
  console.log(`User Type: ${userTypeMLetter}`);
  console.log(`JWT Token: ${jwtTokenMLetter}`);


  // Construisez le chemin d'accès au fichier
  const filePathMLetter = `C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets/cv${userIdMLetter}`;

  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;

    let sqlUpdate = `UPDATE ${userTypeMLetter} SET cv = ? WHERE id = ?`;
    con.query(sqlUpdate, [filePathMLetter, userIdMLetter], (err, result) => {
      if (err) throw err;
      console.log("Motivation Letter updated in JobSeeker for user with ID ", userIdMLetter);
    });
  });
});

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

      const token = jwt.sign({ id: user.id, type: 'JobSeeker' }, 'tony', { expiresIn: '24h' });

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

      if (!isMatch) {app.post('/api/uploadTitleOfStayFiles', (req, res)=>{
        console.log('test 1 reusssi');
      })
        return res.status(400).json({ error: 'Incorrect email address or password' });
      }

      const token = jwt.sign({ id: user.id, type: 'Employer' }, 'tony', { expiresIn: '24h' });

      //res.json({ token });
      res.json({ token, userType: user.type_of_account, userID: user.id });
    });
  });
});

//juste un test pour verifier si les données de creation de compte ont veritablement été créés
//dans la base de données
/*con.query('USE JobSearch', (err, result) => {
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
});*/

app.listen(port, () => {
  console.log('Serveur is running on port 3000');
});
