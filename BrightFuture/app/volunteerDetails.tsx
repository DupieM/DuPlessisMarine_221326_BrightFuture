import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function VolunteerDetailScreen() {
  const { title, description, iconLib, iconName, imageUrl} = useLocalSearchParams();

  const renderIcon = (lib: string, name: string) => {
    switch (lib) {
      case 'MaterialIcons':
        return <MaterialIcons name={name as any} size={80} color="#4b5563" />;
      case 'Ionicons':
        return <Ionicons name={name as any} size={80} color="#4b5563" />;
      case 'FontAwesome5':
        return <FontAwesome5 name={name as any} size={80} color="#4b5563" />;
      case 'FontAwesome':
        return <FontAwesome name={name as any} size={80} color="#4b5563" />;
      default:
        return null;
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    experience: '',
    availability: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleJoin = () => {
    console.log('Volunteer form submitted:', formData);
    alert('Thank you for volunteering!');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl as string }} style={styles.detailImage} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.formHeader}>Volunteer Now</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Name" onChangeText={(v) => handleChange('name', v)} placeholderTextColor="#D2754F"/>
        <TextInput style={styles.input} placeholder="Surname" onChangeText={(v) => handleChange('surname', v)} placeholderTextColor="#D2754F"/>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(v) => handleChange('email', v)} placeholderTextColor="#D2754F"/>
        <TextInput style={styles.input} placeholder="Phone Number" onChangeText={(v) => handleChange('phoneNumber', v)} placeholderTextColor="#D2754F"/>
        <TextInput style={styles.input} placeholder="Experience" onChangeText={(v) => handleChange('experience', v)} placeholderTextColor="#D2754F"/>
        <TextInput style={styles.input} placeholder="Availability" onChangeText={(v) => handleChange('availability', v)} placeholderTextColor="#D2754F"/>

        <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
          <Text style={styles.joinText}>Join</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  iconContainer: { alignItems: 'center', marginVertical: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 22, textAlign: 'justify', marginBottom: 20 },
  formHeader: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  form: { gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  joinButton: {
    backgroundColor: '#006A80',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  joinText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});