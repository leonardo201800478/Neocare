import { useRouter, useSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConsultaDetails = () => {
  const router = useRouter();
  const { paciente } = useSearchParams(); // Pegando o estado do paciente diretamente da navegação

  if (!paciente) {
    return <Text>Erro: Nenhum paciente encontrado!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consulta do Paciente</Text>
      <Text>Nome: {paciente.nome_patients}</Text>
      <Text>CPF: {paciente.cpf_patients}</Text>
      {/* Outros dados da consulta podem ser exibidos aqui */}
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#A700FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConsultaDetails;
