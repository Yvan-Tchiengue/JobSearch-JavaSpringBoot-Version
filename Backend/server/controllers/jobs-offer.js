const con = require('../models/database');

/**
 * creation d'une offre d'emploi
 * @param req
 * @param res
 */
exports.createJobsoffer = (req, res) => {
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
}

/**
 * affichage de toutes les offres d'emploi disponible
 * @param req
 * @param res
 */
exports.displayJobsoffer = (req, res) => {
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
}

/**
 * recherche les jobs enregistres par un employer specifique
 * @param req
 * @param res
 */
exports.displayMyJobsoffer = (req, res) =>{
  console.log('demande bien recu');
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
    if (err) throw err;

    let sqlSelect = `SELECT * FROM joboffer WHERE employerId = ?`;
    con.query(sqlSelect, [userId], (err, results) => {
      if (err) throw err;
      console.log("Joboffer fetched for employer with ID: " + userId);
      res.json(results);  // renvoie les résultats au frontend
    });
  });
}
