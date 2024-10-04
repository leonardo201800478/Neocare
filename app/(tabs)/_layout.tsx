// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export default function AppTabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      {/* Aba Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
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
      {/* Aba Graficos */}
      <Tabs.Screen
        name="graficos"
        options={{
          title: 'Graficos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-md" color={color} />,
        }}
      />
      <Tabs.Screen
        name="screens"
        options={{
          title: 'Tratamentos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-md" color={color} />,
        }}
      />
    </Tabs>
  );
}
