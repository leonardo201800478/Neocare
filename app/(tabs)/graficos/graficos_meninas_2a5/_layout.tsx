// screens/aidpi_neonatal/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ocultar o cabeçalho para evitar a duplicação do botão de voltar
      }}
    />
  );
}
