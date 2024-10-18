import { Stack } from 'expo-router';
import React from 'react';

export default function VaccineLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#f0f0f0' },
      }}>
      <Stack.Screen name="index" options={{ title: 'Cadastrar Vacinas' }} />
      <Stack.Screen name="CardVaccination" options={{ title: 'Cartão de Vacinação' }} />
    </Stack>
  );
}
