// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYoQUP04_OgmglBRIC6Cj9YkSgbt0cqVw",
  authDomain: "travekplanner.firebaseapp.com",
  projectId: "travekplanner",
  storageBucket: "travekplanner.appspot.com", // FIXED
  messagingSenderId: "830878462003",
  appId: "1:830878462003:web:1438da675690fd7f3ab346",
  measurementId: "G-B8FN8K929Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only enable analytics in browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
