import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';


export default function SignUpScreen() {

    const handleRegister = () => {
    // Add your login logic here
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
    
            <TextInput style={styles.input} placeholder='Full Name' placeholderTextColor="#006A80"/>
            <TextInput style={styles.input} placeholder='Username' placeholderTextColor="#006A80"/>
            <TextInput style={styles.input} placeholder='Phone Number' placeholderTextColor="#006A80"/>
            <TextInput style={styles.input} placeholder='Email' placeholderTextColor="#006A80"/>
            <TextInput style={styles.input} placeholder='Password' placeholderTextColor="#006A80"/>
            

            <TouchableOpacity style={styles.signinButton} onPress={handleRegister}>
              <Text style={styles.getStartedText}>Register</Text>
            </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 43, 
    fontWeight: 'bold', 
    marginBottom: -7,
    color: '#000000ff'
  },
  input: {
    borderBottomColor: '#006A80',
    borderBottomWidth: 3,
    height: 50,
    fontSize: 22,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    width: '80%',
    color: '#006A80',
    marginTop: 23,
    fontFamily: 'NunitoMedium',
    fontWeight: '200',
  },
  signinButton: {
    backgroundColor: '#EFBF5D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 50
  },
  getStartedText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
  },
});