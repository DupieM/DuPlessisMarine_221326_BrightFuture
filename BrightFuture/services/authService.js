import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { auth, db } from "../firebase";
import { createUserInformationWithBadges } from "./dbService";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();
const GOOGLE_CLIENT_ID = '82901784559-eabhpq29nteggag89cqdnf4tkp6tmfv7.apps.googleusercontent.com';
const FACEBOOK_APP_ID = '689340150456661';

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

// Google
export const fetchGoogleUser = async (accessToken) => {
  try {
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userInfo = await res.json();
    await saveSocialUserToFirestore(userInfo.id, {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      provider: "google",
    });
    return userInfo;
  } catch (error) {
    console.error("❌ Error fetching Google user:", error);
    throw error;
  }
};

// Facebook
export const fetchFacebookUser = async (accessToken) => {
  try {
    const res = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&type=large&access_token=${accessToken}`
    );
    const userInfo = await res.json();
    await saveSocialUserToFirestore(userInfo.id, {
      name: userInfo.name,
      email: userInfo.email || "N/A",
      picture: userInfo.picture?.data?.url,
      provider: "facebook",
    });
    return userInfo;
  } catch (error) {
    console.error("❌ Error fetching Facebook user:", error);
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