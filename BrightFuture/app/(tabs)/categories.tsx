import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, type Href  } from 'expo-router';

// Import the Card component and the consolidated styles
import Card, { styles, width } from '../../components/card';

export default function DonationScreen() {
    const router = useRouter();

    // Define the type for the route property more strictly as an Href
    const CategoryCard = ({ 
        title, 
        icon, 
        color, 
        buttonText, 
        route 
    }: { 
        title: string, 
        icon: any, 
        color: string, 
        buttonText: string, 
        route: Href // Use Href here to satisfy TypeScript
    }) => (
        <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: color }]}
            // Use 'as Href' to tell TypeScript the string is a valid route
            onPress={() => router.push(route as Href)} 
            activeOpacity={0.7}
        >
            <View style={styles.categoryContent}>
                <Image
                    source={icon} 
                    style={styles.categoryIcon} 
                    resizeMode="contain"
                />
                <Text style={styles.categoryTitle}>{title}</Text>
                {/* Apply the Href type assertion here as well */}
                <TouchableOpacity style={styles.optionsButton} onPress={() => router.push(route as Href)}>
                    <Text style={styles.optionsButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryScreenTitle}>Categories</Text>
            </View>

            <CategoryCard 
                title="Food" 
                icon={require('../../assets/images/donations/food.png')} 
                color="#D2754F" 
                buttonText="Options" 
                route="/food" 
            />
            <CategoryCard 
                title="Clothing" 
                icon={require('../../assets/images/donations/Clothes.png')}  
                color="#E0AC62" 
                buttonText="Options" 
                route="/clothing" 
            />
            <CategoryCard 
                title="Stationary" 
                icon={require('../../assets/images/donations/Stationary.png')} 
                color="#A0AA61" 
                buttonText="Options" 
                route="/stationary" 
            />
            <CategoryCard 
                title="Electricity" 
                icon={require('../../assets/images/donations/Electricity.png')}  
                color="#4682B4" 
                buttonText="Donate ZAR" 
                route="/PaymentScreen" 
            />
        </ScrollView>
    );
}