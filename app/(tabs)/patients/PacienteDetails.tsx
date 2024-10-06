import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import styles from './styles/PacienteStyles';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { useSystem } from '../../../powersync/PowerSync';
import { useAttendance } from '../../context/AttendanceContext';
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';
import { useVaccination } from '../../context/VaccinationContext';

const PacienteDetails = () => {
  const router = useRouter();
  const { supabaseConnector } = useSystem();
  const { selectedPatient } = usePatient();
  const { doctorId } = useDoctor();
  const { createAttendance } = useAttendance();
  const { addVaccination } = useVaccination();

  const [loading, setLoading] = useState(true);
  const [hasAttendance, setHasAttendance] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPatient) {
      checkAttendance(selectedPatient.id);
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
      router.replace('/(tabs)/home/');
      setLoading(false);
    }
  }, [selectedPatient]);

  const checkAttendance = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar prontuário:', error);
        Alert.alert('Erro', 'Erro ao buscar prontuário do paciente.');
      } else {
        setHasAttendance(!!data);
      }
    } catch (error) {
      console.error('Erro ao buscar prontuário:', error);
      Alert.alert('Erro', 'Erro ao buscar prontuário do paciente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAttendance = async () => {
    if (selectedPatient && doctorId) {
      setLoading(true);
      try {
        const newAttendance = {
          id: selectedPatient.id + doctorId, // Criando um identificador único baseado no paciente e médico
          patient_id: selectedPatient.id,
          created_by: doctorId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        await createAttendance(newAttendance, doctorId, selectedPatient.id);

        Alert.alert('Sucesso', 'Atendimento criado com sucesso.');
        setHasAttendance(true);
      } catch (error) {
        console.error('Erro ao criar atendimento:', error);
        Alert.alert('Erro', 'Erro ao criar atendimento.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Erro', 'Dados insuficientes para criar um atendimento.');
    }
  };

  const handleRegisterVaccination = async () => {
    if (selectedPatient && doctorId) {
      setLoading(true);
      try {
        const newVaccination = {
          id: selectedPatient.id + doctorId + '-vaccine', // Criando um identificador único baseado no paciente e médico
          patient_id: selectedPatient.id,
          doctor_id: doctorId,
          administered_at: new Date().toISOString(),
        };

        await addVaccination(newVaccination, doctorId, selectedPatient.id);

        Alert.alert('Sucesso', 'Vacinação registrada com sucesso.');
      } catch (error) {
        console.error('Erro ao registrar vacinação:', error);
        Alert.alert('Erro', 'Erro ao registrar vacinação.');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Erro', 'Dados insuficientes para registrar uma vacinação.');
    }
  };

  if (loading) {
    return <LoadingOverlay message="Carregando detalhes do paciente..." />;
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
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
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

        {/* Botões para Atendimentos e Vacinações */}
        <View style={styles.buttonContainer}>
          {!hasAttendance && (
            <TouchableOpacity style={styles.buttonConsulta} onPress={handleCreateAttendance}>
              <Text style={styles.buttonText}>CRIAR ATENDIMENTO</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.buttonVaccine} onPress={handleRegisterVaccination}>
            <Text style={styles.buttonText}>REGISTRAR VACINAÇÃO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PacienteDetails;
