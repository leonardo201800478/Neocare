import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = ({ message }: { message: string }) => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color="#fff" />
    <Text style={styles.loadingText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default LoadingOverlay;
