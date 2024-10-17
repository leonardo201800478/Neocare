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
        style={styles.drawerButton}
        onPress={() => router.push('/(tabs)/patients/')}>
        <Text style={styles.drawerButtonText}>Cadastrar Novo Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => router.push('/(tabs)/doctors/')}>
        <Text style={styles.drawerButtonText}>Perfil do Médico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => router.push('/about/')}>
        <Text style={styles.drawerButtonText}>Sobre o App</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={() => router.push('/terms/')}>
        <Text style={styles.drawerButtonText}>Termo de Aceite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerButton} onPress={onSignOut}>
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
        drawerBackgroundColor="#8FBC8F" // Fundo verde claro
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
    backgroundColor: '#8FBC8F',
  },
  drawerButton: {
    marginBottom: 10,
  },
  drawerButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  headerStyle: {
    backgroundColor: '#151515',
  },
  headerTitleStyle: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center', // Assegura centralização em plataformas que não usam headerTitleAlign
  },
});

export default Layout;
