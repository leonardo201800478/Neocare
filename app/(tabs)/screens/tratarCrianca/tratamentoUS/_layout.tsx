// screens/aidpi_neonatal/alimentacao/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function TratamentosUS() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Exibir o cabeçalho para navegação
        headerTitle: 'Tratamentos Unidade Básica de Saúde',
        headerStyle: {
          backgroundColor: '#e9ecef', // Cor do cabeçalho
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
      }}
    />
  );
}
