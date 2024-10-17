// app/(tabs)/_layout.tsx
import { useNavigationState } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';

import CustomTabBar from '../../components/CustomTabBar';

export default function AppTabsLayout() {
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    const backAction = () => {
      const currentIndex = navigationState.index;
      const routes = navigationState.routes;
      if (currentIndex > 0) {
        const previousRoute = routes[currentIndex - 1];
        const isPreviousRouteInTabs =
          previousRoute?.name && routes.some((route) => route.name === '(tabs)');
        if (isPreviousRouteInTabs) {
          return true;
        }
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigationState]);

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="patients" />
      <Tabs.Screen name="graficos" />
      <Tabs.Screen name="home" />
      <Tabs.Screen name="screens" />
      <Tabs.Screen name="doctors" />
    </Tabs>
  );
}
