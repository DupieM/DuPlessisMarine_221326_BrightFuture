import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import Card, { styles, width } from '../../components/card';

export default function HomeScreen() {
    const router = useRouter();

    // Mocking the imported sky.png and shared components
    const ThemedText = ({ children, style }: any) => <Text style={[{ color: '#1E1924' }, style]}>{children}</Text>;
    const ThemedView = ({ children, style }: any) => <ThemedView style={style}>{children}</ThemedView>;

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Header Section (Mocking Image) */}
                <View style={{ width: 370, height: 200, marginLeft: -20, marginTop: -65, alignItems: 'center',  }}>
                  <Image
                            source={require('../../assets/images/sky.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                          />
                          <Text style={styles.title}>Donar Dashboard</Text>
                </View>

                {/* Progress Bar */}
                <Card style={styles.balanceCard}>
                    <ThemedText style={styles.balanceText}>R 20 000 - R 300 000</ThemedText>
                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>
                </Card>

                {/* Badge Collection */}
                <Card style={styles.badgeCard}>
                    <ThemedText style={styles.badgeText}>Next Badge to collect: {'<Name>'}</ThemedText>
                    <View style={styles.badgeRow}>
                        {['➡️', '❌', '➡️', '❌', '⬅️', '❌', '⬅️'].map((icon, index) => (
                            <Text key={index} style={styles.badgeIcon}>{icon}</Text>
                        ))}
                    </View>
                </Card>

                {/* Navigation Buttons */}
                <Card 
                    style={[styles.navButton, { backgroundColor: '#FFDAB9' }]}
                >
                    <ThemedText style={styles.navButtonText}>Donate ZAR</ThemedText>
                    <Text style={styles.buttonEmoji}>💵</Text>
                </Card>

                <Card 
                    style={[styles.navButton, { backgroundColor: '#90EE90' }]}
                    onPress={() => router.push('/categories')}
                >
                    <ThemedText style={styles.navButtonText}>Donations</ThemedText>
                    <Text style={styles.buttonEmoji}>🎁</Text>
                </Card>

                <Card 
                    style={[styles.navButton, { backgroundColor: '#ADD8E6' }]}
                    onPress={() => router.push('/volunteer')}
                >
                    <ThemedText style={styles.navButtonText}>Volunteer Work</ThemedText>
                    <Text style={styles.buttonEmoji}>🧑‍🤝‍🧑</Text>
                </Card>

                <Card 
                    style={[styles.navButton, { backgroundColor: '#FFD700' }]}
                    onPress={() => router.push('/brightsmiles')}
                >
                    <ThemedText style={styles.navButtonText}>Bright Smiles</ThemedText>
                    <Text style={styles.buttonEmoji}>😄</Text>
                </Card>

            </ScrollView>
        </ThemedView>
    );
}