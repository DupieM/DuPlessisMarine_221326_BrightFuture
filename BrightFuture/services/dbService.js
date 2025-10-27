// Firestore functionality
import {  collection, addDoc, getDocs, orderBy, query, doc, setDoc, where, limit, getDoc } from "firebase/firestore"
import { db } from "../firebase";
import { updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Create rest of user information from sign up page
export const createUserInformation = async (info, uid) => {
    console.log("...call creation")
    try {
        const docRef = await setDoc(doc(db, "users", uid), info);
        console.log("Document successfully written");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// fetch user information
export const getUserInfo = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  try {
    const userDocRef = doc(db, "users", user.uid); // ✅ single document reference
    const userSnap = await getDoc(userDocRef); // ✅ use getDoc, NOT getDocs

    if (userSnap.exists()) {
      return userSnap.data(); // the user document data
    } else {
      console.log("No user data found in Firestore");
      return { nextBadge: "", badges: {} };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// fetch volunteer information
export const getVolunteerInitiatives = async () => {

  const allVolunteerInitiatives = [];

  const querySnapshot = await getDocs(collection(db, "volunteer"));
  querySnapshot.forEach((doc) => {
    allVolunteerInitiatives.push({ ...doc.data(), id: doc.id });
  });

  return allVolunteerInitiatives;
};

// fetch badges
export const getBadges = async () => {
  const allBadges = [];

  const querySnapshot = await getDocs(collection(db, "badges")); // ✅ use "badges" collection
  querySnapshot.forEach((doc) => {
    allBadges.push({ ...doc.data(), id: doc.id });
  });

  return allBadges;
};

// Create user info and initialize badges
export const createUserInformationWithBadges = async (info, uid) => {
  console.log("...creating user with badges");
  try {
    // 1️⃣ Get all badges from the "badges" collection
    const badgesSnapshot = await getDocs(collection(db, "badges"));
    const badgesStatus = {};

    badgesSnapshot.forEach((doc) => {
      badgesStatus[doc.id] = false; // initialize all badges as locked (false)
    });

    // 2️⃣ Merge user info and badges
    const userData = {
      ...info,
      badges: badgesStatus,
    };

    // 3️⃣ Save to Firestore
    await setDoc(doc(db, "users", uid), userData);
    console.log("✅ User with badges successfully created");
  } catch (e) {
    console.error("❌ Error creating user with badges:", e);
  }
};

export const unlockUserBadge = async (uid, badgeId) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      [`badges.${badgeId}`]: true,
    });
    console.log(`✅ Badge ${badgeId} unlocked for user ${uid}`);
  } catch (e) {
    console.error("❌ Error unlocking badge:", e);
  }
};