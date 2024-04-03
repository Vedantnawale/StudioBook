import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

export const firebaseConfig = {
  apiKey: "AIzaSyCJlgP2uGiUUiOh4KQks1L2usYpQtyhiX4",
  authDomain: "studiobook-35406.firebaseapp.com",
  projectId: "studiobook-35406",
  storageBucket: "studiobook-35406.appspot.com",
  messagingSenderId: "1092637030563",
  appId: "1:1092637030563:web:68c4fff0190d6052f2e716"
};

const app= initializeApp(firebaseConfig);
export const auth = getAuth(app); // Get the Auth object from Firebase
