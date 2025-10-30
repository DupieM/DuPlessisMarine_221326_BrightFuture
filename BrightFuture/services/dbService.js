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

// fetch food
export const getFoods = async () => {
  const allFoods = [];

  const querySnapshot = await getDocs(collection(db, "food")); // ✅ use "badges" collection
  querySnapshot.forEach((doc) => {
    allFoods.push({ ...doc.data(), id: doc.id });
  });

  return allFoods;
};

// fetch clothes
export const getClothes = async () => {
  const allClothes = [];

  const querySnapshot = await getDocs(collection(db, "clothes")); // ✅ use "badges" collection
  querySnapshot.forEach((doc) => {
    allClothes.push({ ...doc.data(), id: doc.id });
  });

  return allClothes;
};

// fetch stationary
export const getStationaries = async () => {
  const allStationaries = [];

  const querySnapshot = await getDocs(collection(db, "stationaries")); // ✅ use "badges" collection
  querySnapshot.forEach((doc) => {
    allStationaries.push({ ...doc.data(), id: doc.id });
  });

  return allStationaries;
};


// Create user info and initialize badges
export const createUserInformationWithBadges = async (info, uid) => {
  console.log("...creating user with badges");
  try {
    // Get all badges from the "badges" collection
    const badgesSnapshot = await getDocs(collection(db, "badges"));
    const badgesStatus = {};

    badgesSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const badgeName = data.name || docSnap.id; // fallback to ID if name missing
      badgesStatus[badgeName] = false; // store under the name instead of id
    });

    // Merge user info and badges
    const userData = {
      ...info,
      badges: badgesStatus,
    };

    // Save to Firestore
    await setDoc(doc(db, "users", uid), userData);
    console.log("✅ User with badges successfully created (by name)");
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

// Save volunteer form data
export const saveVolunteerform = async (formData)  => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user logged in");
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const volunteerRef = collection(userRef, "volunteerWork");

    await addDoc(volunteerRef, {
      ...formData,
      createdAt: new Date(),
    });

    console.log("✅ Volunteer form saved for user:", user.uid);
  } catch (error) {
    console.error("❌ Error saving volunteer form:", error);
    throw error;
  }
};