// app/(tabs)/about/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Exibir o cabeçalho para navegação
        title: 'Sobre o Neocare',
        headerStyle: {
          backgroundColor: '#4CAF50', // Cor do cabeçalho
        },
        headerTintColor: '#fff', // Cor do texto no cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
