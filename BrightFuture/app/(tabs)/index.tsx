import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Card, { styles, width } from '../../components/card';
import * as WebBrowser from 'expo-web-browser'; // Imported but not used, safe to keep or remove later
import { getBadges, getUserInfo } from '@/services/dbService';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function HomeScreen() {
    const router = useRouter();

    // Mock Data for the Dashboard
    const totalDonated = 50000;
    const targetGoal = 300000;
    const progress = (totalDonated / targetGoal) * 100;
    
    const [allBadges, setAllBadges] = useState<any[]>([]);
    const [userData, setUserData] = useState({ nextBadge: '', badges: {} });

    useEffect(() => {
      const auth = getAuth();

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Fetch all badges metadata
          const badges = await getBadges();
          setAllBadges(badges);

          // Fetch current user's badge data
          const currentUserDataRaw = await getUserInfo();

          const currentUserData = {
            nextBadge: currentUserDataRaw?.nextBadge || "",
            badges: currentUserDataRaw?.badges || {},
          };

          setUserData(currentUserData);
        }
      });

      return () => unsubscribe(); // clean up listener when component unmounts
    }, []);


    return (
        <View style={styles.container}>
            {/* Must include Stack.Screen for header configuration within the tab */}
            <Stack.Screen options={{ headerShown: false }} /> 

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                
                {/* 1. Header Section (Using background color from Card.tsx as an accessible placeholder) */}
                <View style={styles.headerContainer}>
                    {/* Placeholder for the sky image - using the style for visual representation */}
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.title}>Dashboard</Text>
                    </View>
                </View>

                {/* 2. Donation Balance Card (Pulled up over the header) */}
                <Card style={styles.balanceCard}>
                    <Text style={styles.balanceText}>
                        R {totalDonated.toLocaleString('en-ZA')} - R {targetGoal.toLocaleString('en-ZA')}
                    </Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
                    </View>
                </Card>

                <View style={styles.badgeContainer}>
                  <Text style={styles.nextBadge}>
                    Next Badge to collect: {userData.nextBadge}
                  </Text>

                  <View style={styles.badgeGrid}>
                    {Object.entries(userData.badges || {}).map(([key, value]) => {
                      const badge = allBadges.find((b) => b.id === key);
                      return (
                        <View key={key} style={styles.badgeItem}>
                          <Image
                            source={{ uri: badge?.img }}
                            style={[
                              styles.badgeImage,
                              !value && { opacity: 1, tintColor: "#9e9e9e" },
                            ]}
                          />
                          <Text style={styles.badgeLabel}>{formatBadgeName(badge?.name)}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                
                {/* Donate ZAR Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#D2754F' }]} // Peach Puff color
                    onPress={() => router.push('/')} 
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>💵</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Donate ZAR</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#ffff" />
                </Card>

                {/* Donations History Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#A0AA61' }]} // Light Green
                    onPress={() => router.push('/categories')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>🎁</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Donations</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#ffff" />
                </Card>

                {/* Volunteer Work Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#4EA8BA' }]} // Light Blue
                    onPress={() => router.push('/volunteer')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>🧑‍🤝‍🧑</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Volunteer Work</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#ffff" />
                </Card>

            </ScrollView>
        </View>
    );
}

// Helper function — add this inside same file, below or above component
const formatBadgeName = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

