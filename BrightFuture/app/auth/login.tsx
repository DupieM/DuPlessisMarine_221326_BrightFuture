import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

// 1. Import the useAuth hook from the root layout file
import { useAuth } from '../_layout'; 

export default function LoginScreen() {
  // 2. Get the signInAsGuest function from the useAuth hook
  const { signInAsGuest } = useAuth();

  // These functions no longer need 'router.replace' because the
  // logic in app/_layout.tsx handles the navigation automatically 
  // when the user state changes.
  const handleLogin = () => {
    // In a real app, this would call a full login service.
    // For now, we simulate success by signing in as guest.
    signInAsGuest();
  };

  const handleContinueGuest = () => {
    // 3. Call the function that updates the user state
    signInAsGuest();
  };

  const goToSignup = () => {
    // Assuming you have an app/auth/signup.tsx file
    router.push('/auth/signup'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#006A80" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#006A80" secureTextEntry />
        <Text style={styles.password}>Forgot Password?</Text>

        <TouchableOpacity style={styles.signinButton} onPress={handleLogin}>
          <Text style={styles.getStartedText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupbox}>
          <Text style={{ color: '#000000' }}>Don’t have an account? </Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={{ color: '#000000', fontWeight: '600' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Divider Line with "or" */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn}>
            <AntDesign name="google" size={22} color="#000" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="facebook" size={22} color="#000" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.titletwo}>Donate Without Signing Up</Text>
        <TouchableOpacity style={styles.registerButton} onPress={handleContinueGuest}>
          <Text style={styles.registerText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  content: {
    height: 700,
    width: 310,
    alignItems: 'center',
    // backgroundColor: '#b81919a8',
    borderRadius: 15,
    paddingVertical: 30,
    marginTop: -40
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
    width: '80%',
    color: '#006A80',
    marginTop: 23,
    fontWeight: '200',
  },
  password: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginTop: 5,
    marginBottom: 27,
    fontSize: 18,
    color: '#006A80',
    fontStyle: 'italic',
  },
  signinButton: {
    backgroundColor: '#EFBF5D',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  getStartedText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
  signupbox: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9A19A',
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 18,
    color: '#D9A19A',
    fontStyle: 'italic',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginVertical: 20,
    gap: 10
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#3C667B',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: 140,
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#000',
  },
  titletwo: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000ff',
    marginTop: 15
  },
  registerButton: {
    backgroundColor: '#F16739',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
