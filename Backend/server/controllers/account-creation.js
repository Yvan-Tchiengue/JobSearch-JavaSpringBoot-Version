const con = require('../models/database');
const bcrypt = require('bcrypt');

/**
 * creation d'un compte utilisateur dans l'application
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createAccount = async (req, res) => {
    console.log("voici les données récuperées du front-end: ", JSON.stringify(req.body), req.body);
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
        console.log('Creation de compte ok');
        res.json({ success: true });
    });
};
