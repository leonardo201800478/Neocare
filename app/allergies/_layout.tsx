// app/allergies/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function Allergies() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Exibir o cabeçalho para navegação
        headerTitle: 'Alergias',
        headerStyle: {
          backgroundColor: '#e9ecef', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
