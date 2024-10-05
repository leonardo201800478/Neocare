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
      <Stack.Screen name="index" options={{ title: 'Lista de Vacinações' }} />
      <Stack.Screen name="RegisterVaccination" options={{ title: 'Registrar Vacinação' }} />
    </Stack>
  );
}
