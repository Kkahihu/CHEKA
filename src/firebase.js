// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBsrX5eqZYmWbTaoburziafufLfRCeSmao",
  authDomain: "multichart-kelvin.firebaseapp.com",
  projectId: "multichart-kelvin",
  storageBucket: "multichart-kelvin.appspot.com",
  messagingSenderId: "766881626664",
  appId: "1:766881626664:web:5f8e40086dd4c1f1c9d31d",
  measurementId: "G-J2FRKX0PLQ"
};

//initialize config 
 const firebaseApp = firebase.initializeApp(firebaseConfig);

 //const database = firebase.database();
 //initialize database
  const db = firebaseApp.firestore(); 
  //initialize auth
  const auth = firebaseApp.auth();
  //initialize google auth
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;