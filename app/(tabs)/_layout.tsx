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
        tabBarInactiveTintColor: '#000000', // Cor da aba não selecionada
        headerShown: false,
        tabBarStyle: {
          position: 'absolute', // Posiciona a tab bar de forma absoluta
          backgroundColor: 'white', // Torna o fundo transparente
          borderTopWidth: 1, // Remove a borda superior
          elevation: 1, // Remove a sombra no Android
          shadowOpacity: 1, // Remove a sombra no iOS
          height: 55, // Ajusta a altura para maior personalização (opcional)
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
              <FontAwesome size={28} name="info-circle" color={color} />
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
              style={{ height: 80 }}>
              <FontAwesome size={60} name="search" color={color} />
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
    </Tabs>
  );
}
