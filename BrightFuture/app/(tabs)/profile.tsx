import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    phonenumber: '',
    email: auth.currentUser?.email || '',
    photoURL: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const userId = auth.currentUser?.uid;

  if (!userId) {
    Alert.alert('Error', 'User not logged in.');
    return;
  }

  const storage = getStorage();

  // Load user data from Firestore
  const loadUserData = async () => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserInfo({
          name: docSnap.data()?.name || '',
          username: docSnap.data()?.username || '',
          phonenumber: docSnap.data()?.phonenumber || '',
          email: docSnap.data()?.email || auth.currentUser?.email || '',
          photoURL: docSnap.data()?.photoURL || '',
        });
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  // Pick an image from the library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${userId}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      setUserInfo(prev => ({ ...prev, photoURL: downloadURL }));

      Alert.alert('Profile Picture', 'Uploaded successfully!');
    } catch (error) {
      console.log('Upload error:', error);
      Alert.alert('Upload Error', 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  // Save all user info to Firestore
  const saveProfile = async () => {
    try {
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, userInfo, { merge: true });
      Alert.alert('Profile', 'Profile saved successfully!');
    } catch (error) {
      console.log('Save error:', error);
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.headerContainer}>
                    {/* Placeholder for the sky image - using the style for visual representation */}
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
            <Text style={{ color: '#fff' }}>Upload</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={userInfo.name}
        onChangeText={text => setUserInfo(prev => ({ ...prev, name: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userInfo.username}
        onChangeText={text => setUserInfo(prev => ({ ...prev, username: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userInfo.phonenumber}
        onChangeText={text => setUserInfo(prev => ({ ...prev, phonenumber: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userInfo.email}
        editable={false}
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5',
  },
   headerContainer: {
        width: 360, 
        height: 170, 
        marginLeft: -20,
        marginTop: -65, 
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 20
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E49086', // Sky Blue background (Placeholder for sky.png)
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 70,
        paddingTop: 90, 
    },
    title: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#000000',
      left: 30
    },
  profileImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginBottom: 20,
    marginLeft: 100
  },
  placeholder: { 
    backgroundColor: '#ccc', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  input: {
    width: '90%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#006A80',
    fontSize: 18,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#006A80',
    left: 10
  },
  button: { 
    backgroundColor: '#A0AA61', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 25, 
    marginTop: 20 ,
    width: 150,
    left: 86
  },
  buttonText: { 
    fontSize: 18, 
    color: '#000', 
    fontWeight: '600' },
  image: {
    width: 360,
    height: 225,
  },
});
