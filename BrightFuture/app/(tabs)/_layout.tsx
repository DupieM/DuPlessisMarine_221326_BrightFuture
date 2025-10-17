import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, Platform } from 'react-native';
import TabBarBackground from '@/components/ui/TabBarBackground';

// import HomeActive from '../../assets/images/Navbar/Home_Active.png';
// import HomeInactive from '../../assets/images/Navbar/Home_Inactive.png';
// import CategoriesActive from '../../assets/images/Navbar/';
// import CategoriesInactive from '../../assets/images/Navbar/';
// import SmilesActive from '../../assets/images/Navbar/';
// import SmilesInactive from '../../assets/images/Navbar/';
// import VolunteerActive from '../../assets/images/Navbar/';
// import VolunteerInactive from '../../assets/images/Navbar/';
// import ProfileActive from '../../assets/images/Navbar/';
// import ProfileInactive from '../../assets/images/Navbar/';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Define your colors
  const activeIconColor = '#EFBF5D'; // White for active SVG
  const inactiveIconColor = '#A0AA61'; // Light blue/grey for inactive SVG
  const tabBarBackgroundColor = '#3C667B'; // Deep purple for tab bar background

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: tabBarBackgroundColor, 
          },
          default: {
            backgroundColor: tabBarBackgroundColor, 
          },
        }),

        tabBarLabelStyle: {
          color: inactiveIconColor,
        },
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: inactiveIconColor,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
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
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarLabel: 'Categories',
          tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Categories_Active.png')
                  : require('../../assets/images/Navbar/Categories_Inactive.png')
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="brightsmiles"
        options={{
          title: 'Smiles',
          tabBarLabel: 'Smiles',
          tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Smiles_Active.png')
                  : require('../../assets/images/Navbar/Smiles_Inactive.png')
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="volunteer"
        options={{
          title: 'Volunteer',
          tabBarLabel: 'Volunteer',
          tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Volunteer_Active.png')
                  : require('../../assets/images/Navbar/Volunteer_Inactive.png')
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarLabelStyle: { fontSize: 10, marginTop: 2 },
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../../assets/images/Navbar/Profile_Active.png')
                  : require('../../assets/images/Navbar/Profile_Inactive.png')
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
