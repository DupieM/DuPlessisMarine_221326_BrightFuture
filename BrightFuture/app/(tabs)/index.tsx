import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Card, { styles, width } from '../../components/card';
import * as WebBrowser from 'expo-web-browser'; // Imported but not used, safe to keep or remove later

// Helper component for the Badge icons (using simple FontAwesome for placeholding)
const BadgeIcon: React.FC<{ icon: string, achieved: boolean }> = ({ icon, achieved }) => (
    <Text style={[styles.badgeIcon, { color: achieved ? '#6B8E23' : '#E0E0E0' }]}>
        {icon}
    </Text>
);

export default function HomeScreen() {
    const router = useRouter();

    // Mock Data for the Dashboard
    const totalDonated = 20000;
    const targetGoal = 300000;
    const progress = (totalDonated / targetGoal) * 100;
    
    // Mock badge progress matching your emojis: [achieved, not, achieved, not, not, not, not]
    const badgeEmojis = ['➡️', '❌', '➡️', '❌', '⬅️', '❌', '⬅️'];
    const badgeAchieved = [true, false, true, false, false, false, false];


    return (
        <View style={styles.container}>
            {/* Must include Stack.Screen for header configuration within the tab */}
            <Stack.Screen options={{ headerShown: false }} /> 

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                
                {/* 1. Header Section (Using background color from Card.tsx as an accessible placeholder) */}
                <View style={styles.headerContainer}>
                    {/* Placeholder for the sky image - using the style for visual representation */}
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.title}>Donor Dashboard</Text>
                    </View>
                </View>

                {/* 2. Donation Balance Card (Pulled up over the header) */}
                <Card style={styles.balanceCard}>
                    <Text style={styles.balanceText}>
                        R {totalDonated.toLocaleString('en-ZA')} - R {targetGoal.toLocaleString('en-ZA')}
                    </Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
                    </View>
                </Card>

                {/* 3. Next Badge Card */}
                <Card style={styles.badgeCard}>
                    <Text style={styles.badgeText}>Next Badge to collect: {'<Name>'}</Text>
                    <View style={styles.badgeRow}>
                        {badgeEmojis.map((icon, index) => (
                            <BadgeIcon key={index} icon={icon} achieved={badgeAchieved[index]} />
                        ))}
                    </View>
                </Card>

                {/* 4. Navigation Buttons */}
                
                {/* Donate ZAR Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#FFDAB9' }]} // Peach Puff color
                    onPress={() => router.push('/categories')} 
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>💵</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Donate ZAR</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#333" />
                </Card>

                {/* Donations History Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#90EE90' }]} // Light Green
                    onPress={() => console.log('Go to Donations History')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>🎁</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Donations</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#333" />
                </Card>

                {/* Volunteer Work Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#ADD8E6' }]} // Light Blue
                    onPress={() => router.push('/volunteer')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>🧑‍🤝‍🧑</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Volunteer Work</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#333" />
                </Card>
                
                {/* Bright Smiles Button */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#FFD700' }]} // Gold
                    onPress={() => router.push('/brightsmiles')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.buttonEmoji}>😄</Text>
                        <Text style={[styles.navButtonText, { marginLeft: 10 }]}>Bright Smiles</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={16} color="#333" />
                </Card>

            </ScrollView>
        </View>
    );
}