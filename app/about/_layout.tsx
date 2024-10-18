import { Stack } from 'expo-router';
import React from 'react';

export default function About() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: 'Sobre o Neocare',
        headerStyle: {
          backgroundColor: '#4CAF50', 
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
