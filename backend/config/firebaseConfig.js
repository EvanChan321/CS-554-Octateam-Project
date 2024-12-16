import { createRequire } from 'module';
import admin from 'firebase-admin';

const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
