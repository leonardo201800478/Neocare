// app/auth/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      {/* O Slot permite que cada rota de autenticação seja exibida */}
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7', // Fundo claro para um design moderno e limpo
  },
});

export default AuthLayout;
