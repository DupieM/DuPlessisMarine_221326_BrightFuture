// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4_Ifm9ZE9u_nTjx8HLTF4HVXFmjeRyEo",
  authDomain: "brightfuture-af5b7.firebaseapp.com",
  projectId: "brightfuture-af5b7",
  storageBucket: "brightfuture-af5b7.firebasestorage.app",
  messagingSenderId: "82901784559",
  appId: "1:82901784559:web:66e65e4a06cd472557081a",
  measurementId: "G-Z5N7Y60W8B"
};

// Initialize Firebase app only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);