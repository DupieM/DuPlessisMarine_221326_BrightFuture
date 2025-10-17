import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

export default function Step4() {
  return (
    <View style={styles.container}>

        <Image
        source={require('../../assets/images/reward.png')}
          style={styles.image}
        />

      <Text style={styles.title}>Earn Rewards with Donating</Text>
       <Text style={styles.subtitle}>
            Earn badges when donating while helping children in need
            Note you need to create an account to earn rewards
        </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          color="#3C667B"
          onPress={() => router.push('/auth/login')}
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
