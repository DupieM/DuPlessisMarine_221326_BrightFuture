// app/FoodWebView.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { getAuth } from 'firebase/auth';
import { unlockUserBadge } from '@/services/dbService';

export default function FoodWebView() {
  const { store } = useLocalSearchParams<{ store: string }>();
  const router = useRouter();

  const [unlockedBadges, setUnlockedBadges] = useState<Record<string, boolean>>({});

  const urls: Record<string, string> = {
    checkers: 'https://www.checkers.co.za/shop',
    picknpay: 'https://www.pnp.co.za/',
  };

  const selectedUrl = urls[store ?? 'checkers'];

  const openDonateLink = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // Unlock the "Food" badge
    await unlockUserBadge(currentUser.uid, "Food");

    // Update local state so the UI shows it unlocked immediately
    setUnlockedBadges((prev) => ({ ...prev, Food: true }));

    const nextBadge = "clothes"; // for example, next badge you want to show

    router.push({
      pathname: "/Rewards",
      params: { badgeKey: "Food", nextBadge },
    });
  };

  return (
    <View style={{ flex: 1, marginBottom: 24}}>
      {/* header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDonateLink} style={styles.backButton}>
          <Text style={styles.backText}>{'‹ Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {store === 'picknpay' ? 'Pick n Pay ASAP!' : 'Checkers Sixty60'}
        </Text>
      </View>

      {/* web content */}
      <WebView
        source={{ uri: selectedUrl }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#5b6e4f" style={{ marginTop: 20 }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2754F',
    paddingVertical: 34,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 10 },
  backText: { color: '#fff', fontSize: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
