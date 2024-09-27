import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const AttendancesLayout = () => {
  return (
    <View style={styles.container}>
      {/* O componente <Slot> renderiza o conteúdo da página específica de acordo com a rota */}
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e8f5e9', // Cor de fundo verde clara
  },
});

export default AttendancesLayout;
