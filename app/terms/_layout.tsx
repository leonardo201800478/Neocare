// app/terms/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Exibir o cabeçalho para navegação
        headerTitle: 'Termos Legais',
        headerStyle: {
          backgroundColor: '#e9ecef', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
