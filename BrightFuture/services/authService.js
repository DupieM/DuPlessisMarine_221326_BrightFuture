// Firebase Auth Functions
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, getAuth, signInWithCredential, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth, db } from "../firebase";
import { createUserInformation, createUserInformationWithBadges } from "./dbService";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-facebook';
import { doc, setDoc, getDoc } from 'firebase/firestore';


// Log In
export const handleLogin = async (email, password) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged In User -" + user.email);
      return user; // Login success
  } catch (error) {
      console.log(error.message); // Log the error for debugging
      throw error; // Throw the error to be caught in the login function
  }
};

// Reset password of account
export const resetPassword = async (email) => {
  try {
    const authInstance = getAuth();
    await sendPasswordResetEmail(authInstance, email);
    console.log("Password reset email sent.");
  } catch (error) {
    console.error("Error resetting password:", error.message);
  }
};

// Create an account
export const handleSignin = async (email, password, info) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Signed In User - " + user.uid);

    // Save extra info in Firestore
    await createUserInformationWithBadges(info, user.uid);

    return true; // ✅ Indicate success
  } catch (error) {
    console.log("Sign-up error:", error.message);
    return false; // ✅ Indicate failure
  }
};

// Google Login
WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            badges: {},
          });
        }
      });
    }
  }, [response]);

  return { promptAsync };
}

// facebook Login
export async function signInWithFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: process.env.FACEBOOK_APP_ID,
    });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
      const credential = FacebookAuthProvider.credential(token);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          badges: {},
        });
      }
    }
  } catch (error) {
    console.log('Facebook sign-in error:', error);
  }
}