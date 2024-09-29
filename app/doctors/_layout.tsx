// app/doctors/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const DoctorsLayout = () => {
  return (
    <View style={styles.container}>
      {/* Renderiza as rotas internas (index, update, etc.) */}
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

export default DoctorsLayout;
