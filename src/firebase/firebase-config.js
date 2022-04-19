import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD56ddhy96dU0jlAh3e8llibnxLmwPv69k",
  authDomain: "react-app-curso-3e811.firebaseapp.com",
  projectId: "react-app-curso-3e811",
  storageBucket: "react-app-curso-3e811.appspot.com",
  messagingSenderId: "258192040895",
  appId: "1:258192040895:web:d3edfa53720e9b6ddbf70a"
};

firebase.initializeApp(firebaseConfig);;//"firebase" es la base de datos

const db = firebase.firestore();//la referencia a firestore(la bd)
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();//esto es para que pueda hacer autenticacion con google


export {
    db,
    googleAuthProvider,
    firebase,
}