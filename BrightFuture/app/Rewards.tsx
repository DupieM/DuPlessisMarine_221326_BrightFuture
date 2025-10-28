import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getBadges } from "@/services/dbService";

export default function RewardScreen() {
  const params = useLocalSearchParams();
  // Ensure these are strings
  const badgeKey = Array.isArray(params.badgeKey) ? params.badgeKey[0] : params.badgeKey;
  const nextBadge = Array.isArray(params.nextBadge) ? params.nextBadge[0] : params.nextBadge;

  const [badge, setBadge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Your existing formatBadgeName function
  const formatBadgeName = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  useEffect(() => {
    const fetchBadge = async () => {
      const allBadges = await getBadges();
      const currentBadge = allBadges.find((b) => b.name === badgeKey);
      setBadge(currentBadge);
      setLoading(false);
    };

    fetchBadge();
  }, [badgeKey]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎉 Congratulations! 🎉</Text>
      {badge && (
        <>
          <Image source={{ uri: badge.img }} style={styles.badgeImage} />
          <Text style={styles.badgeName}>You earned: {formatBadgeName(badge.name)}</Text>
        </>
      )}
      {nextBadge && (
        <Text style={styles.nextBadge}>
          Next badge to collect: {formatBadgeName(nextBadge)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#555" },
  badgeImage: { width: 150, height: 255, marginBottom: 10 },
  badgeName: { fontSize: 20, marginBottom: 10, color: "#555" },
  nextBadge: { fontSize: 16, color: "#555" },
});