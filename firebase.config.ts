// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXOvE4tiHo8Ki3e11tL98txTERXEXdlwM",
  authDomain: "food-store-8c5c3.firebaseapp.com",
  projectId: "food-store-8c5c3",
  storageBucket: "food-store-8c5c3.appspot.com",
  messagingSenderId: "223563039169",
  appId: "1:223563039169:web:ee7a5a1bc6363701922f40",
  measurementId: "G-N85YFTHM6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
