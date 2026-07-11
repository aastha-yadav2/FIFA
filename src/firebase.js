// Firebase configuration — replace with your real project credentials
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwRzjuZJgyPPbzXM0DytswV5acxPiICNM",
  authDomain: "fifa-aa217.firebaseapp.com",
  projectId: "fifa-aa217",
  storageBucket: "fifa-aa217.firebasestorage.app",
  messagingSenderId: "375269240954",
  appId: "1:375269240954:web:4e2a1d6314f23959ee0bc3",
  measurementId: "G-S7GE0X399S"
};

const app  = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
export default app;
