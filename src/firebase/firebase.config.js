// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Old 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAx13HKzzlgX_Ox5TK00kfVBWYdHbfGFcg",
//   authDomain: "flykup-dc700.firebaseapp.com",
//   projectId: "flykup-dc700",
//   storageBucket: "flykup-dc700.firebasestorage.app",
//   messagingSenderId: "937858377272",
//   appId: "1:937858377272:web:ca4083f69b62d3ba82e8cd",
//   measurementId: "G-WEMHK2WNEJ"
// };


//New 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_vpzgfGpG_8NedTIE8U0ToKsIF3VtquE",
  authDomain: "flykup-512cc-e6db9.firebaseapp.com",
  projectId: "flykup-512cc-e6db9",
  storageBucket: "flykup-512cc-e6db9.firebasestorage.app",
  messagingSenderId: "638262178713",
  appId: "1:638262178713:web:232a0247836321e212d908",
  measurementId: "G-LP2Y1HJDF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
