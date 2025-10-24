import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

export default function Step3() {
  return (
    <View style={styles.container}>

<View style={styles.content}>
        <Image
        source={require('../../assets/images/hands.png')}
          style={styles.image}
        />

      <Text style={styles.title}>Volunteer to help</Text>
       <Text style={styles.subtitle}>You can easily sign up to give your time as a volunteer to help the children</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8d9ff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 130,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
     subtitle: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 18
  },
});
