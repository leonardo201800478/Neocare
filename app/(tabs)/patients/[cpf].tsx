//APP/PATIENTS/[CPF].TSX

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';

import { Patient } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';

const PacienteDetails: React.FC = () => {
  const { cpf } = useLocalSearchParams<{ cpf: string }>(); // Pegando o parâmetro dinâmico da URL de forma tipada
  const { db } = useSystem();
  const [paciente, setPaciente] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (cpf) {
      loadPaciente(cpf);
    } else {
      Alert.alert('Erro', 'CPF inválido ou não fornecido.');
      router.replace('/home/');
    }
  }, [cpf]);

  const loadPaciente = async (cpf: string) => {
    setLoading(true);
    try {
      const result = await db.selectFrom('patients').selectAll().where('cpf', '=', cpf).execute();
      if (result.length > 0) {
        setPaciente(result[0]);
      } else {
        setPaciente(null);
      }
    } catch (error) {
      console.error('Erro ao carregar paciente:', error);
      console.log('Detalhes do erro ao buscar paciente:', error); // Adicionando log para depurar erros do Supabase
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do paciente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePaciente = async () => {
    Alert.alert('Confirmar Exclusão', 'Tem certeza de que deseja excluir este paciente?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await db.deleteFrom('patients').where('cpf', '=', cpf).execute();
            Alert.alert('Sucesso', 'Paciente excluído com sucesso.');
            router.replace('/home/');
          } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            console.log('Detalhes do erro ao excluir paciente:', error); // Adicionando log para depurar erros ao excluir
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o paciente.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do paciente...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Paciente não encontrado.</Text>
        <TouchableOpacity style={styles.buttonHome} onPress={() => router.replace('/home/')}>
          <Text style={styles.buttonText}>VOLTAR PARA HOME</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Nome: {paciente.name}</Text>
        <Text style={styles.detailItem}>CPF: {paciente.cpf}</Text>
        <Text style={styles.detailItem}>
          Data de Nascimento:{' '}
          {paciente.birth_date
            ? new Date(paciente.birth_date).toLocaleDateString()
            : 'Data não disponível'}
        </Text>
        <Text style={styles.detailItem}>Sexo: {paciente.gender}</Text>
        <Text style={styles.detailItem}>Telefone: {paciente.phone_number}</Text>
        <Text style={styles.detailItem}>CEP: {paciente.zip_code}</Text>
        <Text style={styles.detailItem}>UF: {paciente.uf}</Text>
        <Text style={styles.detailItem}>Cidade: {paciente.city}</Text>
        <Text style={styles.detailItem}>Endereço: {paciente.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePaciente}>
          <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailItem: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#FF5C5C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonHome: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PacienteDetails;
