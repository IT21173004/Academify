const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'academify-a4584.appspot.com' // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();

module.exports = bucket;
