// app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigationState } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function AppTabsLayout() {
  // Hook para pegar o estado da navegação
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const backAction = () => {
      // Obtém o índice e as rotas do estado atual
      const currentIndex = navigationState.index;
      const routes = navigationState.routes;

      // Verifica se a rota anterior faz parte das guias (tabs)
      if (currentIndex > 0) {
        const previousRoute = routes[currentIndex - 1];
        const isPreviousRouteInTabs =
          previousRoute?.name && routes.some((route) => route.name === '(tabs)');

        if (isPreviousRouteInTabs) {
          // Se a rota anterior for das guias, não permitir voltar
          return true; // Impede o comportamento padrão do botão voltar
        }
      }

      // Para outros casos, permite o comportamento padrão
      return false; // Permite o botão voltar funcionar normalmente
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigationState]);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#008000',
        tabBarInactiveTintColor: '#000000',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#00FA9A',
          borderTopWidth: 1,
          elevation: 1,
          shadowOpacity: 1,
          height: 45,
          paddingBottom: 10, // Adiciona espaçamento inferior na barra de abas
        },
      }}>
      {/* Aba Paciente */}
      <Tabs.Screen
        name="patients"
        options={{
          title: 'Paciente',
          tabBarIcon: ({ color, focused }) => (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={1000}>
              <FontAwesome size={28} name="user-plus" color={color} />
            </Animatable.View>
          ),
        }}
      />
      {/* Aba Gráficos */}
      <Tabs.Screen
        name="graficos"
        options={{
          title: 'Gráficos',
          tabBarIcon: ({ color, focused }) => (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={1000}>
              <FontAwesome size={28} name="bar-chart" color={color} />
            </Animatable.View>
          ),
        }}
      />
      {/* Aba Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Pesquisa',
          tabBarIcon: ({ color, focused }) => (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={1000}
              style={{ height: 30 }}>
              <FontAwesome size={30} name="search" color={color} />
            </Animatable.View>
          ),
        }}
      />
      {/* Aba Screens */}
      <Tabs.Screen
        name="screens"
        options={{
          title: 'Tratamentos',
          tabBarIcon: ({ color, focused }) => (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={1000}>
              <FontAwesome size={28} name="stethoscope" color={color} />
            </Animatable.View>
          ),
        }}
      />
      {/* Aba Doctors */}
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={1000}>
              <FontAwesome size={28} name="user-md" color={color} />
            </Animatable.View>
          ),
        }}
      />
      {/* Aba About */}
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, focused }) => (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              iterationCount="infinite"
              duration={1000}>
              <FontAwesome size={28} name="info-circle" color={color} />
            </Animatable.View>
          ),
        }}
      />
    </Tabs>
  );
}
