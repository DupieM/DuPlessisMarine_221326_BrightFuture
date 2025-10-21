import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
// Removed unused imports (Redirect, Slot)
import { Stack, useSegments, useRouter } from 'expo-router'; 
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Assuming you have this hook for theme switching
import { useColorScheme } from '@/hooks/use-color-scheme';

// --- AUTH CONTEXT SETUP ---
interface AuthContextType {
    user: string | null;
    signInAsGuest: () => void;
    isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    signInAsGuest: () => {},
    isLoading: true,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

// --- AUTH STATE MANAGER ---
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const signInAsGuest = useCallback(() => {
        // --- FIX: Add quick loading transition to prevent freeze ---
        setIsLoading(true); 

        // Simulate successful sign-in after a slight delay
        setTimeout(() => {
            setUser('guest-user-123');
            setIsLoading(false); // This switch triggers the RootNavigation redirect cleanly
        }, 50); // Set a very short delay (50ms)
        // --------------------------------------------------------
    }, []);

    useEffect(() => {
        // Initial check: Simulate loading for 500ms
        setTimeout(() => {
            setUser(null); // Start logged out to ensure Login screen is the default
            setIsLoading(false);
        }, 500);
    }, []);

    const value = { user, signInAsGuest, isLoading }; 

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// --- MAIN ROUTING LOGIC ---
const RootNavigation = () => {
    // 1. CALL ALL HOOKS UNCONDITIONALLY AT THE TOP
    const { user, isLoading } = useAuth();
    const router = useRouter(); 
    const segments = useSegments(); 

    // Determine if the user is currently on an authentication/onboarding route
    const inAuthGroup = segments[0] === 'onboarding' || segments[0] === 'auth';

    // 2. Redirect Logic: Use precise path checks to prevent loops
    useEffect(() => {
        const currentPath = segments.join('/'); 

        if (!isLoading) {
            if (user) {
                // AUTHENTICATED: Redirect to the main app if on a login screen.
                if (inAuthGroup) {
                    router.replace('/(tabs)');
                }
            } else {
                // NOT AUTHENTICATED: Redirect to login screen if on a protected screen.
                if (!inAuthGroup && currentPath !== 'onboarding') {
                    router.replace('/auth/login');
                }
            }
        }
    }, [user, isLoading, segments.join('/'), router]); 

    // 3. Conditional Return for Loading State
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F16739" />
            </View>
        );
    }
    
    // 4. Stack Setup based on user state
    return (
        <Stack screenOptions={{ headerShown: false }}>
            
            {user ? (
                // --- PROTECTED ROUTES (LOGGED IN) ---
                <>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="food" options={{ title: 'Food Details', headerShown: true }} />
                    <Stack.Screen name="food-online" options={{ title: 'Checkers 60x60', headerShown: true }} />
                </>
            ) : (
                // --- UNPROTECTED ROUTES (LOGGED OUT) ---
                <>
                    <Stack.Screen name="onboarding" />
                    <Stack.Screen name="auth/login" /> 
                    <Stack.Screen name="auth/signup" />
                </>
            )}
        </Stack>
    );
}

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
