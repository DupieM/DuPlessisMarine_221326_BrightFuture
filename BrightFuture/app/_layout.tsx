import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Stack, useSegments, useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useColorScheme } from '@/hooks/use-color-scheme';

// --- AUTH CONTEXT SETUP ---
interface AuthContextType {
  user: any | null;
  signInAsGuest: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInAsGuest: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

// --- AUTH STATE MANAGER ---
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInAsGuest = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ guest: true });
      setIsLoading(false);
    }, 50);
  }, []);

  // ✅ Listen for real Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('✅ User logged in:', firebaseUser.email);
        setUser(firebaseUser);
      } else {
        console.log('🚪 User logged out');
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { user, signInAsGuest, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- MAIN ROUTING LOGIC ---
const RootNavigation = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const inAuthGroup = segments[0] === 'onboarding' || segments[0] === 'auth';

  useEffect(() => {
    if (isLoading) return;

    const currentPath = segments.join('/');

    if (user) {
      if (inAuthGroup) {
        router.replace('/(tabs)');
      }
    } else {
      if (!inAuthGroup && currentPath !== 'onboarding') {
        router.replace('/auth/login');
      }
    }
  }, [user, isLoading, segments.join('/'), router]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F16739" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="food" options={{ title: 'Food Details', headerShown: true }} />
          <Stack.Screen name="food-online" options={{ title: 'Checkers 60x60', headerShown: true }} />
        </>
      ) : (
        <>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/signup" />
        </>
      )}
    </Stack>
  );
};

// --- ROOT LAYOUT COMPONENT ---
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});