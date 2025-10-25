import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { styles } from '../components/card';

export default function StationaryOnlineScreen() {
  const router = useRouter();
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.onlineHeader}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
          <Text style={{ fontSize: 24, color: '#FFFFFF' }}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.onlineTitle}>{title}</Text>
      </View>

      {/* WebView */}
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
}