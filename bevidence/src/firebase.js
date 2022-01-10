import firebase from "firebase/compat/app";
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDf_y2ZKx3kr7SRshnzLevqlS8R62mxwqE",
  authDomain: "bevidence-b893b.firebaseapp.com",
  projectId: "bevidence-b893b",
  storageBucket: "bevidence-b893b.appspot.com",
  messagingSenderId: "713044182548",
  appId: "1:713044182548:web:113f54e6d11c7c41a94901"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export { firebase, db }; 

