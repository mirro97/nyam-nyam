// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI8o5UzRkOya0QtNtIuPv03aGS9ISSgN0",
  authDomain: "nyam-nyam-map.firebaseapp.com",
  projectId: "nyam-nyam-map",
  storageBucket: "nyam-nyam-map.appspot.com",
  messagingSenderId: "50836153075",
  appId: "1:50836153075:web:125be151d018b362ad8d86",
  measurementId: "G-EM5Q0LR65F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
