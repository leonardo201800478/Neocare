import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';

const AttendancesLayout = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Barra de Navegação Superior */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestão de Prontuários</Text>
      </View>

      <View style={styles.container}>
        {/* O componente <Slot> renderiza o conteúdo da página específica de acordo com a rota */}
        <Slot />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#e8f5e9', // Verde claro para a área de segurança
  },
  header: {
    padding: 16,
    backgroundColor: '#1b5e20', // Verde escuro para destacar a barra de navegação
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Branco para contraste com o fundo verde escuro
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // Branco para contraste com o fundo geral
  },
});

export default AttendancesLayout;
