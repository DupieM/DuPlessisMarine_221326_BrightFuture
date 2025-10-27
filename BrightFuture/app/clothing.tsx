import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card, { styles } from '../components/card';
import { useRouter } from 'expo-router';

export default function ClothingScreen() {

  const router = useRouter();

  const openDonateLink = () => {
    router.push({
      pathname: "/Payement_Screen",
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.foodHeader}>
        <Text style={styles.foodTitle}>Clothing</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeading}>Please donate any second hand clothes for children</Text>
        <Text style={styles.noteText}>*Note deliver the clothes to the below address</Text>

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

      <Card style={styles.donateButton} onPress={openDonateLink}>
        <Text style={styles.donateButtonText}>Donate ZAR</Text>
      </Card>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}