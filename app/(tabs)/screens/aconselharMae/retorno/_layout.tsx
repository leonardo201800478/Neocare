// screens/aidpi_neonatal/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Exibir o cabeçalho para navegação
        headerTitle: 'Quando Retornar', // Título do cabeçalho
        headerStyle: {
          backgroundColor: '#f8f9fa', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
