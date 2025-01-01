const con = require('../models/database');

/**
 * creating and placing a job offer online
 * @param req
 * @param res
 */
exports.bookingRequests = (req, res) =>{
  const bearerHeader = req.headers['authorization'];
  const bearerToken = bearerHeader.split(' ')[1];
  const bearerObject = JSON.parse(bearerToken);
  const userId = bearerObject.userID;
  const title = req.body.title ;
  const description = req.body.description;
  const location = req.body.location;

  con.query('USE JobSearch', (err) => {
    if (err) throw err;

    let sqlInsert = `INSERT INTO joboffer (employerId, title, description, location) VALUES (?, ?, ?, ?)`;
    con.query(sqlInsert, [userId, title, description, location], (err, result) => {
      if (err) throw err;
    });
  });
}
