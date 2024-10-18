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
    backgroundColor: '#e8f5e9',
  },
  header: {
    padding: 16,
    backgroundColor: '#1b5e20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
});

export default AttendancesLayout;
