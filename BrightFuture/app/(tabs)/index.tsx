import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image, StyleSheet, Platform } from 'react-native';
import { Text, View } from 'react-native-reanimated/lib/typescript/Animated';


export default function JourneyScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Donar Dashboard</ThemedText>
        <View style={styles.textcontainer}>
          <Text style={styles.text}>
            <Text style={styles.hi}>Hi, I’m{'\n'}</Text>
            <Text style={styles.name}>Lila Botha</Text>
          </Text>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
   textcontainer: {
    width: 340,
    height: 160
  },
  text: {
    textAlign: 'left',
    marginTop: -135,
    marginLeft: 180,
    color: '#1E1924'
  },
  hi: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});