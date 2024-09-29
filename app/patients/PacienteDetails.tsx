// app/patients/PacienteDetails.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const PacienteDetails = () => {
  const { patient } = useLocalSearchParams(); // Recebe o registro do paciente selecionado
  const parsedPatient: Patient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const { db, supabaseConnector } = useSystem();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!parsedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      router.replace('/home/');
    }
  }, [parsedPatient]);

  const handleDeletePaciente = async () => {
    Alert.alert('Confirmar Exclusão', 'Tem certeza de que deseja excluir este paciente?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            // Deletando o paciente do Supabase
            const { error } = await supabaseConnector.client
              .from('patients')
              .delete()
              .eq('cpf', parsedPatient.cpf);

            if (error) {
              console.error('Erro ao excluir paciente do Supabase:', error);
              Alert.alert('Erro', 'Erro ao excluir o paciente do Supabase.');
            } else {
              // Deletando o paciente do banco de dados local
              await db.deleteFrom('patients').where('cpf', '=', parsedPatient.cpf).execute();
              Alert.alert('Sucesso', 'Paciente excluído com sucesso.');
              router.replace('/home/');
            }
          } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o paciente.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleOpenConsulta = () => {
    // Redirecionar para a página de consulta do paciente
    router.push(`/attendances/consulta?cpf=${parsedPatient?.cpf}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Nome: {parsedPatient?.name}</Text>
        <Text style={styles.detailItem}>CPF: {parsedPatient?.cpf}</Text>
        <Text style={styles.detailItem}>
          Data de Nascimento:{' '}
          {parsedPatient?.birth_date
            ? new Date(parsedPatient.birth_date).toLocaleDateString()
            : 'Data não disponível'}
        </Text>
        <Text style={styles.detailItem}>Sexo: {parsedPatient?.gender}</Text>
        <Text style={styles.detailItem}>Telefone: {parsedPatient?.phone_number}</Text>
        <Text style={styles.detailItem}>CEP: {parsedPatient?.zip_code}</Text>
        <Text style={styles.detailItem}>UF: {parsedPatient?.uf}</Text>
        <Text style={styles.detailItem}>Cidade: {parsedPatient?.city}</Text>
        <Text style={styles.detailItem}>Endereço: {parsedPatient?.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePaciente}>
          <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonConsulta} onPress={handleOpenConsulta}>
          <Text style={styles.buttonText}>ABRIR CONSULTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e8f5e9', // Verde claro
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2e7d32', // Verde escuro
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
    color: '#2e7d32', // Verde escuro
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  buttonDelete: {
    backgroundColor: '#ff5252', // Vermelho
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonConsulta: {
    backgroundColor: '#4CAF50', // Verde mais escuro para contraste
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PacienteDetails;
