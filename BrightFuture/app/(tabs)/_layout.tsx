import React from 'react';
import { Tabs } from 'expo-router';
// Import 'Image' from 'react-native' here if you are using it locally. 
// We use a placeholder type for the function argument, but you need the actual component.
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme'; 
import { Image } from 'react-native'; // Assuming you have this line locally

// Placeholder function - you can keep this or remove it, as we use inline Image components below
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Define colors based on theme, using your style preferences
  const tintColor = colorScheme === 'dark' ? '#fff' : '#4682B4'; // SteelBlue for active tab
  const inactiveColor = colorScheme === 'dark' ? '#999' : '#666';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false, // Hide header by default
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#333' : '#eee',
          height: 90, // Give some extra room for modern devices
          paddingBottom: 25,
        }
      }}>
      
      {/* 1. Home Screen (app/(tabs)/index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Home_Active.png')
                  : require('../../assets/images/Navbar/Home_Inactive.png')
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      
      {/* 2. Donations/Categories Screen (app/(tabs)/categories.tsx) */}
      <Tabs.Screen
        name="categories" // Matches categories.tsx
        options={{
          title: 'Donate',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Categories_Active.png') // Path assumed
                  : require('../../assets/images/Navbar/Categories_Inactive.png') // Path assumed
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      
      {/* 3. Volunteer Work Screen (app/(tabs)/volunteer.tsx) */}
      <Tabs.Screen
        name="volunteer" // Matches volunteer.tsx
        options={{
          title: 'Volunteer',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Volunteer_Active.png') // Path assumed
                  : require('../../assets/images/Navbar/Volunteer_Inactive.png') // Path assumed
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      
      {/* 4. Bright Smiles Screen (app/(tabs)/brightsmiles.tsx) */}
      <Tabs.Screen
        name="brightsmiles" // Matches brightsmiles.tsx
        options={{
          title: 'Smiles',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Smiles_Active.png') // Path assumed
                  : require('../../assets/images/Navbar/Smiles_Inactive.png') // Path assumed
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      
      {/* 5. Profile Screen (app/(tabs)/profile.tsx) */}
      <Tabs.Screen
        name="profile" // Matches profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Profile_Active.png') // Path assumed
                  : require('../../assets/images/Navbar/Profile_Inactive.png') // Path assumed
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      
    </Tabs>
  );
}