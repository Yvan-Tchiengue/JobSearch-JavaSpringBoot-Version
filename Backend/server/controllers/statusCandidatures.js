const con = require('../models/database');

/**
 * rejects unsolicited applications
 * @param req
 * @param res
 */
exports.rejectCandidatures = (req, res) =>{
  const jobsID = req.body.id ;
  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;
    const note = "rejected"
    let sqlUpdate = `UPDATE candidatures SET confirmation = ? WHERE jobOfferId = ?`;
    con.query(sqlUpdate, [note, jobsID], (err, result) => {
      if (err) throw err;
    });
  });
}

/**
 * application confirmation
 * @param req
 * @param res
 */
exports.acceptCandidatures = (req, res) =>{
  const jobsID = req.body.id ;
  con.query('USE JobSearch', (err, result) => {
    if (err) throw err;
    const note = "accepted"
    let sqlUpdate = `UPDATE candidatures SET confirmation = ? WHERE jobOfferId = ?`;
    con.query(sqlUpdate, [note, jobsID], (err, result) => {
      if (err) throw err;
    });
  });
}

/**
 * status of submitted application
 * @param req
 * @param res
 */
exports.confirmation = (req, res) =>{
  const bearerHeader = req.headers['authorization'];
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  const userId = bearerToken.userID;
  con.query('USE JobSearch', (err) => {
    if (err) {
      throw err;
    }
    let sqlSelect = `SELECT jobOfferId, confirmation FROM candidatures WHERE jobSeekerId = ? AND confirmation IS NOT NULL`;
    con.query(sqlSelect, [userId], (err, results) => {
      if (err) throw err;
      let allConfirmationsAndOffers = [];
      let remaining = results.length;
      if (remaining === 0) {
        res.json(allConfirmationsAndOffers);
        return;
      }
      results.forEach(result => {
        let sqlSelectJob = `SELECT title, description, location FROM joboffer WHERE id = ?`;
        con.query(sqlSelectJob, [result.jobOfferId], (err, jobOffers) => {
          if (err) throw err;
          jobOffers.forEach(jobOffer => {
            jobOffer.confirmation = result.confirmation;
            allConfirmationsAndOffers.push(jobOffer);
          });
          remaining -= 1;
          if (remaining === 0) {
            res.json(allConfirmationsAndOffers);
          }
        });
      });
    });
  });
}

/**
 * job offers submitted by a specific employer
 * @param req
 * @param res
 */
exports.myJobsCandidatures = (req, res) =>{
  const bearerHeader = req.headers['authorization'];
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
  const userId = bearerToken.userID;

  con.query('USE JobSearch', (err) => {
    if (err) {
      throw err;
    }
    let sqlSelect = `SELECT candidatures.jobOfferId, candidatures.jobSeekerId FROM candidatures WHERE employerId = ?`;
    con.query(sqlSelect,[userId], (err, results) => {
      if (err) throw err;
      let allJobOffers = [];
      let remaining = results.length;
      if (remaining === 0) {
        res.json(allJobOffers);
        return;
      }
      results.forEach(result => {
        let sqlSelectJob = `SELECT title, description, location, id, employerId FROM joboffer WHERE id = ?`;
        con.query(sqlSelectJob, [result.jobOfferId], (err, jobOffers) => {
          if (err) throw err;
          if (jobOffers && jobOffers[0]) {
            const jobOffer = jobOffers[0];
            jobOffer.jobSeekerId = result.jobSeekerId;
            allJobOffers.push(jobOffer);
          }
          remaining -= 1;
          if (remaining === 0) {
            res.json(allJobOffers);
          }
        });
      });
    });
  });
}

/**
 * sending the application
 * @param req
 * @param res
 */
exports.uploadcandidatures = (req, res) =>{
  const bearerHeader = req.headers['authorization'];
  const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));

  const userId = bearerToken.userID;
  const jobsID = req.body.id ;
  const employerID = req.body.employerId;
  con.query('USE JobSearch', (err) => {
    if (err) throw err;
    let sqlInsert = `INSERT INTO candidatures (jobSeekerId, jobOfferId, employerId ) VALUES (?, ?, ?)`;
    con.query(sqlInsert, [userId, jobsID, employerID], (err, result) => {
      if (err) throw err;
    });
  });
}
