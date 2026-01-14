// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS9C8VmVlUkOo4WDBhQ6BN6p6RLZv7kXY",
  authDomain: "pintrest-clone-45141.firebaseapp.com",
  projectId: "pintrest-clone-45141",
  storageBucket: "pintrest-clone-45141.firebasestorage.app",
  messagingSenderId: "58938599676",
  appId: "1:58938599676:web:9ceba26996972f0ad28f79",
  measurementId: "G-5YVD4RQPRK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { app, db };