// app/attendances/AttendanceSummary.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Button } from 'react-native';

import { useAttendance } from '../context/AttendanceContext';
import { useNutrition } from '../context/AttendanceNutritionContext';
import { useAttendanceSymptom } from '../context/AttendanceSymptomContext';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext'; // Para registrar os UUIDs na tabela medical_records
import { usePatient } from '../context/PatientContext';

interface AttendanceSummaryProps {
  attendanceId: string;
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ attendanceId }) => {
  const { fetchAttendanceById } = useAttendance();
  const { fetchVitalsByAttendance } = useAttendanceVital();
  const { fetchSymptomsByAttendanceId } = useAttendanceSymptom();
  const { fetchNutritionByAttendanceId } = useNutrition();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
  const { createMedicalRecord } = useMedicalRecords(); // Função para salvar na tabela medical_records

  const [attendance, setAttendance] = useState<any>(null);
  const [vitals, setVitals] = useState<any>(null);
  const [symptoms, setSymptoms] = useState<any>(null);
  const [nutrition, setNutrition] = useState<any>(null);
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const [patientName, setPatientName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendanceDetails = async () => {
      if (!attendanceId) {
        Alert.alert('Erro', 'ID do atendimento não encontrado.');
        return;
      }

      setLoading(true);
      try {
        // 1. Buscar prontuário na tabela 'attendances'
        const attendance = await fetchAttendanceById(attendanceId);
        if (!attendance) throw new Error('Prontuário não encontrado.');
        setAttendance(attendance);

        // 2. Buscar nome do médico e do paciente
        const doctor = attendance.doctor_id ? await fetchDoctorById(attendance.doctor_id) : null;
        const patient = attendance.patient_id
          ? await fetchPatientById(attendance.patient_id)
          : null;
        setDoctorName(doctor?.name ?? 'Médico não informado');
        setPatientName(patient?.name ?? 'Paciente não informado');

        // 3. Buscar sinais vitais na tabela 'attendance_vitals'
        const vitals = await fetchVitalsByAttendance(attendanceId);
        setVitals(vitals);

        // 4. Buscar sintomas na tabela 'attendance_symptoms'
        const symptoms = await fetchSymptomsByAttendanceId(attendanceId);
        setSymptoms(symptoms);

        // 5. Buscar nutrição e desenvolvimento na tabela 'attendance_nutrition_development'
        const nutrition = await fetchNutritionByAttendanceId(attendanceId);
        setNutrition(nutrition?.[0] ?? null);
      } catch (error) {
        console.error('Erro ao carregar detalhes do atendimento:', error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do atendimento.');
      } finally {
        setLoading(false);
      }
    };

    loadAttendanceDetails();
  }, [attendanceId]);

  const handleSaveMedicalRecord = async () => {
    try {
      if (!attendance || !vitals || !symptoms || !nutrition) {
        Alert.alert('Erro', 'Todos os dados devem ser carregados para salvar o prontuário.');
        return;
      }

      const response = await createMedicalRecord(
        attendance.id,
        vitals.id,
        symptoms.id,
        nutrition.id,
        attendance.doctor_id,
        attendance.patient_id
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text>Carregando dados do atendimento...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Informações principais do atendimento */}
      <Text style={styles.title}>Resumo do Atendimento</Text>
      <Text style={styles.label}>Médico: {doctorName}</Text>
      <Text style={styles.label}>Paciente: {patientName}</Text>
      <Text style={styles.label}>Motivo da consulta: {attendance?.motivo_consulta}</Text>
      <Text style={styles.label}>
        Data: {new Date(attendance?.created_at).toLocaleDateString()}
      </Text>
      <Text style={styles.label}>
        Consulta de retorno: {attendance?.consulta_retorno === 'yes' ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.label}>
        Primeira consulta: {attendance?.primeira_consulta === 'yes' ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.label}>
        Hipertensão: {attendance?.hipertensao === 'yes' ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.label}>Diabetes: {attendance?.diabetes === 'yes' ? 'Sim' : 'Não'}</Text>
      <Text style={styles.label}>
        Doença Hepática: {attendance?.doenca_hepatica === 'yes' ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.label}>
        Deficiência de G6PD: {attendance?.deficiencia_g6pd === 'yes' ? 'Sim' : 'Não'}
      </Text>

      {/* Sinais vitais */}
      <Text style={styles.sectionHeader}>Sinais Vitais</Text>
      <Text style={styles.label}>Peso (kg): {vitals?.peso_kg}</Text>
      <Text style={styles.label}>Comprimento (cm): {vitals?.comprimento_cm}</Text>
      <Text style={styles.label}>Perímetro Cefálico (cm): {vitals?.perimetro_cefalico_cm}</Text>
      <Text style={styles.label}>
        Respirações por Minuto: {vitals?.numero_respiracoes_por_minuto}
      </Text>

      {/* Sintomas */}
      <Text style={styles.sectionHeader}>Sintomas</Text>
      <Text style={styles.label}>Febre: {symptoms?.tem_febre === 'yes' ? 'Sim' : 'Não'}</Text>
      <Text style={styles.label}>Diarreia: {symptoms?.tem_diarreia === 'yes' ? 'Sim' : 'Não'}</Text>
      <Text style={styles.label}>Vômito: {symptoms?.vomita_tudo === 'yes' ? 'Sim' : 'Não'}</Text>
      <Text style={styles.label}>Convulsões: {symptoms?.convulsoes === 'yes' ? 'Sim' : 'Não'}</Text>
      <Text style={styles.label}>Tosse: {symptoms?.tem_tosse === 'yes' ? 'Sim' : 'Não'}</Text>

      {/* Nutrição e Desenvolvimento */}
      <Text style={styles.sectionHeader}>Nutrição e Desenvolvimento</Text>
      <Text style={styles.label}>
        Amamentando: {nutrition?.amamentando === 'yes' ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.label}>Quantas Vezes Amamenta: {nutrition?.quantas_vezes_amamenta}</Text>
      <Text style={styles.label}>
        Amamenta à Noite: {nutrition?.amamenta_noite === 'yes' ? 'Sim' : 'Não'}
      </Text>
      <Text style={styles.label}>Alimentos Líquidos: {nutrition?.alimentos_liquidos}</Text>
      <Text style={styles.label}>Quantidade de Refeições: {nutrition?.quantidade_refeicoes}</Text>
      <Text style={styles.label}>
        Habilidades de Desenvolvimento: {nutrition?.habilidades_desenvolvimento}
      </Text>
      <Text style={styles.label}>
        Atividade Física (Vezes por Semana): {nutrition?.atividade_fisica_vezes_semana}
      </Text>

      {/* Botão para salvar o prontuário completo */}
      <View style={styles.buttonContainer}>
        <Button title="Salvar Prontuário" onPress={handleSaveMedicalRecord} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    marginTop: 30,
  },
});

export default AttendanceSummary;
