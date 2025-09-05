// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYoQUP04_OgmglBRIC6Cj9YkSgbt0cqVw",
  authDomain: "travekplanner.firebaseapp.com",
  projectId: "travekplanner",
  storageBucket: "travekplanner.firebasestorage.app",
  messagingSenderId: "830878462003",
  appId: "1:830878462003:web:1438da675690fd7f3ab346",
  measurementId: "G-B8FN8K929Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Firebase Auth instance
export const auth = getAuth(app);
