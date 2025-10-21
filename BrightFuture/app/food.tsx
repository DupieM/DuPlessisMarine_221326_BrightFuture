import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

// Import the Card component and the consolidated styles
import Card, { styles, width } from '../components/card';

export default function FoodScreen() {
    const router = useRouter();

    const openCheckersLink = async () => {
        // The URL for the checkers 60 60 online shop
        const url = 'https://www.checkers.co.za/shop'; // Placeholder, use the actual 60x60 URL if known
        try {
            // Opens the link in an in-app browser tab
            await WebBrowser.openBrowserAsync(url, {
                // Customizing the appearance of the in-app browser
                controlsColor: '#800000',
                toolbarColor: '#FFFFFF',
                showTitle: true,
            });
        } catch (error) {
            console.error('Failed to open link:', error);
            // Fallback message for the user
            console.warn('Could not open the online shop. Please check your connection.');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            
            {/* Header */}
            <View style={styles.foodHeader}>
                <Text style={styles.foodTitle}>Food</Text>
            </View>
            
            <View style={styles.contentSection}>
                <Text style={styles.sectionHeading}>Non Perishable Products that you can donate</Text>
                <Text style={styles.bulletPoint}>• Canned fruits</Text>
                <Text style={styles.bulletPoint}>• Canned vegetables</Text>
                <Text style={styles.bulletPoint}>• Cereal</Text>
                <Text style={styles.bulletPoint}>• Dried Fruit</Text>
                <Text style={styles.bulletPoint}>• Canned Food</Text>
                <Text style={styles.bulletPoint}>• Rice</Text>
                <Text style={styles.bulletPoint}>• Powdered Milk</Text>
            </View>

            <View style={styles.contentSection}>
                <Text style={styles.sectionHeading}>Buy from grocery stores and deliver to us</Text>
                <Image
                    source={{ uri: 'https://placehold.co/150x50/800000/ffffff?text=SIXTY+X+SIXTY' }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
                
                <Text style={styles.noteText}>*Note use the address below as the delivery address</Text>
                <View style={styles.addressBox}>
                    <Text style={styles.addressText}>Ivanhoe Street 3, Gardens,{"\n"}Cape Town, 8001, South Africa</Text>
                </View>
            </View>

            <View style={{ height: 40 }} />
            
            {/* The button that opens the in-app link */}
            <Card 
                style={styles.donateButton} 
                onPress={openCheckersLink}
            >
                <Text style={styles.donateButtonText}>Donate ZAR</Text>
            </Card>

            <View style={{ height: 80 }} />

        </ScrollView>
    );
}
