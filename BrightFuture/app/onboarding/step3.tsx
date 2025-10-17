import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

export default function Step3() {
  return (
    <View style={styles.container}>

        <Image
        source={require('../../assets/images/hands.png')}
          style={styles.image}
        />

      <Text style={styles.title}>Volunteer to help</Text>
       <Text style={styles.subtitle}>You can easily sign up to give your time as a volunteer to help the children</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          color="#3C667B"
          onPress={() => router.push('/onboarding/step4')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3C667B',
    marginBottom: 20,
    textAlign: 'center',
  },
     subtitle: {
    fontSize: 20,
    color: '#3C667B',
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
