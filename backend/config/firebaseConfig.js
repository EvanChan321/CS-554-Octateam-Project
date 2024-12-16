const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Place the Firebase private key here

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
