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
      <Text style={styles.icon}>🎉</Text>
      <Text style={styles.header}>Congratulations!</Text>
      {badge && (
        <>
          <Image source={{ uri: badge.img }} style={styles.badgeImage} />
          <Text style={styles.badgeName}>You earned the</Text>
          <Text style={styles.badgeNametwo}>{formatBadgeName(badge.name)} badge</Text>
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
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: '#d0d5a9ff'
  },
  icon: {
    fontSize: 100,
    marginBottom: 20
  },
  header: { 
    fontSize: 44, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#000000" 
  },
  badgeImage: { 
    width: 152, 
    height: 256, 
    marginBottom: 10 
  },
  badgeName: { 
    fontSize: 30, 
    marginBottom: 10, 
    color: "#000000",
    textAlign: "center",
  },
  badgeNametwo: { 
    fontSize: 34, 
    fontWeight: '900',
    marginBottom: 30, 
    color: "#000000",
    textAlign: "center",
  },
  nextBadge: { 
    fontSize: 24, 
    color: "#000000",
    fontStyle: 'italic',
    marginBottom: 50
  },
});