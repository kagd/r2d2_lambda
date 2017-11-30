import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey';
import { FIREBASE_DB_URL } from './constants';

let firebaseApp: admin.app.App;
let firebaseDb: admin.database.Database;

export function getDatabase(): admin.database.Database {
  return firebaseDb || initializeDb();
}

function initializeDb() {
  return firebaseDb = getApp().database();
}

export function getApp(): admin.app.App {
  return firebaseApp || initializeApp();
}

function initializeApp() {
  return firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DB_URL,
  });
}
