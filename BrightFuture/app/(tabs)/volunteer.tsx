import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const opportunities = [
  {
    id: '1',
    title: 'Staff support',
    iconName: 'people-outline',
    iconLib: 'MaterialIcons',
    description:
      'Assist with organizing daily operations and ensuring smooth coordination between teams.',
  },
  {
    id: '2',
    title: 'Sports',
    iconName: 'football-outline',
    iconLib: 'Ionicons',
    description:
      'Help children develop teamwork and confidence through sports and physical activities.',
  },
  {
    id: '3',
    title: 'Educational support',
    iconName: 'book-reader',
    iconLib: 'FontAwesome5',
    description:
      'Provide tutoring and mentoring to help children improve their academic performance.',
  },
  {
    id: '4',
    title: 'Job shadowing',
    iconName: 'work-outline',
    iconLib: 'MaterialIcons',
    description:
      'Give learners real-world exposure by allowing them to observe professionals at work.',
  },
  {
    id: '5',
    title: 'Reading',
    iconName: 'book',
    iconLib: 'FontAwesome',
    description: 'Encourage literacy and imagination by reading stories to children.',
  },
  {
    id: '6',
    title: 'Therapeutic and medical support',
    iconName: 'medkit-outline',
    iconLib: 'Ionicons',
    description:
      'Assist healthcare professionals or provide emotional support to children in need.',
  },
];

const renderIcon = (lib: string, name: string) => {
  switch (lib) {
    case 'MaterialIcons':
      return <MaterialIcons name={name as any} size={50} color="#4b5563" />;
    case 'Ionicons':
      return <Ionicons name={name as any} size={50} color="#4b5563" />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name as any} size={50} color="#4b5563" />;
    case 'FontAwesome':
      return <FontAwesome name={name as any} size={50} color="#4b5563" />;
    default:
      return null;
  }
};

export default function VolunteerScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
                          {/* Placeholder for the sky image - using the style for visual representation */}
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
            {renderIcon(item.iconLib, item.iconName)}
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: '/volunteerDetails',
                  params: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    iconLib: item.iconLib,
                    iconName: item.iconName,
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
        backgroundColor: '#E49086', // Sky Blue background (Placeholder for sky.png)
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 70,
        paddingTop: 90, 
    },
    title: {
        fontSize: 19,
        color: '#000000',
        bottom: 6,
        top: 0
    },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 160
  },
  button: {
    backgroundColor: '#94A83D',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  titletwo: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#000000ff',
    marginTop: 0,
    left: 4
  }
});
