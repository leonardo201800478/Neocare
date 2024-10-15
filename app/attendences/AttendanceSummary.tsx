// app/attendences/AttendanceSummary.tsx

import { Ionicons } from '@expo/vector-icons'; // Para ícones
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable'; // Para animações

import { useMedicalRecords } from '../context/MedicalRecordsContext';

const AttendanceSummary: React.FC = () => {
  const router = useRouter();
  const { attendanceId, doctorId, patientId, vitalId, symptomId, nutritionId } =
    useLocalSearchParams<{
      attendanceId: string;
      doctorId: string;
      patientId: string;
      vitalId: string;
      symptomId: string;
      nutritionId: string;
    }>();

  const { createMedicalRecord } = useMedicalRecords();
  const [isSaved, setIsSaved] = useState(false); // Estado para controlar se o prontuário foi salvo
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento do botão "Salvar"

  // Função para salvar o prontuário completo na tabela medical_records
  const handleSaveMedicalRecord = async () => {
    try {
      if (!attendanceId || !doctorId || !patientId || !vitalId || !symptomId || !nutritionId) {
        Alert.alert('Erro', 'Todos os dados são necessários para salvar o prontuário.');
        return;
      }

      setLoading(true); // Inicia o estado de carregamento

      const response = await createMedicalRecord({
        attendanceId,
        vitalId,
        symptomId,
        nutritionId,
        doctorId,
        patientId
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setIsSaved(true); // Marca o prontuário como salvo
      setLoading(false); // Termina o carregamento
      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
    } catch (error) {
      setLoading(false); // Termina o carregamento em caso de erro
      console.error('Erro ao salvar o prontuário:', error);
      Alert.alert('Erro', 'Erro ao salvar o prontuário. Tente novamente.');
    }
  };

  // Função para voltar à tela de detalhes do paciente
  const handleGoToPatientDetails = () => {
    if (isSaved && patientId) {
      router.push({
        pathname: '/(tabs)/patients/PacienteDetails',
        params: { patientId },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumo do Atendimento</Text>
      <Text style={styles.label}>ID do Atendimento: {attendanceId}</Text>
      <Text style={styles.label}>ID do Médico: {doctorId}</Text>
      <Text style={styles.label}>ID do Paciente: {patientId}</Text>
      <Text style={styles.label}>ID dos Sinais Vitais: {vitalId}</Text>
      <Text style={styles.label}>ID dos Sintomas: {symptomId}</Text>
      <Text style={styles.label}>ID de Nutrição: {nutritionId}</Text>

      <View style={styles.buttonContainer}>
        {/* Botão Salvar Prontuário */}
        <Animatable.View animation="bounceIn">
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSaveMedicalRecord}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="save-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Salvar Prontuário</Text>
              </>
            )}
          </TouchableOpacity>
        </Animatable.View>

        {/* Botão Voltar aos Detalhes do Paciente */}
        <Animatable.View animation="fadeIn" delay={500}>
          <TouchableOpacity
            style={[
              styles.button,
              isSaved ? styles.activeButton : styles.disabledButton, // Botão ativo ou desativado
            ]}
            onPress={handleGoToPatientDetails}
            disabled={!isSaved} // Só habilita se o prontuário foi salvo
          >
            <Ionicons name="arrow-back-outline" size={24} color={isSaved ? '#fff' : '#b0b0b0'} />
            <Text style={[styles.buttonText, { color: isSaved ? '#fff' : '#b0b0b0' }]}>
              Voltar aos Detalhes do Paciente
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  activeButton: {
    backgroundColor: '#1976d2',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttendanceSummary;
