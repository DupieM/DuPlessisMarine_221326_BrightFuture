import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4_Ifm9ZE9u_nTjx8HLTF4HVXFmjeRyEo",
  authDomain: "brightfuture-af5b7.firebaseapp.com",
  projectId: "brightfuture-af5b7",
  storageBucket: "brightfuture-af5b7.firebasestorage.app",
  messagingSenderId: "82901784559",
  appId: "1:82901784559:web:66e65e4a06cd472557081a",
  measurementId: "G-Z5N7Y60W8B"
};

// Initialize Firebase app (singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firestore
export const db = getFirestore(app);

// Auth: initialize only if not already initialized
export const auth = getApps().length && getAuth().app
  ? getAuth()
  : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });