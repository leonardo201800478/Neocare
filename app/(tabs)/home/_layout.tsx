import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView, DrawerLayout } from 'react-native-gesture-handler';

import { useSystem } from '../../../powersync/PowerSync';

const Layout: React.FC = () => {
  const { supabaseConnector, powersync } = useSystem();
  const drawerRef = useRef<DrawerLayout>(null);

  const onSignOut = async () => {
    try {
      await powersync.disconnect();
      await supabaseConnector.client.auth.signOut();
      router.replace('/auth/');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const renderDrawer = () => (
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={[styles.drawerButton, styles.buttonPrimary]}
        onPress={() => router.push('/(tabs)/patients/')}>
        <Ionicons name="person-add" size={20} color="white" />
        <Text style={styles.drawerButtonText}>Cadastrar Novo Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.drawerButton, styles.buttonSecondary]}
        onPress={() => router.push('/(tabs)/doctors/')}>
        <Ionicons name="person" size={20} color="white" />
        <Text style={styles.drawerButtonText}>Perfil do Médico</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.drawerButton, styles.buttonTertiary]}
        onPress={() => router.push('/about/')}>
        <Ionicons name="information-circle" size={20} color="white" />
        <Text style={styles.drawerButtonText}>Sobre o App</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.drawerButton, styles.buttonQuaternary]}
        onPress={() => router.push('/terms/')}>
        <Ionicons name="document-text" size={20} color="white" />
        <Text style={styles.drawerButtonText}>Termo de Aceite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.drawerButton, styles.buttonDanger]} onPress={onSignOut}>
        <Ionicons name="exit" size={20} color="white" />
        <Text style={styles.drawerButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );

  const openDrawer = () => {
    drawerRef.current?.openDrawer();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={250}
        drawerPosition="left"
        drawerBackgroundColor="#B2DFDB" // Fundo verde claro mais suave
        renderNavigationView={renderDrawer}>
        <Stack
          screenOptions={{
            title: 'Neo Care',
            headerLeft: () => (
              <TouchableOpacity onPress={openDrawer}>
                <Ionicons name="menu" size={30} color="white" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            ),
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: 'center', // Centraliza o título
          }}>
          <Stack.Screen name="HomeScreen" />
        </Stack>
      </DrawerLayout>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: '#B2DFDB', // Cor mais suave no drawer
  },
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  drawerButtonText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
  },
  headerStyle: {
    backgroundColor: '#004D40', // Verde mais escuro para o cabeçalho
  },
  headerTitleStyle: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center', // Assegura centralização em plataformas que não usam headerTitleAlign
  },
  buttonPrimary: {
    backgroundColor: '#A5D6A7', // Verde claro mais suave
  },
  buttonSecondary: {
    backgroundColor: '#FFCC80', // Laranja claro mais suave
  },
  buttonTertiary: {
    backgroundColor: '#90CAF9', // Azul claro mais suave
  },
  buttonQuaternary: {
    backgroundColor: '#CE93D8', // Roxo claro mais suave
  },
  buttonDanger: {
    backgroundColor: '#F48FB1', // Rosa claro mais suave
  },
});

export default Layout;
