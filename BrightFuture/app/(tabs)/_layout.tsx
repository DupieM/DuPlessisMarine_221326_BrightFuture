import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  

  const colorScheme = useColorScheme();

  // Tab colors
  const tintColor = colorScheme === 'dark' ? '#fff' : '#EFBF5D'; // active tab
  const inactiveColor = colorScheme === 'dark' ? '#999' : '#A0AA61';
  const tabBarBackgroundColor = '#3C667B'; // Your app’s blue

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}> 
      {/* Status bar: black with light content */}
      <StatusBar style="dark" backgroundColor="#000000" />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tintColor,
          tabBarInactiveTintColor: inactiveColor,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: tabBarBackgroundColor, // keep blue
            height: 90,
            paddingBottom: 25,
          },
        }}
      >
        {/* 1. Home */}
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

        {/* 2. Categories */}
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Donate',
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

        {/* 3. Volunteer */}
        <Tabs.Screen
          name="volunteer"
          options={{
            title: 'Volunteer',
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

        {/* 4. Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
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
    </View>
  );
}