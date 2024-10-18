// app/allergies/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function Medicacoes() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
        headerTitle: 'Medicações',
        headerStyle: {
          backgroundColor: '#e9ecef', 
        },
        headerTintColor: '#333', 
      }}
    />
  );
}
