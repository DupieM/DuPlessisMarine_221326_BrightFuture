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
        paddingBottom: 0,
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
    image: {
        width: 40,
        height: 50,
        marginRight: 20
    },
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
        backgroundColor: '#E49086', // Sky Blue background (Placeholder for sky.png)
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 70,
        paddingTop: 90, 
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#000000',

    },
    balanceCard: {
        paddingVertical: 20,
        marginTop: -40, // Pull it up over the header background
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
    progressBarText: {
      fontStyle: 'italic',
      marginTop: 20,
      fontSize: 20,
      color: "#4682B4",
    },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    badgeContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextBadge: {
    fontSize: 16,
    color: "#800000",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badgeItem: {
    width: "30%",       
    margin: "1.5%",     
    alignItems: "center",
    marginBottom: 15,
  },
  badgeImage: {
    width: 53,
    height: 90,
    marginBottom: 6,
  },
  badgeLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
    navButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        height: 75, // Taller button
        marginBottom: 10,
        marginTop: 10
    },
    navButtonText: {
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffffff',
    },
    buttonEmoji: {
        fontSize: 26, // Larger emoji
    },
    
    // --- 2. Donation Screen (Categories) Styles ---
    categoryHeader: {
        paddingVertical: 20,
        alignItems: 'flex-start',
        marginLeft: 50
    },
    categoryScreenTitle: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#1E1924',
    },
    categoryCard: {
        height: 160,
        width: 360,
        borderRadius: 0,
        marginBottom: 0,
        padding: 20,
        justifyContent: 'center',
        marginLeft: -20
    },
    categoryContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryIcon: {
        width: 70,
        height: 70,
        marginTop: -50,
        left: 20
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
        backgroundColor: '#006A80',
        paddingHorizontal: 27,
        paddingVertical: 8,
        borderRadius: 70,
        position: 'absolute',
        right: 15,
        top: -10,
        width: 140,
        height: 50
    },
    optionsButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 24,
    },

    // --- 3. Food Screen Styles ---
    foodHeader: {
        backgroundColor: '#D2754F', // Earthy brown/orange tone from mockup
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: width + 20,
        marginLeft: -20,
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    foodTitle: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#ffffffff',
        marginTop: 20,
        marginLeft: 100
    },
    contentSection: {
        marginBottom: -65,
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
        marginBottom: 90
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
        marginTop: 20
    },
    donateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginTop: 30
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D9A19A',
        marginHorizontal: 10,
    },
    orText: {
        fontSize: 18,
        color: '#D9A19A',
        fontStyle: 'italic',
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
    },

    // --- 4. Clothes Screen Styles ---
    foodHeadertwo: {
        backgroundColor: '#E0AC62', // Earthy brown/orange tone from mockup
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: width + 20,
        marginLeft: -20,
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    foodTitletwo: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#ffffffff',
        marginTop: 20,
        marginLeft: 60
    },

    // --- 5. Stationary Screen Styles ---
    foodHeaderthree: {
        backgroundColor: '#A0AA61', // Earthy brown/orange tone from mockup
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: width + 20,
        marginLeft: -20,
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    foodTitlethree: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#ffffffff',
        marginTop: 20,
        marginLeft: 40
    },
    noteTexttwo: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 80,
        color: '#800000', // Deep red for emphasis
        textAlign: 'center',
    },


    //
    storeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  storeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Card;

export { styles, CardProps, width };