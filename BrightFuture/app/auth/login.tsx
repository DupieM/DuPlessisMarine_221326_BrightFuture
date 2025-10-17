import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const handleLogin = () => {
    // Add your login logic here
    router.replace('/(tabs)');
  };

  const handleContinueGuest = () => {
    router.replace('/(tabs)');
  };

  const goToSignup = () => {
    router.push('/auth/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

        <TextInput style={styles.input} placeholder='Username' />
        <TextInput style={styles.input} placeholder='Password' />
        <Text style={styles.password}>
        Forgot Password?
        </Text>

      {/* Replace below buttons with your real form */}
      <Button title="Sign In" onPress={handleLogin} />


      {/* Sign Up Link */}
      <View style={styles.signupbox}>
        <Text style={{ color: '#777' }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={goToSignup}>
          <Text style={{ color: '#4A90E2', fontWeight: '600' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    <Text style={styles.ortext}>or</Text>

     <TouchableOpacity style={styles.Btn}>
    <Text style={styles.Btntext}>Google</Text>
    </TouchableOpacity>

     <TouchableOpacity style={styles.Btn2}>
    <Text style={styles.Btntext}>Facebook</Text>
    </TouchableOpacity>


      <Text style={styles.title}>Donate Without Signing Up</Text>
      <Button title="Continue" onPress={handleContinueGuest} />

      
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
    signupbox: {
    flexDirection: 'row', 
    marginTop: 40,
    marginBottom: 30 
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
     password: {
        marginLeft: 50,
        marginTop: 5,
        marginBottom: 27,
        fontSize: 18,
        color: '#9BE931',
        fontFamily: 'NunitoItalic'
    },
    ortext: {
        color: '#fff',
        fontSize: 20
    },
    Btn: {
        backgroundColor: '#58BB44',
        width: 100,
        marginLeft: 85,
        padding: 6,
        borderRadius: 10,
        marginBottom: 25,
        marginTop: 20
    },
    Btn2: {
        backgroundColor: '#58BB44',
        width: 120,
        marginLeft: 85,
        padding: 6,
        borderRadius: 10,
        marginBottom: 25,
        marginTop: 20
    },
    Btntext: {
        fontSize: 23,
        fontWeight: '200',
        textAlign: 'center',
        color: '#303031',
        fontFamily: 'NunitoBlack'
    },

});