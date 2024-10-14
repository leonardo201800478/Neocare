// app/(tabs)/graficos/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: 'Tratar Criança',
        headerStyle: {
          backgroundColor: '#e9ecef', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
