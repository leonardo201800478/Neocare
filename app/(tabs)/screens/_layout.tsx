// screens/aidpi_neonatal/alimentacao/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function HomeAIDPI() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Exibir o cabeçalho para navegação
        headerTitle: 'Home AIDPI Neonatal',
        headerStyle: {
          backgroundColor: '#e9ecef', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
