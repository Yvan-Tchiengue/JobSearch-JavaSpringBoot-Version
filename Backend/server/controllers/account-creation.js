const con = require('../models/database');
const bcrypt = require('bcrypt');

/**
 * creating a user account in the application
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createAccount = async (req, res) => {
    const user = req.body;
    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    let tableName;
    if (user.type_of_account === 'jobseeker') {
        tableName = 'JobSeeker';
    } else if (user.type_of_account === 'employe') {
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
        res.json({ success: true });
    });
};
