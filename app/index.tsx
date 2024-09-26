import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomePage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao Sistema de Gerenciamento</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push(`./doctors`)}>
        <Ionicons name="person-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Gerenciar Médicos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('./patients')}>
        <Ionicons name="people-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Gerenciar Pacientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('./attendences')}>
        <Ionicons name="document-text-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Gerenciar Atendimentos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A700FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 8,
  },
});

export default HomePage;
