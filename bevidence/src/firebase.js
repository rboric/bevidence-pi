import { initializeApp } from "firebase/app";
import 'firebase/auth'; 
import 'firebase/firestore'; 

const firebase = initializeApp ({
    apiKey: "AIzaSyAFpiMS50mGtPz4a745Dv4U_doBEC3ljEE",
    authDomain: "bevidence-a97dd.firebaseapp.com",
    projectId: "bevidence-a97dd",
    storageBucket: "bevidence-a97dd.appspot.com",
    messagingSenderId: "737365583679",
    appId: "1:737365583679:web:e3f3ab9c5ae900714cd58a"
  });

  export default firebase;

