import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "text-summariser-a4553.firebaseapp.com",
  projectId: "text-summariser-a4553",
  storageBucket: "text-summariser-a4553.appspot.com",
  messagingSenderId: "799701957054",
  appId: "1:799701957054:web:8f5ec7f2492a2e8d8421ef"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
