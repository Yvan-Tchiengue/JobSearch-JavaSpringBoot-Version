const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const account_creation = require('./controllers/account-creation');

// Importez le module database.js pour établir la connexion à la base de données
require('./models/database');

app.post('/api/account-creating', account_creation.createAccount);

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

