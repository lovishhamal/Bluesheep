var admin = require('firebase-admin');

var serviceAccount = require('./bluesheep-b173e-firebase-adminsdk-qbs5p-79152ebeae.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bluesheep.firebaseio.com',
});

module.exports = admin;
