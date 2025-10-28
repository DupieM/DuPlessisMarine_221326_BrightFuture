import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const PaymentScreen = () => (
  <View style={styles.container}>
    <Image
      source={{ uri: 'https://sakinderhuis.org/wp-content/uploads/2024/01/SnapCode_badge_SSA229010.png' }}
      style={styles.image}
      resizeMode="contain"
    />
  </View>
);

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 300, height: 200 },
});
