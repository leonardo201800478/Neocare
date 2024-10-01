// app/SplashScreen.tsx
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={styles.loadingText}>Carregando NeoCare...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7e1',
  },
  loadingText: {
    fontSize: 100,
    marginTop: 20,
    color: '#2e7d32',
  },
});

export default SplashScreen;
