const con = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * fonction d'authentification pour seconnecter a l'application
 * @param req
 * @param res
 */
exports.accountConnection = (req, res) =>{
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
      return res.json({ token, userType: user.type_of_account, userID: user.id, userName: user.namee });
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
      res.json({ token, userType: user.type_of_account, userID: user.id, userName: user.namee });
    });
  });
}
