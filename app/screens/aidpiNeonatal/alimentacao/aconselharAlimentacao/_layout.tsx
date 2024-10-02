// screens/aidpi_neonatal/alimentacao/aconselhar_alimentacao/_layout.tsx
import { Stack } from "expo-router";
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Exibir o cabeçalho para as telas filhas
        headerTitle: "Aconselhamento Alimentar",
        headerStyle: {
          backgroundColor: '#f7f7f7', // Cor do cabeçalho para dar uma aparência suave
        },
        headerTintColor: '#333', // Cor do texto no cabeçalho
        headerTitleAlign: 'center', // Centralizar o título
      }}
    />
  );
}
