import { Slot } from 'expo-router';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const AttendancesLayout = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', // Branco para contraste com o fundo geral
  },
});

export default AttendancesLayout;
