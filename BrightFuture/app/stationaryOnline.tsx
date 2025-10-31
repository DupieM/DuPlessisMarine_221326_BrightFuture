import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { styles } from '../components/card';
import { getAuth } from 'firebase/auth';
import { getStationaries, unlockUserBadge } from '@/services/dbService';

export default function StationaryOnlineScreen() {
  const router = useRouter();
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();

  const [unlockedBadges, setUnlockedBadges] = useState<Record<string, boolean>>({});

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
    <View style={{ flex: 1, marginBottom: 24}}>
      {/* Header */}
      <View style={styles.onlineHeader}>
        <TouchableOpacity onPress={openDonateLink} style={{ padding: 10 }}>
          <Text style={{ fontSize: 24, color: '#FFFFFF' }}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.onlineTitle}>{title}</Text>
      </View>

      {/* WebView */}
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}