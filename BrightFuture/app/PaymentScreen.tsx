import React, { useState } from 'react';
import { View, Image, Button, Text, StyleSheet, ActivityIndicator, Linking, Alert, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function PaymentScreen() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScanFromURL = async () => {
    setLoading(true);
    try {
      await Camera.requestCameraPermissionsAsync();

      // Scan from your SnapScan QR image
      const result = await Camera.scanFromURLAsync(
        'https://sakinderhuis.org/wp-content/uploads/2024/01/SnapCode_badge_SSA229010.png',
        ['qr']
      );

      if (result.length > 0) {
        const data = result[0].data;
        setScannedData(data);

        // Try to open the SnapScan link
        if (data.startsWith('http')) {
          const supported = await Linking.canOpenURL(data);
          if (supported) {
            Linking.openURL(data);
          } else {
            Alert.alert('Unsupported Link', 'Cannot open this payment link on your device.');
          }
        } else {
          Alert.alert('Scanned Result', data);
        }
      } else {
        setScannedData('No QR code detected.');
      }
    } catch (error) {
      console.error('Error scanning:', error);
      setScannedData('Error scanning QR code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.title}>Payment</Text>
        </View>
      </View>

      <Image
        source={{
          uri: 'https://sakinderhuis.org/wp-content/uploads/2024/01/SnapCode_badge_SSA229010.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.optionsButton} onPress={handleScanFromURL} >
        <Text style={styles.optionsButtonText}>Scan & Pay</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      {scannedData && (
        <Text style={styles.resultText}>
          {scannedData}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    width: 380, 
    height: 200, 
    marginLeft: -20,
    marginTop: -65, 
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E49086',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 110,
    paddingTop: 110, 
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: -20,
  },
  image: { 
    width: 500, 
    height: 400,
    marginTop: 40,
    marginLeft: -70
  },
  optionsButton: {
        backgroundColor: '#E0AC62',
        paddingHorizontal: 27,
        paddingVertical: 8,
        borderRadius: 70,
        position: 'absolute',
        right: 90,
        top: 600,
        width: 177,
        height: 50
    },
    optionsButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 24,
    },
  resultText: {
    marginTop: 20,
    fontSize: 14,
    color: '#ffffffff',
    textAlign: 'center',
  },
});