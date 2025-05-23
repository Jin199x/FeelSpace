// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "feelspace-7.firebaseapp.com",
  projectId: "feelspace-7",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:3685822280:web:a1e99ec4d597cf248b4d7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
