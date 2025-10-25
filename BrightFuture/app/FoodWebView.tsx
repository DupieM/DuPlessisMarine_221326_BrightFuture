// app/FoodWebView.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function FoodWebView() {
  const { store } = useLocalSearchParams<{ store: string }>();
  const router = useRouter();

  const urls: Record<string, string> = {
    checkers: 'https://www.checkers.co.za/shop',
    picknpay: 'https://www.pnp.co.za/',
  };

  const selectedUrl = urls[store ?? 'checkers'];

  return (
    <View style={{ flex: 1 }}>
      {/* header bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'‹ Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {store === 'picknpay' ? 'Pick n Pay ASAP!' : 'Checkers 60x60'}
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
    backgroundColor: '#5b6e4f',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 10 },
  backText: { color: '#fff', fontSize: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
