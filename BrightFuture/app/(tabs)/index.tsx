import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Stack, useRouter, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Card, { styles, width } from '../../components/card';
import { getBadges, getUserInfo } from '@/services/dbService';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function HomeScreen() {
  const router = useRouter();
  const totalDonated = 100000;
  const targetGoal = 300000;
  const progress = (totalDonated / targetGoal) * 100;

  const [allBadges, setAllBadges] = useState<any[]>([]);
  type UserData = {
    nextBadge: string;
    badges: Record<string, boolean>;
  };

  const [userData, setUserData] = useState<UserData>({
    nextBadge: '',
    badges: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const badges = await getBadges(); // [{ name, img, id }]
          console.log("Ordered badges:", badges.map(b => b.number));
          setAllBadges(badges);

          const currentUserDataRaw = await getUserInfo();
          const currentUserData = {
            nextBadge: currentUserDataRaw?.nextBadge || "",
            badges: currentUserDataRaw?.badges || {},
          };

          setUserData(currentUserData);
        } catch (err) {
          console.error("Error fetching badges:", err);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4EA8BA" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.imagePlaceholder}>
          </View>
        </View>

        {/* Donation Progress */}
        <Card style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Donation Goals</Text>
           <View style={styles.progressLabelContainer}>
            <Text style={styles.raisedAmount}>R{totalDonated.toLocaleString('en-ZA')}</Text>
            <Text style={styles.targetAmount}> / R{targetGoal.toLocaleString('en-ZA')}</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
          </View>
          <Text style={styles.progressBarText}>See how close we are to reaching our fundraising target!</Text>
        </Card>

        {/* Badges Section */}
        <View style={styles.badgeContainer}>
          <Text style={styles.nextBadge}>
            Badges you have so far
          </Text>

          <View style={styles.badgeGrid}>
            {allBadges.map((badge) => {
              const isUnlocked = userData.badges?.[badge.name] || false;

              return (
                <View key={badge.id} style={styles.badgeItem}>
                  {badge.img ? (
                    <Image
                      source={{ uri: badge.img }}
                      style={[
                        styles.badgeImage,
                        !isUnlocked && { tintColor: '#9e9e9e' }, // greyed-out locked badges
                      ]}
                    />
                  ) : (
                    <View style={[styles.badgeImage, { backgroundColor: '#eee' }]} />
                  )}
                  <Text style={styles.badgeLabel}>{formatBadgeName(badge.name)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Donate Button */}
        <Card style={[styles.navButton, { backgroundColor: '#D2754F' }]} onPress={() => router.push("/PaymentScreen")}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/dashboard/ZAR.png')}
              style={styles.image}
            />
            <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Donate ZAR</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#fff" />
        </Card>

        {/* Donations Button */}
        <Card style={[styles.navButton, { backgroundColor: '#A0AA61' }]} onPress={() => router.push('/categories')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/donate.png')}
              style={styles.image}
            />
            <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Donations</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#fff" />
        </Card>

        {/* Volunteer Button */}
        <Card style={[styles.navButton, { backgroundColor: '#4EA8BA' }]} onPress={() => router.push('/volunteer')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/hands.png')}
              style={styles.image}
            />
            <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Volunteer Work</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#fff" />
        </Card>
      </ScrollView>
    </View>
  );
}

// ✅ Safe helper to prevent `replace of undefined` errors
const formatBadgeName = (key?: string) => {
  if (!key) return '';
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};