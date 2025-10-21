import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

// Import the consolidated styles
import Card, { styles, width } from '../components/card';

export default function FoodOnlineScreen() {
    const router = useRouter();

    const openCheckersLink = async () => {
        const url = 'https://www.checkers.co.za/shop'; 
        try {
            await WebBrowser.openBrowserAsync(url, {
                controlsColor: '#800000',
                toolbarColor: '#FFFFFF',
                showTitle: true,
            });
        } catch (error) {
            console.error('Failed to open link:', error);
            console.warn('Could not open the online shop.');
        }
    };
    
    return (
        <View style={styles.onlineContainer}>
            <View style={styles.onlineHeader}>
                <TouchableOpacity onPress={() => router.back()} style={{padding: 10}}>
                    <Text style={{ fontSize: 24, color: '#FFFFFF' }}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.onlineTitle}>Discover</Text>
            </View>
            
            <View style={styles.onlineContent}>
                <Text style={styles.onlineContentText}>Online Checkers 60x60 is ready!</Text>
                <Text style={styles.onlineContentTextSmall}>The image you see is what the in-app browser will look like.</Text>

                <TouchableOpacity 
                    style={styles.openLinkButton} 
                    onPress={openCheckersLink}
                >
                    <Text style={styles.openLinkButtonText}>Open Checkers 60x60 Now</Text>
                </TouchableOpacity>

                <Image 
                    source={{ uri: 'https://placehold.co/300x400/CCCCCC/333333?text=Online+Store+Mockup' }}
                    style={styles.onlineImageMock}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}