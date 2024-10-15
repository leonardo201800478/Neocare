// app/attendences/AttendanceSummary.tsx

import { useRouter, useLocalSearchParams } from 'expo-router'; // Para navegação
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';

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

  // Função para salvar o prontuário completo na tabela medical_records
  const handleSaveMedicalRecord = async () => {
    try {
      if (!attendanceId || !doctorId || !patientId || !vitalId || !symptomId || !nutritionId) {
        Alert.alert('Erro', 'Todos os dados são necessários para salvar o prontuário.');
        return;
      }

      const response = await createMedicalRecord(
        attendanceId,
        vitalId,
        symptomId,
        nutritionId,
        doctorId,
        patientId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o prontuário:', error);
      Alert.alert('Erro', 'Erro ao salvar o prontuário. Tente novamente.');
    }
  };

  // Função para voltar à tela de detalhes do paciente
  const handleGoToPatientDetails = () => {
    if (patientId) {
      router.push({
        pathname: '/(tabs)/patients/PacienteDetails',
        params: { patientId },
      });
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
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

      {/* Botão para salvar o prontuário completo */}
      <View style={styles.buttonContainer}>
        <Button title="Salvar Prontuário" onPress={handleSaveMedicalRecord} />
        <Button title="Voltar aos Detalhes do Paciente" onPress={handleGoToPatientDetails} />
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
  },
});

export default AttendanceSummary;
