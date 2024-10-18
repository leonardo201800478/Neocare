import { Stack } from 'expo-router';
import React from 'react';

export default function Allergies() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
        headerTitle: 'Alergias',
        headerStyle: {
          backgroundColor: '#e9ecef',
        },
        headerTintColor: '#333', 
      }}
    />
  );
}
