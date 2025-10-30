import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const authInstance = getAuth();
  const [user, setUser] = useState<any>(authInstance.currentUser);
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    phonenumber: "",
    email: authInstance.currentUser?.email || "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const storage = getStorage();

  // Watch user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // ✅ Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo({
            name: docSnap.data()?.name || "",
            username: docSnap.data()?.username || "",
            phonenumber: docSnap.data()?.phonenumber || "",
            email: docSnap.data()?.email || authInstance.currentUser?.email || "",
            photoURL: docSnap.data()?.photoURL || "",
          });
        }
      } catch (error) {
        console.log("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Modernized image picker (Expo SDK 52+)
  const pickImage = async () => {
    try {
      // Request permissions first
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission required", "Please allow access to your photos.");
        return;
      }

      // Launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      // The result API has changed — check if the selection was cancelled
      if (result.canceled) {
        return;
      }

      // Access selected image
      const selectedAsset = result.assets?.[0];
      if (selectedAsset?.uri) {
        await uploadImage(selectedAsset.uri);
      }
    } catch (error) {
      console.error("Image pick error:", error);
      Alert.alert("Error", "Failed to open image picker.");
    }
  };


  // Upload image
  const uploadImage = async (uri: string) => {
  if (!user) {
    Alert.alert("Error", "User not authenticated.");
    return;
  }

  try {
    setUploading(true);

    // Fetch image as blob (Expo-compatible)
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Failed to fetch image from local URI");
    }
    const blob = await response.blob();

    // Reference in Firebase Storage
    const storageRef = ref(storage, `profilePictures/${user.uid}_${Date.now()}.jpg`);

    // Upload the blob
    await uploadBytes(storageRef, blob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Update local state
    setUserInfo((prev) => ({ ...prev, photoURL: downloadURL }));

    // Save to Firestore
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { photoURL: downloadURL }, { merge: true });

    Alert.alert("Success", "Profile picture uploaded successfully!");
  } catch (error: any) {
    console.error("Upload error:", error);
    Alert.alert("Upload Error", error.message || "Failed to upload image.");
  } finally {
    setUploading(false);
  }
};

  // ✅ Save profile
  const saveProfile = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, userInfo, { merge: true });
      Alert.alert("Profile", "Profile saved successfully!");
    } catch (error) {
      console.log("Save error:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      Alert.alert("Logged out", "You have successfully logged out.");
      router.replace("/"); // navigate back to login
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />
    );
  }

  // ✅ Not logged in
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>You are not logged in.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Main UI
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.title}>Profile</Text>
        </View>
      </View>

      <TouchableOpacity onPress={pickImage}>
        {uploading ? (
          <ActivityIndicator size="large" />
        ) : userInfo.photoURL ? (
          <Image source={{ uri: userInfo.photoURL }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.placeholder]}>
            <Text style={{ color: "#fff" }}>Upload</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userInfo.name}
        onChangeText={(text) => setUserInfo((prev) => ({ ...prev, name: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userInfo.username}
        onChangeText={(text) => setUserInfo((prev) => ({ ...prev, username: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userInfo.phonenumber}
        onChangeText={(text) => setUserInfo((prev) => ({ ...prev, phonenumber: text }))}
      />
      <TextInput style={styles.input} placeholder="Email" value={userInfo.email} editable={false} />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5" 
  },
  headerContainer: {
    width: 360,
    height: 170,
    marginLeft: -20,
    marginTop: -65,
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E49086",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 70,
    paddingTop: 90,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#000000",
    left: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    marginLeft: 100,
  },
  placeholder: { 
    backgroundColor: "#ccc", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  input: {
    width: "90%",
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#006A80",
    fontSize: 18,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: "#006A80",
    left: 10,
  },
  button: {
    backgroundColor: "#A0AA61",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    width: 150,
    left: 86,
  },
  buttonText: { fontSize: 18, color: "#000", fontWeight: "600" },
  logoutButton: {
    backgroundColor: "#D2754F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 20,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});