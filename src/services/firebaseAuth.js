import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_nko7u1ok7JfChezb3gOlEMuG-KR7-j8",
  authDomain: "diablo-data.firebaseapp.com",
  projectId: "diablo-data",
  storageBucket: "diablo-data.appspot.com",
  messagingSenderId: "97921082139",
  appId: "1:97921082139:web:cbbf9e1f9ecd485fa0a9be",
  measurementId: "G-78FBGV8QM9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();