import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Attendance, ATTENDANCES_TABLE } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { useAttendance } from '../context/AttendanceContext';
import { useNutrition } from '../context/AttendanceNutritionContext';
import { useAttendanceSymptom } from '../context/AttendanceSymptomContext';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import { usePatient } from '../context/PatientContext';

const AttendanceList = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>(); // Pega o patientId da URL
  const router = useRouter();
  const { db } = useSystem();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  const { setSelectedAttendance } = useAttendance();
  const { setVitalSigns } = useAttendanceVital();
  const { setSymptoms } = useAttendanceSymptom();
  const { setNutrition } = useNutrition();

  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();

  const [doctorNames, setDoctorNames] = useState<{ [key: string]: string }>({});
  const [patientNames, setPatientNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (patientId) {
      loadAttendances();
    }
  }, [patientId]);

  const loadAttendances = async () => {
    setLoading(true);
    try {
      // Busca os prontuários relacionados ao patientId
      const result = await db
        .selectFrom(ATTENDANCES_TABLE)
        .selectAll()
        .where('patient_id', '=', patientId) // Filtra pelo patientId
        .orderBy('updated_at', 'desc')
        .execute();

      setAttendances(result);

      // Carregar nomes de médicos e pacientes
      await loadDoctorAndPatientNames(result);
    } catch (error) {
      console.error('Erro ao carregar prontuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os prontuários.');
    } finally {
      setLoading(false);
    }
  };

  const loadDoctorAndPatientNames = async (attendances: Attendance[]) => {
    try {
      const doctorNamesMap: { [key: string]: string } = {};
      const patientNamesMap: { [key: string]: string } = {};

      for (const attendance of attendances) {
        if (attendance.doctor_id && !doctorNamesMap[attendance.doctor_id]) {
          const doctor = await fetchDoctorById(attendance.doctor_id);
          if (doctor) {
            doctorNamesMap[attendance.doctor_id] = doctor.name || 'Médico não informado';
          }
        }

        if (attendance.patient_id && !patientNamesMap[attendance.patient_id]) {
          const patient = await fetchPatientById(attendance.patient_id);
          if (patient) {
            patientNamesMap[attendance.patient_id] = patient.name || 'Paciente não informado';
          }
        }
      }

      setDoctorNames(doctorNamesMap);
      setPatientNames(patientNamesMap);
    } catch (error) {
      console.error('Erro ao carregar nomes de médicos e pacientes:', error);
    }
  };

  const handleAttendanceSelect = async (attendance: Attendance) => {
    try {
      setSelectedAttendance(attendance);

      // Carregar sinais vitais
      try {
        const vitals = await db
          .selectFrom('attendance_vitals')
          .selectAll()
          .where('attendance_id', '=', attendance.id)
          .execute();
        setVitalSigns(vitals.length > 0 ? vitals[0] : null);
      } catch (error) {
        console.warn('Erro ao buscar sinais vitais:', (error as any).message);
      }

      // Carregar sintomas
      try {
        const symptoms = await db
          .selectFrom('attendance_symptoms')
          .selectAll()
          .where('attendance_id', '=', attendance.id)
          .execute();
        setSymptoms(symptoms.length > 0 ? symptoms[0] : null);
      } catch (error) {
        console.warn('Erro ao buscar sintomas:', (error as any).message);
      }

      // Carregar nutrição e desenvolvimento
      try {
        const nutrition = await db
          .selectFrom('attendance_nutrition_development')
          .selectAll()
          .where('attendance_id', '=', attendance.id)
          .execute();
        setNutrition(nutrition.length > 0 ? [nutrition[0]] : null);
      } catch (error) {
        console.warn('Erro ao buscar dados de nutrição e desenvolvimento:', (error as any).message);
      }

      // Navegar para os detalhes do atendimento
      router.push({
        pathname: '/attendences/AttendanceDetails',
        params: { attendanceId: attendance.id }, // Passa o attendanceId para a próxima tela
      });
    } catch (error) {
      console.error('Erro ao carregar dados do atendimento:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do atendimento.');
    }
  };

  const renderItem = ({ item }: { item: Attendance }) => (
    <TouchableOpacity style={styles.attendanceItem} onPress={() => handleAttendanceSelect(item)}>
      <Text style={styles.text}>
        Médico: {item.doctor_id ? doctorNames[item.doctor_id] : 'Médico não informado'}
      </Text>
      <Text style={styles.text}>
        Paciente: {item.patient_id ? patientNames[item.patient_id] : 'Paciente não informado'}
      </Text>
      <Text style={styles.text}>
        Data:{' '}
        {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'Data não disponível'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text>Carregando prontuários...</Text>
      </View>
    );
  }

  if (attendances.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nenhum prontuário encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prontuários do Paciente</Text>
      <FlatList
        data={attendances}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e8f5e9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1b5e20',
  },
  listContainer: {
    paddingBottom: 16,
  },
  attendanceItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#1b5e20',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 4,
  },
});

export default AttendanceList;
