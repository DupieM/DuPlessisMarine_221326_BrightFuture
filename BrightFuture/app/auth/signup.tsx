import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { handleSignin } from '../../services/authService';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Helper function to validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Helper function to validate password strength
  const isStrongPassword = (password: string) => {
    return password.length >= 6;
  };

  // ✅ Main Sign Up Function
  const handleCreation = async () => {
    // Validate all required fields
    if (!name.trim() || !username.trim() || !phonenumber.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in all the required fields.');
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address with "@" (e.g. example@email.com).');
      return;
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    // Send information to Firebase to create a user
    try {
      const infos = { name, username, phonenumber, email, password };
      const success = await handleSignin(email, password, infos);

      if (success) {
        Alert.alert('Success', 'Your account has been created successfully!');
        router.replace('/(tabs)');
      }
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message: string };

        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use. Try signing in instead.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is invalid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak. Please choose a stronger one.';
            break;
          default:
            errorMessage = 'Sign up failed. Please check your details and try again.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert('Sign Up Failed', errorMessage);
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
    color: '#000000ff',
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
    fontWeight: '200',
  },
  signinButton: {
    backgroundColor: '#EFBF5D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 50,
  },
  getStartedText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
});