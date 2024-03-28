// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-adb97.firebaseapp.com",
  projectId: "mern-blog-adb97",
  storageBucket: "mern-blog-adb97.appspot.com",
  messagingSenderId: "317235162850",
  appId: "1:317235162850:web:c88d8e9031e74d1d4c78bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);