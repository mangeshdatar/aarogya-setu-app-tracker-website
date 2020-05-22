import firebase from "firebase";

import { config } from '../environments/environment'
 
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const newID = firebaseApp.database().ref().push()

export { db ,newID };