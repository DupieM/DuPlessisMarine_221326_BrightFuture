import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Card, { styles } from '../components/card';
import { getAuth } from 'firebase/auth';
import { getStationaries, unlockUserBadge } from '@/services/dbService';

type Badge = {
  id: string;
  name: string;
  img?: string;
};

export default function StationaryScreen() {
  const router = useRouter();

  const stores = [
    { name: 'Waltons', url: 'https://www.waltons.co.za' },
    { name: 'PNA', url: 'https://www.pna.co.za' },
    { name: 'Takealot', url: 'https://www.takealot.com' },
  ];

  const [stationaries, setStationaries] = useState<Badge[]>([]);
    const [loading, setLoading] = useState(true);
    const [unlockedBadges, setUnlockedBadges] = useState<Record<string, boolean>>({});
  
    useEffect(() => {
      const fetchStationaries = async () => {
        try {
          const stationaries = await getStationaries();
          setStationaries(stationaries as Badge[]);
          // Optionally, you can fetch which badges the user has unlocked here
          // For now, all badges are locked until unlocked
        } catch (err) {
          console.error("Error fetching badges:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchStationaries();
    }, []);

    const formatBadgeName = (name: string) => {
      // Simple formatting: capitalize first letter
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

  const openDonateLink = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // 1️⃣ Unlock the "food" badge
      await unlockUserBadge(currentUser.uid, "Stationary");

      // 2️⃣ Determine the next badge (optional, for RewardScreen display)
      const nextBadge = "Volunteer"; // for example, next badge you want to show

      // 3️⃣ Navigate to RewardScreen and pass badge info
      router.push({
        pathname: "/Rewards",
        params: { badgeKey: "Stationary", nextBadge },
      });
    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.foodHeaderthree}>
        <Text style={styles.foodTitlethree}>Stationary</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeading}>School Products that you can donate</Text>
        <View style={styles.badgeGridTwo}>
          {stationaries.map((badge) => {
            const isUnlocked = unlockedBadges[badge.name] || false;
              return (
                <View key={badge.id} style={styles.badgeItemThree}>
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

      <Text style={styles.sectionHeading}>Buy from stationary stores & deliver to us</Text>

      <View style={styles.contentSection}>
        
        <Text style={styles.noteTexttwo}>*Note use the address below as the delivery address</Text>
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            Ivanhoe Street 3, Gardens,{"\n"}Cape Town, 8001, South Africa
          </Text>
        </View>
      </View>

        {stores.map((store) => (
          <TouchableOpacity
            key={store.name}
            style={styles.storeButton}
            onPress={() => router.push({ pathname: '/stationaryOnline', params: { url: store.url, title: store.name } })}
          >
            <Text style={styles.storeButtonText}>{store.name}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.line} />
                      </View>


      <Card style={styles.donateButton}  onPress={() => router.push("/PaymentScreen")}>
        <Text style={styles.donateButtonText}>Donate ZAR</Text>
      </Card>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}