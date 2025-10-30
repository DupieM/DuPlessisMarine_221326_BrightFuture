import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { getVolunteerInitiatives } from '@/services/dbService';

export default function VolunteerScreen() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getVolunteerInitiatives();
        setOpportunities(data);
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#94A83D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.titletwo}>Volunteer</Text>
        </View>
      </View>

      <FlatList
        data={opportunities}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: '/volunteerDetails',
                  params: {
                    id: item.id,
                    title: item.name,
                    description: item.description,
                    imageUrl: item.img,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>Detail</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  headerContainer: {
    width: 370,
    height: 170,
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
    paddingLeft: 70,
    paddingTop: 90,
  },
  titletwo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 0,
    left: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 220,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 19,
    color: '#000000',
    top: 0,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#94A83D',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});