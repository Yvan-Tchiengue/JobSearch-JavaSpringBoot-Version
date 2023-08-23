const con = require('../models/database');

/**
 * creation et mise en ligne d'une offre d#emploi
 * @param req
 * @param res
 */
exports.bookingRequests = (req, res) =>{
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
}
