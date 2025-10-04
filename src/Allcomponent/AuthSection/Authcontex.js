// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAdDpWqq7sLljUp_0R3qnV2OKfboGh7Zk",
  authDomain: "volunter-managment-ae225.firebaseapp.com",
  projectId: "volunter-managment-ae225",
  storageBucket: "volunter-managment-ae225.firebasestorage.app",
  messagingSenderId: "685826167749",
  appId: "1:685826167749:web:c6025be71dad217d0f31ac",
  measurementId: "G-XSGXCR9ETZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();

