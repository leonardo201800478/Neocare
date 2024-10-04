// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function AppTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#A020F0',
        tabBarInactiveTintColor: '#000000', // Cor da aba não selecionada
        headerShown: false,
        tabBarStyle: {
          position: 'absolute', // Posiciona a tab bar de forma absoluta
          backgroundColor: 'transparent', // Torna o fundo transparente
          borderTopWidth: 0, // Remove a borda superior
          elevation: 0, // Remove a sombra no Android
          shadowOpacity: 0, // Remove a sombra no iOS
          height: 55, // Ajusta a altura para maior personalização (opcional)
        },
      }}>
      {/* Aba Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Pesquisa',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      {/* Aba Doctors */}
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Médicos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-md" color={color} />,
        }}
      />
      {/* Aba Gráficos */}
      <Tabs.Screen
        name="graficos"
        options={{
          title: 'Gráficos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="info-circle" color={color} />,
        }}
      />
      {/* Aba Screens */}
      <Tabs.Screen
        name="screens"
        options={{
          title: 'Tratamentos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="stethoscope" color={color} />,
        }}
      />
    </Tabs>
  );
}
