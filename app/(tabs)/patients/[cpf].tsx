import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';

import { Attendance, Vaccination } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';

const PacienteDetails: React.FC = () => {
  const { cpf } = useLocalSearchParams<{ cpf: string }>(); // Pegando o parâmetro dinâmico da URL de forma tipada
  const { supabaseConnector } = useSystem();
  const [loading, setLoading] = useState<boolean>(true);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [hasVaccinations] = useState<boolean>(false);

  const { selectedPatient, setSelectedPatient } = usePatient();
  const { selectedDoctor } = useDoctor(); // Obtendo o médico selecionado
  const router = useRouter();

  useEffect(() => {
    if (cpf) {
      loadPaciente(cpf);
    } else {
      Alert.alert('Erro', 'CPF inválido ou não fornecido.');
      router.replace('/(tabs)/home/');
    }
  }, [cpf]);

  const loadPaciente = async (cpf: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabaseConnector.client
        .from('patients')
        .select('*')
        .eq('cpf', cpf)
        .single();

      if (error) {
        console.error('Erro ao carregar paciente:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do paciente.');
      } else if (data) {
        setSelectedPatient(data);
      } else {
        setSelectedPatient(null);
      }
    } catch (error) {
      console.error('Erro ao carregar paciente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os detalhes do paciente.');
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
            setLoading(true);
            if (selectedPatient) {
              await supabaseConnector.client
                .from('attendances')
                .delete()
                .eq('patient_id', selectedPatient.id);
              await supabaseConnector.client
                .from('vaccinations')
                .delete()
                .eq('patient_id', selectedPatient.id);
              const { error } = await supabaseConnector.client
                .from('patients')
                .delete()
                .eq('cpf', selectedPatient.cpf);

              if (error) {
                console.error('Erro ao excluir paciente do Supabase:', error);
                Alert.alert('Erro', 'Erro ao excluir o paciente do Supabase.');
              } else {
                setSelectedPatient(null);
                Alert.alert('Sucesso', 'Paciente excluído com sucesso.');
                router.replace('/(tabs)/home/');
              }
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
    if (selectedPatient?.id) {
      router.push(
        `/attendances/RegisterAttendance?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
  };

  const handleRegisterVaccination = () => {
    if (selectedPatient?.id) {
      router.push(
        `/vaccines/RegisterVaccination?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do paciente...</Text>
      </View>
    );
  }

  if (!selectedPatient) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Paciente não encontrado.</Text>
        <TouchableOpacity style={styles.buttonHome} onPress={() => router.replace('/(tabs)/home/')}>
          <Text style={styles.buttonText}>VOLTAR PARA HOME</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Nome: {selectedPatient.name}</Text>
        <Text style={styles.detailItem}>CPF: {selectedPatient.cpf}</Text>
        <Text style={styles.detailItem}>
          Data de Nascimento:{' '}
          {selectedPatient.birth_date
            ? new Date(selectedPatient.birth_date).toLocaleDateString()
            : 'Data não disponível'}
        </Text>
        <Text style={styles.detailItem}>Sexo: {selectedPatient.gender}</Text>
        <Text style={styles.detailItem}>Telefone: {selectedPatient.phone_number}</Text>
        <Text style={styles.detailItem}>CEP: {selectedPatient.zip_code}</Text>
        <Text style={styles.detailItem}>UF: {selectedPatient.uf}</Text>
        <Text style={styles.detailItem}>Cidade: {selectedPatient.city}</Text>
        <Text style={styles.detailItem}>Endereço: {selectedPatient.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePaciente}>
          <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonConsulta} onPress={handleOpenConsulta}>
          <Text style={styles.buttonText}>ABRIR CONSULTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonVaccine} onPress={handleRegisterVaccination}>
          <Text style={styles.buttonText}>REGISTRAR VACINA</Text>
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
    marginBottom: 10,
  },
  buttonConsulta: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonVaccine: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
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
