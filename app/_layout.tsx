import { Slot } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useSystem } from '~/powersync/PowerSync';
import { PowerSyncProvider } from '~/powersync/PowerSyncProvider';

const RootLayout = () => {
  const { init } = useSystem();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializa o sistema PowerSync assim que o layout é carregado
    const initializeSystem = async () => {
      try {
        await init(); // Inicializa o PowerSync
      } catch (error) {
        console.error('Erro ao inicializar o sistema:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeSystem();
  }, []);

  // Exibe um indicador de carregamento enquanto o sistema PowerSync está inicializando
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A700FF" />
      </View>
    );
  }

  return <Slot />;
};

const AppLayout = () => {
  return (
    <PowerSyncProvider>
      <RootLayout />
    </PowerSyncProvider>
  );
};

export default AppLayout;
