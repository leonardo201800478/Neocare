import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { calcularIdade } from '../../utils/idadeCalculator';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { usePatient } from '../context/PatientContext';

const AttendanceDetails: React.FC = () => {
  const { medicalRecordId } = useLocalSearchParams<{ medicalRecordId: string }>();
  const { fetchCompleteMedicalRecord } = useMedicalRecords();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
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
        if (!record) throw new Error('Prontuário não encontrado.');
        const doctor = record.doctor_id ? await fetchDoctorById(record.doctor_id) : null;
        const patient = record.patient_id ? await fetchPatientById(record.patient_id) : null;
        setMedicalRecord({
          ...record,
          doctorName: doctor ? doctor.name : 'Não informado',
          patientName: patient ? patient.name : 'Não informado',
          patientAge: patient
            ? patient.birth_date
              ? calcularIdade(new Date(patient.birth_date), patient.birth_date)
              : 'Data de nascimento não informada'
            : 'Não informado',
        });
      } catch (error) {
        console.error('Erro ao carregar prontuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar o prontuário.');
      } finally {
        setLoading(false);
      }
    };

    loadMedicalRecord();
  }, [medicalRecordId]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Prontuário</Text>
      {/* Informações do Médico e Paciente */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Informações do Médico e Paciente</Text>
        <MaterialIcons name="person-outline" size={24} color="black" />
        <Text style={styles.label}>Médico: {medicalRecord.doctorName}</Text>
        <FontAwesome5 name="user-md" size={24} color="black" />
        <Text style={styles.label}>Paciente: {medicalRecord.patientName}</Text>
        <AntDesign name="infocirlceo" size={24} color="black" />
        <Text style={styles.label}>Idade do Paciente: {medicalRecord.patientAge}</Text>
      </View>

      {/* Informações do Atendimento */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Atendimento</Text>
        <Text style={styles.label}>
          Data da Consulta:{' '}
          {medicalRecord.attendance?.created_at
            ? new Date(medicalRecord.attendance.created_at).toLocaleDateString()
            : 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Motivo da consulta: {medicalRecord.attendance?.motivo_consulta || 'Não informado '}
        </Text>
        <Text style={styles.label}>
          Hipertensão: {medicalRecord.attendance?.hipertensao === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Diabetes: {medicalRecord.attendance?.diabetes === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Doença Hepática: {medicalRecord.attendance?.doenca_hepatica === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Deficiência G6PD: {medicalRecord.attendance?.deficiencia_g6pd === 'yes' ? 'Sim' : 'Não'}
        </Text>
      </View>
      {/* Sinais Vitais */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Sinais Vitais</Text>
        <Text style={styles.label}>
          Peso (kg): {medicalRecord.vitals?.peso_kg || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Perímetro Cefálico (cm): {medicalRecord.vitals?.perimetro_cefalico_cm || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Comprimento (cm): {medicalRecord.vitals?.comprimento_cm || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Número de Respirações por Minuto:{' '}
          {medicalRecord.vitals?.numero_respiracoes_por_minuto || 'Não informado'}
        </Text>
      </View>

      {/* Sintomas */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Sintomas</Text>
        <Text style={styles.label}>
          Febre: {medicalRecord.symptoms?.tem_febre === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Tosse: {medicalRecord.symptoms?.tem_tosse === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Sibilância: {medicalRecord.symptoms?.sibilancia === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Diarreia: {medicalRecord.symptoms?.tem_diarreia === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Vômito: {medicalRecord.symptoms?.vomita_tudo === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Convulsões: {medicalRecord.symptoms?.convulsoes === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Letárgica: {medicalRecord.symptoms?.letargica === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Enchimento Capilar: {medicalRecord.symptoms?.enchimento_capilar || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Batimento de Asa: {medicalRecord.symptoms?.batimento_asa || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Rigidez de Nuca: {medicalRecord.symptoms?.rigidez_nuca === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Problema de Ouvido: {medicalRecord.symptoms?.problema_ouvido === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Dor de Garganta: {medicalRecord.symptoms?.dor_garganta === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Gemido: {medicalRecord.symptoms?.gemido === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Cianose Periférica: {medicalRecord.symptoms?.cianose_periferica === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Icterícia: {medicalRecord.symptoms?.ictericia === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Distensão Abdominal:{' '}
          {medicalRecord.symptoms?.distensao_abdominal === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Emagrecimento: {medicalRecord.symptoms?.emagrecimento === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Edema: {medicalRecord.symptoms?.edema === 'yes' ? 'Sim' : 'Não'}
        </Text>
      </View>

      {/* Nutrição */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Nutrição e Desenvolvimento</Text>
        <Text style={styles.label}>
          Amamentando: {medicalRecord.nutrition?.amamentando === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Quantas Vezes ao dia?:{' '}
          {medicalRecord.nutrition?.quantas_vezes_amamenta === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Alimentação: {medicalRecord.nutrition?.alimentacao || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Quantidade de Refeições:{' '}
          {medicalRecord.nutrition?.quantidade_refeicoes || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Tipo de Alimentação: {medicalRecord.nutrition?.tipo_alimentacao || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Alimentos Líquidos: {medicalRecord.nutrition?.alimentos_liquidos || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Amamenta à Noite: {medicalRecord.nutrition?.amamenta_noite === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Outras Informações: {medicalRecord.nutrition?.outras_informacoes || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Mudou Alimentação: {medicalRecord.nutrition?.mudou_alimentacao === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Como Mudou a Alimentação:{' '}
          {medicalRecord.nutrition?.como_mudou_alimentacao || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Perda de Peso na Primeira Semana:{' '}
          {medicalRecord.nutrition?.perda_peso_primeira_semana || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Tendência de Crescimento:{' '}
          {medicalRecord.nutrition?.tendencia_crescimento || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Habilidades de Desenvolvimento:{' '}
          {medicalRecord.nutrition?.habilidades_desenvolvimento || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Atividade Física por Semana:{' '}
          {medicalRecord.nutrition?.atividade_fisica_vezes_semana || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Tempo de Atividade Física:{' '}
          {medicalRecord.nutrition?.tempo_atividade_fisica || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Tempo Sedentário: {medicalRecord.nutrition?.tempo_sedentario || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Avaliação de Violência: {medicalRecord.nutrition?.avaliacao_violencia || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          Outros Problemas: {medicalRecord.nutrition?.outros_problemas || 'Não informado'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'lightgreen',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AttendanceDetails;
