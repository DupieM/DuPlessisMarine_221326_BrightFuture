import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Platform } from 'react-native';

// Get window width for styles consistency
const { width } = Dimensions.get('window');

// --- Types for Card Props ---
interface CardProps {
    children: React.ReactNode;
    style?: object;
    onPress?: () => void;
}

// --- Card Component ---
const Card: React.FC<CardProps> = ({ children, style, onPress }) => (
    <TouchableOpacity 
        style={[styles.card, style]} 
        onPress={onPress} 
        disabled={!onPress}
        activeOpacity={0.8}
    >
        {children}
    </TouchableOpacity>
);

// --- All Styles Consolidated Here ---
const styles = StyleSheet.create({
    // --- Global Styles ---
    container: { 
        flex: 1, 
        backgroundColor: '#f5f5f5' 
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15, // Slightly stronger shadow
        shadowRadius: 6,
        elevation: 5,
    },

    // --- 1. Home Screen Styles (Donor Dashboard) ---
    headerContainer: {
        width: width + 40, 
        height: 200, 
        marginLeft: -20,
        marginTop: -65, 
        alignItems: 'center',
        overflow: 'hidden',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#87CEEB', // Sky Blue background (Placeholder for sky.png)
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 40,
        paddingTop: 85, 
    },
    title: {

        fontSize: 45,

        fontWeight: 'bold',

        color: '#000000',

        marginTop: -120,

        marginLeft: -10

    },
    balanceCard: {
        paddingVertical: 20,
        marginTop: -50, // Pull it up over the header background
        backgroundColor: 'white',
        borderColor: '#EFEFEF',
        borderWidth: 1,
    },
    balanceText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
        color: '#1E1924',
    },
    progressBarBackground: {
        height: 12, // Slightly thicker bar
        backgroundColor: '#E0E0E0',
        borderRadius: 6,
    },
    progressBarFill: {
        width: '20%', 
        height: '100%',
        backgroundColor: '#6B8E23', // Olive green for progress
        borderRadius: 6,
    },
    badgeCard: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    badgeText: {
        fontSize: 14,
        marginBottom: 15,
        color: '#666',
        fontWeight: '500',
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Use full width for badge row
    },
    badgeIcon: {
        fontSize: 24, // Increased size for better visibility
        marginHorizontal: 2,
    },
    navButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        height: 75, // Taller button
        marginBottom: 10,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E1924',
    },
    buttonEmoji: {
        fontSize: 26, // Larger emoji
    },
    
    // --- 2. Donation Screen (Categories) Styles ---
    categoryHeader: {
        paddingVertical: 20,
        alignItems: 'flex-start',
    },
    categoryScreenTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E1924',
    },
    categoryCard: {
        height: 160,
        borderRadius: 15,
        marginBottom: 20,
        padding: 20,
        justifyContent: 'center',
    },
    categoryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryIcon: {
        fontSize: 60,
        opacity: 0.6,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        position: 'absolute',
        top: 20,
        left: 20,
    },
    optionsButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        position: 'absolute',
        right: 15,
        top: 20,
    },
    optionsButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },

    // --- 3. Food Screen Styles ---
    foodHeader: {
        backgroundColor: '#C49E67', // Earthy brown/orange tone from mockup
        paddingVertical: 40,
        paddingHorizontal: 20,
        width: width + 40,
        marginLeft: -20,
        alignItems: 'flex-start',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    foodTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    contentSection: {
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    bulletPoint: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 4,
        color: '#555',
    },
    logoImage: {
        width: 150,
        height: 50,
        alignSelf: 'center',
        marginVertical: 15,
    },
    noteText: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 15,
        color: '#800000', // Deep red for emphasis
        textAlign: 'center',
    },
    addressBox: {
        backgroundColor: '#EFEFEF',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        borderLeftWidth: 4,
        borderColor: '#C49E67',
    },
    addressText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    donateButton: {
        backgroundColor: '#4682B4', // Blue tone for primary action
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 30,
    },
    donateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // --- 4. Food Online Link Screen Styles ---
    onlineContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    onlineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#800000', // Mock header color (Checkers style)
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    onlineTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 10,
    },
    onlineContent: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    onlineContentText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    onlineContentTextSmall: {
        fontSize: 14,
        marginBottom: 30,
        color: '#666',
        textAlign: 'center',
    },
    onlineImageMock: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginTop: 20,
    },
    openLinkButton: {
        backgroundColor: '#800000',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 20,
    },
    openLinkButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Card;

export { styles, CardProps, width };