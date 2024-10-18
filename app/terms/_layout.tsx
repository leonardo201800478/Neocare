import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: 'Termos Legais',
        headerStyle: {
          backgroundColor: '#e9ecef',
        },
        headerTintColor: '#333',
      }}
    />
  );
}

