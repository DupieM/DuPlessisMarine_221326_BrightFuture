import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../_layout';
import { handleLogin, resetPassword, saveSocialUserToFirestore } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { signInAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ---------- Email/Password Login ----------
  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      const user = await handleLogin(email, password);
      if (user) router.replace('/(tabs)');
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Incorrect email or password.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many login attempts. Try again later.';
            break;
        }
      }
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Reset Password ----------
  const onResetPassword = async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Enter your email to reset your password.');
      return;
    }
    try {
      await resetPassword(email);
      Alert.alert('Check your inbox', 'A password reset email has been sent.');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  // ---------- Guest Login ----------
  const handleContinueGuest = () => signInAsGuest();

  // ---------- Google Login ----------
  const GOOGLE_CLIENT_ID = '82901784559-eabhpq29nteggag89cqdnf4tkp6tmfv7.apps.googleusercontent.com';
  const [googleRequest, googleResponse, promptGoogle] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (googleResponse?.type === 'success' && googleResponse.authentication?.accessToken) {
      handleGoogleLogin(googleResponse.authentication.accessToken);
    }
  }, [googleResponse]);

  const handleGoogleLogin = async (accessToken: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await res.json();
      await saveSocialUserToFirestore(userInfo.id, {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        provider: 'google',
      });
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  // ---------- Facebook Login ----------
  const FACEBOOK_APP_ID = '689340150456661';

  // Correct redirectUri for Expo (works with Expo Go and standalone)
  const fbRedirectUri = AuthSession.makeRedirectUri({
    scheme: 'myapp', // your app scheme
    useProxy: true,   // ✅ for Expo Go development
  } as any);

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    scopes: ['public_profile', 'email'],
    redirectUri: fbRedirectUri,
  });

  useEffect(() => {
    if (fbResponse?.type === 'success' && fbResponse.params.access_token) {
      handleFacebookLogin(fbResponse.params.access_token);
    }
  }, [fbResponse]);

  const handleFacebookLogin = async (token: string) => {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
      );
      const userInfo = await res.json();
      await saveSocialUserToFirestore(userInfo.id, {
        name: userInfo.name,
        email: userInfo.email || 'N/A',
        picture: userInfo.picture?.data?.url,
        provider: 'facebook',
      });
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Facebook login error:', err);
    }
  };

  const goToSignup = () => router.push('/auth/signup');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#006A80"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#006A80"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={onResetPassword}>
          <Text style={styles.password}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinButton} onPress={onLogin} disabled={loading}>
          <Text style={styles.getStartedText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View style={styles.signupbox}>
          <Text style={{ color: '#000000' }}>Don’t have an account? </Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={{ color: '#000000', fontWeight: '600' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Logins */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn} onPress={() => promptGoogle()}>
            <AntDesign name="google" size={22} color="#000" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={async () => {
              await fbPromptAsync(); // ensures Expo Go handles redirect correctly
            }}
          >
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
    backgroundColor: '#ffffffff',
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
    marginLeft: -105,
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