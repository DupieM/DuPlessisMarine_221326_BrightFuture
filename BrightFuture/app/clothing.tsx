import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Card, { styles } from '../components/card';
import { router } from 'expo-router';
import { getClothes } from '@/services/dbService';

type Badge = {
  id: string;
  name: string;
  img?: string;
};

export default function ClothingScreen() {

const [clothes, setClothes] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [unlockedBadges, setUnlockedBadges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const clothes = await getClothes();
        setClothes(clothes as Badge[]);
        // Optionally, you can fetch which badges the user has unlocked here
        // For now, all badges are locked until unlocked
      } catch (err) {
        console.error("Error fetching badges:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClothes();
  }, []);

  const formatBadgeName = (name: string) => {
    // Simple formatting: capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.foodHeadertwo}>
        <Text style={styles.foodTitletwo}>Clothing</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeading}>Please donate any second hand clothes for children</Text>

        <View style={styles.badgeGridTwo}>
                  {clothes.map((badge) => {
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


        <Text style={styles.noteTextThree}>*Note deliver the clothes to the below address</Text>

        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            Ivanhoe Street 3, Gardens,{"\n"}Cape Town, 8001, South Africa
          </Text>
        </View>
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