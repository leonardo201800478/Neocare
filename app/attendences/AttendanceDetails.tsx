import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { useMedicalRecords } from '../context/MedicalRecordsContext'; // Corrige para usar o contexto correto

const AttendanceDetails: React.FC = () => {
  const { medicalRecordId } = useLocalSearchParams<{ medicalRecordId: string }>();
  const { fetchCompleteMedicalRecord } = useMedicalRecords();
  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedicalRecord = async () => {
      if (!medicalRecordId) {
        Alert.alert('Erro', 'ID do prontuário não encontrado.');
        return;
      }

      setLoading(true);
      try {
        const record = await fetchCompleteMedicalRecord(medicalRecordId);
        if (!record) {
          throw new Error('Prontuário não encontrado.');
        }
        setMedicalRecord(record);
      } catch (error) {
        console.error('Erro ao carregar prontuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar o prontuário.');
      } finally {
        setLoading(false);
      }
    };

    loadMedicalRecord();
  }, [medicalRecordId, fetchCompleteMedicalRecord]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text>Carregando dados do prontuário...</Text>
      </View>
    );
  }

  if (!medicalRecord) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Prontuário não encontrado.</Text>
      </View>
    );
  }

  const { doctor, patient, attendance, vitals, symptoms, nutrition } = medicalRecord;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do Prontuário</Text>

      {/* Informações do Médico e Paciente */}
      <Text style={styles.label}>Médico: {doctor?.name || 'Não informado'}</Text>
      <Text style={styles.label}>Paciente: {patient?.name || 'Não informado'}</Text>

      {/* Informações do Atendimento */}
      <Text style={styles.sectionHeader}>Atendimento</Text>
      <Text style={styles.label}>
        Motivo da consulta: {attendance?.motivo_consulta || 'Não informado'}
      </Text>
      <Text style={styles.label}>
        Data:{' '}
        {attendance?.created_at
          ? new Date(attendance.created_at).toLocaleDateString()
          : 'Não disponível'}
      </Text>

      {/* Sinais Vitais */}
      <Text style={styles.sectionHeader}>Sinais Vitais</Text>
      <Text style={styles.label}>Peso (kg): {vitals?.peso_kg || 'Não informado'}</Text>
      <Text style={styles.label}>
        Comprimento (cm): {vitals?.comprimento_cm || 'Não informado'}
      </Text>

      {/* Sintomas */}
      <Text style={styles.sectionHeader}>Sintomas</Text>
      <Text style={styles.label}>Febre: {symptoms?.tem_febre === 'yes' ? 'Sim' : 'Não'}</Text>

      {/* Nutrição */}
      <Text style={styles.sectionHeader}>Nutrição e Desenvolvimento</Text>
      <Text style={styles.label}>
        Amamentando: {nutrition?.amamentando === 'yes' ? 'Sim' : 'Não'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AttendanceDetails;
