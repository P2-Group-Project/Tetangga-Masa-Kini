// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlg4Rjfw08jrHF9mr678Jh0HB5XwgZWgA",
  authDomain: "p2-gp-tetangga-masa-kini.firebaseapp.com",
  projectId: "p2-gp-tetangga-masa-kini",
  storageBucket: "p2-gp-tetangga-masa-kini.appspot.com",
  messagingSenderId: "32399799549",
  appId: "1:32399799549:web:9b56508d783b3b65727a94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
