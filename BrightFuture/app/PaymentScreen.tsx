import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

const PaymentScreen = () => (
  <View style={styles.container}>

    <View style={styles.headerContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.title}>Payment</Text>
          </View>
        </View>

    <Image
      source={{ uri: 'https://sakinderhuis.org/wp-content/uploads/2024/01/SnapCode_badge_SSA229010.png' }}
      style={styles.image}
      resizeMode="contain"
    />
  </View>
);

export default PaymentScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffffff',
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
        backgroundColor: '#E49086', // Sky Blue background (Placeholder for sky.png)
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 110,
        paddingTop: 110, 
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#000000',

    },
  image: { 
    width: 500, 
    height: 400,
    marginTop: 40,
    marginLeft: -70
  },
});
