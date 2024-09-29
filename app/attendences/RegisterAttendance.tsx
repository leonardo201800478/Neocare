import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const RegisterAttendance = () => {
  const { patientId } = useLocalSearchParams(); // Recebe o ID do paciente como parâmetro da URL
  const { db, supabaseConnector } = useSystem();
  const [paciente, setPaciente] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({ weight: '', height: '' });
  const router = useRouter();

  useEffect(() => {
    if (patientId && typeof patientId === 'string') {
      loadPaciente(patientId);
    } else {
      Alert.alert('Erro', 'ID do paciente inválido ou não fornecido.');
      router.replace('/home/');
    }
  }, [patientId]);

  const loadPaciente = async (id: string) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabaseConnector.client
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao carregar paciente:', error);
        Alert.alert('Erro', 'Erro ao carregar os dados do paciente.');
        router.replace('/home/');
      } else {
        setPaciente(result);
      }
    } catch (error) {
      console.error('Erro ao carregar paciente:', error);
      Alert.alert('Erro', 'Erro ao carregar os dados do paciente.');
      router.replace('/home/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
        <Text>Carregando detalhes da consulta...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Erro: Nenhum paciente encontrado!</Text>
      </View>
    );
  }
  const handleRegisterAttendance = async () => {
    if (!patientId) {
      Alert.alert('Erro', 'Dados do paciente ou médico não disponíveis.');
      return;
    }

    setLoading(true);

    try {
      // Dados a serem inseridos no registro de prontuário
      const attendanceData = {
        patient_id: patientId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('Dados do prontuário sendo enviados:', attendanceData);

      const { error } = await supabaseConnector.client.from('attendances').insert([attendanceData]);

      if (error) {
        console.error('Erro ao cadastrar prontuário:', error);
        Alert.alert('Erro', 'Erro ao cadastrar o prontuário.');
      } else {
        Alert.alert('Sucesso', 'Prontuário cadastrado com sucesso.');
        router.replace('/home/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar prontuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o prontuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consulta do Paciente</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Nome: {paciente.name}</Text>
        <Text style={styles.detailItem}>CPF: {paciente.cpf}</Text>
        {/* Outros dados da consulta podem ser exibidos aqui */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/home/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Campos para registro do prontuário */}
      <TextInput
        placeholder="Peso"
        style={styles.input}
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
      />
      <TextInput
        placeholder="Altura"
        style={styles.input}
        onChangeText={(text) => setFormData({ ...formData, height: text })}
      />
      {/* Adicione outros campos necessários aqui */}

      <TouchableOpacity style={styles.button} onPress={handleRegisterAttendance}>
        <Text style={styles.buttonText}>Registrar Prontuário</Text>
      </TouchableOpacity>
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
  patientDetails: {
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
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
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

export default RegisterAttendance;
