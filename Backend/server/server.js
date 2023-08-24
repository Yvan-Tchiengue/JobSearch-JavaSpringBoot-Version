const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const multer = require('multer');
require('./models/database'); //Import database.js module to establish database connection.
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/**
 *loading files from the controllers directory
 */
const account_creation = require('./controllers/account-creation');
const jobs_offer = require('./controllers/jobs-offer');
const reject_candidatures = require('./controllers/statusCandidatures');
const accept_candidatures = require('./controllers/statusCandidatures');
const display_jobsoffer = require('./controllers/jobs-offer');
const confirmation = require('./controllers/statusCandidatures');
const my_jobs_candidatures = require('./controllers/statusCandidatures');
const my_jobsoffer = require('./controllers/jobs-offer');
const upload_Candidatures = require('./controllers/statusCandidatures');
const booking_request = require('./controllers/booking-request');
const account_connection = require('./controllers/account-connection');




/**
 * Routes
 */
app.post('/api/account-creating', account_creation.createAccount);
app.post('/api/jobs-offer', jobs_offer.createJobsoffer);
app.post('/api/reject-candidatures', reject_candidatures.rejectCandidatures);
app.post('/api/accept-candidatures', accept_candidatures.acceptCandidatures);
app.get('/api/jobsOffer', display_jobsoffer.displayJobsoffer);
app.get('/api/see-confirmation', confirmation.confirmation);
app.get('/api/myJobsCandidatures', my_jobs_candidatures.myJobsCandidatures);
app.get('/api/myJobsOffer', my_jobsoffer.displayMyJobsoffer);
app.post('/api/upload-candidature', upload_Candidatures.uploadcandidatures);
app.post('/api/booking-request', booking_request.bookingRequests);
app.post('/api/authentification', account_connection.accountConnection);


/**
 *  file upload configuration using Multer
 */
const createFileUploadConfig = (filenamePrefix) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'C:/Users/yvant/Desktop/Cours/Bachelorarbeit/Bachelorarbeit-JobSearch/src/assets');
    },
    filename: (req, file, cb) => {
      const bearerHeader = req.headers['authorization'];
      const bearerToken = JSON.parse(bearerHeader.replace("Bearer", ""));
      const userId = bearerToken.userID;
      cb(null, `${filenamePrefix}${userId}.pdf`);
    }
  });
};

/**
 *  manage file uploads using Multer
 */
const uploadFile = (filenamePrefix) => {
  return multer({ storage: createFileUploadConfig(filenamePrefix) });
};

const uploadTitleOfStay = uploadFile('titleofstay');
const uploadIdentityCard = uploadFile('identitycard');
const uploadWorkPermit = uploadFile('workpermit');
const uploadCv = uploadFile('cv');

/**
 * Routes
 */
app.post('/api/uploadTitleOfStayFiles', uploadTitleOfStay.single('titleOfStay'), async (req, res) => {
});

app.post('/api/uploadIdentityCardFiles', uploadIdentityCard.single('identityCard'), async (req, res) => {
});

app.post('/api/uploadWorkPermitFiles', uploadWorkPermit.single('workPermit'), async (req, res) => {
});

app.post('/api/uploadMotivationLetterFiles', uploadCv.single('cv'), async (req, res) => {
});


app.listen(port, () => {
    console.log('Server is running on port 3000');
});

