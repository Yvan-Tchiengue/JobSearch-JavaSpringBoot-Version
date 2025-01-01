const con = require('../models/database');

/**
 * creating a job offer
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
 * display of all available job offers
 * @param req
 * @param res
 */
exports.displayJobsoffer = (req, res) => {
  con.query('USE JobSearch', (err) => {
    if (err) throw err;
    let sqlSelect = `SELECT * FROM joboffer`;
    con.query(sqlSelect, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
}

/**
 * search for jobs registered by a specific employer
 * @param req
 * @param res
 */
exports.displayMyJobsoffer = (req, res) =>{
  const bearerHeader = req.headers['authorization'];
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  const userId = bearerToken.userID;
  con.query('USE JobSearch', (err) => {
    if (err) throw err;
    let sqlSelect = `SELECT * FROM joboffer WHERE employerId = ?`;
    con.query(sqlSelect, [userId], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
}
