// app/(tabs)/FoodScreen.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// keep your Card component import and styles
import Card, { styles } from '../components/card';

export default function FoodScreen() {
  const router = useRouter();

  const goToStore = (store: 'checkers' | 'picknpay') => {
    router.push({
      pathname: '/FoodWebView',
      params: { store },
    });
  };

  const openDonateLink = () => {
    // keep your current Donate ZAR button behavior if it goes somewhere
    console.log('Donate ZAR button pressed');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.foodHeader}>
        <Text style={styles.foodTitle}>Food</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeading}>
          Non Perishable Products that you can donate
        </Text>
        <Text style={styles.bulletPoint}>• Canned fruits</Text>
        <Text style={styles.bulletPoint}>• Canned vegetables</Text>
        <Text style={styles.bulletPoint}>• Cereal</Text>
        <Text style={styles.bulletPoint}>• Dried Fruit</Text>
        <Text style={styles.bulletPoint}>• Canned Food</Text>
        <Text style={styles.bulletPoint}>• Rice</Text>
        <Text style={styles.bulletPoint}>• Powdered Milk</Text>
      </View>

      <View style={styles.contentSection}>
        <Image
          source={{
            uri: 'https://placehold.co/150x50/800000/ffffff?text=GROCERY+DELIVERY',
          }}
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

      <Text style={styles.sectionHeading}>
          Buy from grocery stores and deliver to us
      </Text>

      {/* --- NEW: Two buttons for in-app webviews --- */}
      <View style={{ marginVertical: 10, gap: 10 }}>
        <TouchableOpacity
          style={styles.storeButton}
          onPress={() => goToStore('checkers')}>
          <Text style={styles.storeButtonText}>Open Checkers 60x60</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storeButton}
          onPress={() => goToStore('picknpay')}>
          <Text style={styles.storeButtonText}>Open Pick n Pay ASAP!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.line} />
              </View>

      {/* keep your original Donate ZAR Card */}

      <Card style={styles.donateButton} onPress={openDonateLink}>
        <Text style={styles.donateButtonText}>Donate ZAR</Text>
      </Card>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}
