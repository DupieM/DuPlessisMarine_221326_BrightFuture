import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { auth, db } from "../firebase";
import { createUserInformationWithBadges } from "./dbService";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Email/password login
export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Signup
export const handleSignin = async (email, password, info) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserInformationWithBadges(info, userCredential.user.uid);
    return true;
  } catch (error) {
    return false;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(getAuth(), email);
  } catch (error) {
    throw error;
  }
};

// Save Google or Facebook user directly to Firestore
export const saveSocialUserToFirestore = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await createUserInformationWithBadges(userData, uid);
      console.log("Social user saved with badges");
    } else {
      console.log("Social user already exists in Firestore");
    }
  } catch (error) {
    console.error("Error saving social user:", error);
  }
};