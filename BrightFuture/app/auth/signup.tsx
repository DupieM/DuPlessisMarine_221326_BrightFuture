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
    
            <TextInput style={styles.input} placeholder='Full Name' />
            <TextInput style={styles.input} placeholder='Username' />
            <TextInput style={styles.input} placeholder='Phone Number' />
            <TextInput style={styles.input} placeholder='Email' />
            <TextInput style={styles.input} placeholder='Password' />
            
            <Button title="Register" onPress={handleRegister} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20
    },
    title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#fff'
    },
     input: {
        backgroundColor: '#B1E7A7',
        height: 40,
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 10,
        marginLeft: 35,
        borderRadius: 30,
        width: '80%',
        color: '#00272E',
        marginTop: 23,
        fontFamily: 'NunitoMedium',
        fontWeight: '200'
    },
});