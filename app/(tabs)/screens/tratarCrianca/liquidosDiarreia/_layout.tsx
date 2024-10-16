// screens/aidpi_neonatal/alimentacao/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Diarreia() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Exibir o cabeçalho para navegação
        headerTitle: 'Dar Líquidos Adicionais para combater a Diarreia',
        headerStyle: {
          backgroundColor: '#e9ecef', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
