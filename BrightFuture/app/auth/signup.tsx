import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { handleSignin } from '../../services/authService';

export default function SignUpScreen() {

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //Sign up Function
    const handleCreation = async () => {
        // Validate all required fields are filled
        if (!name.trim() || !username.trim() || !phonenumber.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Validation Error", "Please fill all the required fields.");
            return;
        }
    
        // Check password length
        if (password.length < 6) {
            Alert.alert("Validation Error", "Password is too short. It must be at least 6 characters.");
            return;
        }
    
        // Send information to Firestore to create a user
        var infos = { name, username, phonenumber, email, password };
        var success = await handleSignin(email, password, infos);
    
        // Check success of the sign-up process
        if (success) {
          Alert.alert("Sign Up", "You have successfully signed into carbonTrack.");
          router.replace('/(tabs)');
        }
    };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F5F5F5' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#006A80"
            onChangeText={setName}
            value={name}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#006A80"
            onChangeText={setUserName}
            value={username}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#006A80"
            keyboardType="phone-pad"
            onChangeText={setPhonenumber}
            value={phonenumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#006A80"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#006A80"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <TouchableOpacity style={styles.signinButton} onPress={handleCreation}>
            <Text style={styles.getStartedText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F5F5F5',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 43, 
    fontWeight: 'bold', 
    marginBottom: -7,
    color: '#000000ff'
  },
  input: {
    borderBottomColor: '#006A80',
    borderBottomWidth: 3,
    height: 50,
    fontSize: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    width: '80%',
    color: '#006A80',
    marginTop: 23,
    fontFamily: 'NunitoMedium',
    fontWeight: '200',
  },
  signinButton: {
    backgroundColor: '#EFBF5D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 50
  },
  getStartedText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
});