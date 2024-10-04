// app/(tabs)/doctors/_layout.tsx

import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DoctorsLayout() {
  return (
    <>
      {/* Tabs Navigation */}


      {/* Renderiza as rotas internas (index, update, etc.) */}
      <View style={styles.container}>
        <Slot />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
});
