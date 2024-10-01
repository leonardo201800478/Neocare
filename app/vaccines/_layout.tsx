// app/vaccines/_layout.tsx

import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const VaccinesLayout = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
});

export default VaccinesLayout;
