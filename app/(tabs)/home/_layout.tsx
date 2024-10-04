// app/home/_layout.tsx

import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useSystem } from '../../../powersync/PowerSync';

const Layout: React.FC = () => {
  const { supabaseConnector, powersync } = useSystem();

  const onSignOut = async () => {
    try {
      await powersync.disconnectAndClear();
      await supabaseConnector.client.auth.signOut();
      // Redireciona para a tela de login após o logout
      router.replace('/auth/');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          title: 'Neo Care',
          headerStyle: { backgroundColor: '#151515' },
          headerTitleStyle: { color: '#fff' },
          headerRight: () => (
            <TouchableOpacity onPress={onSignOut}>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}>
        <Stack.Screen name="HomeScreen" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
