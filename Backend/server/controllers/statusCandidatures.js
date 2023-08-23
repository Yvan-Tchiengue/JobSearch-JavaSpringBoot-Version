const con = require('../models/database');

/**
 * rejete les candidatures indesirees
 * @param req
 * @param res
 */
exports.rejectCandidatures = (req, res) =>{
  const jobOffer = req.body;
  console.log('demande de rejet de cette candidature bien recu');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  //const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  //const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerToken.userID;
  const userType = bearerToken.userType;
  const jwtToken = bearerToken.token;

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
}

/**
 * confirmation de candidature
 * @param req
 * @param res
 */
exports.acceptCandidatures = (req, res) =>{
  const jobOffer = req.body;
  console.log('demande dacceptation de cette candidature bien recue');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  //const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  //const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerToken.userID;
  const userType = bearerToken.userType;
  const jwtToken = bearerToken.token;

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
}

/**
 * status de la candidature envoyée
 * @param req
 * @param res
 */
exports.confirmation = (req, res) =>{
  console.log('demande see confirmation tres bien recu');

  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  //const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  //const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerToken.userID;
  const userType = bearerToken.userType;
  const jwtToken = bearerToken.token;

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
}

/**
 * offres d'emplois soumis par un employeur specifique
 * @param req
 * @param res
 */
exports.myJobsCandidatures = (req, res) =>{
  console.log('demande de voir les candidatures bien recu');
  // Décodez le token JWT
  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log(bearerHeader);
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  //const bearerToken = bearerHeader.split(' ')[1];
  console.log(bearerToken);
  //const bearerObject = JSON.parse(bearerToken);  // Convertir la chaîne JSON en objet
  // Sauvegarde les informations dans des variables
  const userId = bearerToken.userID;
  const userType = bearerToken.userType;
  const jwtToken = bearerToken.token;

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
}

/**
 * envoi de la candidature
 * @param req
 * @param res
 */
exports.uploadcandidatures = (req, res) =>{
  console.log('Bewerbung envoyé');
  console.log("voici ce que je recois du front-end: ",JSON.stringify(req.body));
  console.log("voici le header recu du front-end: ",req.headers);

  const bearerHeader = req.headers['authorization'];// Ici vous obtenez le JSON et non le token JWT
  console.log("bearerHeader est: ",bearerHeader);
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  console.log("bearerToken est: ",bearerToken);

  const userId = bearerToken.userID;
  const userType = bearerToken.userType;
  const jwtToken = bearerToken.token;
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

}
