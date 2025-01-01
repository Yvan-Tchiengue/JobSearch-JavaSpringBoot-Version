const con = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * authentication function to connect to the application
 * @param req
 * @param res
 */
exports.accountConnection = (req, res) =>{
  const { email, password } = req.body;

  con.query('SELECT * FROM JobSeeker WHERE email = ?', [email], async (error, jobSeekerResults) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (jobSeekerResults.length > 0) {
      const user = jobSeekerResults[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect email address or password' });
      }

      const token = jwt.sign({ id: user.id, type: 'JobSeeker' }, 'tony', { expiresIn: '24h' });
      return res.json({ token, userType: user.type_of_account, userID: user.id, userName: user.namee });
    }

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
        console.log('test 1 ok');
      })
        return res.status(400).json({ error: 'Incorrect email address or password' });
      }

      const token = jwt.sign({ id: user.id, type: 'Employer' }, 'tony', { expiresIn: '24h' });
      res.json({ token, userType: user.type_of_account, userID: user.id, userName: user.namee });
    });
  });
}
