import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const steps = [
  '/onboarding',
  '/onboarding/step3',
  '/onboarding/step4',
] as const;

export default function OnboardingLayout() {
  const router = useRouter();
  const segments = useSegments();
  const currentPath = `/${segments.join('/')}`;
  const currentIndex = steps.indexOf(currentPath as any);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      router.push(steps[currentIndex + 1] as any);
    } else {
      router.replace('/auth/login');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) router.back();
  };

  const skip = () => router.replace('/auth/login');

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />

      {/* Navigation Arrows + Dots */}
      <View style={styles.footer}>
        <View style={styles.arrowsContainer}>
          {/* Back arrow (show on all except first) */}
          {currentIndex > 0 ? (
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back" size={28} color="#3C667B" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 28 }} /> // spacer
          )}

          {/* Dots */}
          <View style={styles.dotsContainer}>
            {steps.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === currentIndex ? styles.activeDot : null]}
              />
            ))}
          </View>

          {/* Forward arrow (hide on last screen) */}
          {currentIndex < steps.length - 1 ? (
            <TouchableOpacity onPress={goNext}>
              <Ionicons name="chevron-forward" size={28} color="#3C667B" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 28 }} /> // spacer when last screen
          )}
        </View>

        {/* Skip or Get Started */}
        {currentIndex < steps.length - 1 ? (
          <TouchableOpacity onPress={skip} style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={skip} style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    top: 260,
    bottom: -55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 180,
    marginBottom: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D9A19A', // soft red tone
  },
  activeDot: {
    backgroundColor: '#9CA973', // muted green tone
  },
  skipContainer: {
    alignItems: 'center',
  },
  skipText: {
    color: '#3C667B',
    fontSize: 16,
    fontStyle: 'italic',
  },
  getStartedButton: {
    backgroundColor: '#3C667B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 360,
    height: 225,
    marginTop: 40
  },
});
