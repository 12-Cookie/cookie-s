import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "cookie-15f01.firebaseapp.com",
  projectId: "cookie-15f01",
  storageBucket: "cookie-15f01.appspot.com",
  messagingSenderId: "177630679531",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: "G-B4MT8RZG4H",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
