import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Card, { styles } from '../components/card';

export default function StationaryScreen() {
  const router = useRouter();

  const stores = [
    { name: 'Waltons', url: 'https://www.waltons.co.za' },
    { name: 'PNA', url: 'https://www.pna.co.za' },
    { name: 'Takealot', url: 'https://www.takealot.com' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.foodHeader}>
        <Text style={styles.foodTitle}>Stationary</Text>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeading}>School Products:</Text>
        <Text style={styles.bulletPoint}>• Pencils</Text>
        <Text style={styles.bulletPoint}>• Markers</Text>
        <Text style={styles.bulletPoint}>• Scissors</Text>
        <Text style={styles.bulletPoint}>• Glue</Text>
        <Text style={styles.bulletPoint}>• Folders</Text>
        <Text style={styles.bulletPoint}>• Stamps</Text>
      </View>

      <View style={styles.contentSection}>
        
        <Text style={styles.noteText}>*Note use the address below as the delivery address</Text>
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>
            Ivanhoe Street 3, Gardens,{"\n"}Cape Town, 8001, South Africa
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Buy from stationary stores and deliver to us</Text>

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


      <Card style={styles.donateButton}>
        <Text style={styles.donateButtonText}>Donate ZAR</Text>
      </Card>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}