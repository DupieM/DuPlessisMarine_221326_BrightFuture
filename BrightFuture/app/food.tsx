// app/(tabs)/FoodScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Card, { styles } from '../components/card';
import { getFoods } from '@/services/dbService';

type Badge = {
  id: string;
  name: string;
  img?: string;
};

export default function FoodScreen() {
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [unlockedBadges, setUnlockedBadges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const foods = await getFoods();
        setBadges(foods as Badge[]);
        // Optionally, you can fetch which badges the user has unlocked here
        // For now, all badges are locked until unlocked
      } catch (err) {
        console.error("Error fetching badges:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBadges();
  }, []);

  const urls: Record<string, string> = {
    checkers: 'https://www.checkers.co.za/shop',
    picknpay: 'https://www.pnp.co.za/',
  };

  const goToStore = (store: 'checkers' | 'picknpay') => {
    router.push({
      pathname: '/FoodWebView',
      params: { store },
    });
  };


  

  const formatBadgeName = (name: string) => {
    // Simple formatting: capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.foodHeader}>
        <Text style={styles.foodTitle}>Food</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeading}>Non Perishable Products that you can donate</Text>
        <View style={styles.badgeGridTwo}>
          {badges.map((badge) => {
            const isUnlocked = unlockedBadges[badge.name] || false;
            return (
              <View key={badge.id} style={styles.badgeItemTwo}>
                {badge.img ? (
                  <Image
                    source={{ uri: badge.img }}
                    style={styles.badgeImageTwo}
                  />
                ) : (
                  <View style={[styles.badgeImageTwo, { backgroundColor: '#eee' }]} />
                )}
                <Text style={styles.badgeLabelTwo}>{formatBadgeName(badge.name)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Grocery delivery section */}
      <Text style={styles.sectionHeading}>Buy from grocery stores & deliver to us</Text>

      <View style={styles.contentSection}>
        <Image
          source={{ uri: 'https://placehold.co/150x50/800000/ffffff?text=GROCERY+DELIVERY' }}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.noteText}>*Use the address below as the delivery address</Text>
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            Ivanhoe Street 3, Gardens,{'\n'}Cape Town, 8001, South Africa
          </Text>
        </View>
      </View>

      {/* Store buttons */}
      <View style={{ marginVertical: 10, gap: 10 }}>
        <TouchableOpacity style={styles.storeButton} onPress={() => goToStore('checkers')}>
          <Text style={styles.storeButtonText}>Checkers Sixty60</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.storeButtonTwo} onPress={() => goToStore('picknpay')}>
          <Text style={styles.storeButtonTextTwo}>Pick n Pay ASAP!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <Card style={styles.donateButton} onPress={() => router.push("/PaymentScreen")}>
        <Text style={styles.donateButtonText}>Donate ZAR</Text>
      </Card>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}