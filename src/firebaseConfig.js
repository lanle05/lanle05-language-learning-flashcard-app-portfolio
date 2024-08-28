// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the getAuth function
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import the getFirestore function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4H5aT0rqsLo1eOvZtkwWXs6W6SIOaWrg",
  authDomain: "language-learning-flashcard.firebaseapp.com",
  projectId: "language-learning-flashcard",
  storageBucket: "language-learning-flashcard.appspot.com",
  messagingSenderId: "687010105508",
  appId: "1:687010105508:web:5f5187c462fc612747fe31",
  measurementId: "G-K5D8FWEPWN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
