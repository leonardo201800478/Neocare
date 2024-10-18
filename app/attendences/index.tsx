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

import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { usePatient } from '../context/PatientContext';
const AttendanceList = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const { fetchMedicalRecordsByPatient } = useMedicalRecords();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) {
      loadMedicalRecords(patientId);
    }
  }, [patientId]);

  // Função para carregar os prontuários médicos por paciente
  const loadMedicalRecords = async (patientId: string) => {
    setLoading(true);
    try {
      // Busca os prontuários médicos associados ao paciente, sem join
      const records = await fetchMedicalRecordsByPatient(patientId);

      if (records) {
        // Para cada prontuário, busca o nome do médico e do paciente de forma separada
        const recordsWithNames = await Promise.all(
          records.map(async (record) => {
            // Busca separadamente os dados do médico e do paciente
            const doctor = record.doctor_id ? await fetchDoctorById(record.doctor_id) : null;
            const patient = record.patient_id ? await fetchPatientById(record.patient_id) : null;

            // Retorna o registro com os nomes adicionais
            return {
              ...record,
              doctorName: doctor ? doctor.name : 'Médico não informado',
              patientName: patient ? patient.name : 'Paciente não informado',
            };
          })
        );
        setMedicalRecords(recordsWithNames);
      } else {
        Alert.alert('Erro', 'Nenhum prontuário encontrado para este paciente.');
      }
    } catch (error) {
      console.error('Erro ao carregar prontuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os prontuários.');
    } finally {
      setLoading(false);
    }
  };

  const handleMedicalRecordSelect = (record: any) => {
    router.push({
      pathname: '/attendences/AttendanceDetails',
      params: { medicalRecordId: record.id },
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.recordItem} onPress={() => handleMedicalRecordSelect(item)}>
        <Text style={styles.text}>Paciente: {item.patientName}</Text>
        <Text style={styles.text}>Médico: {item.doctorName}</Text>
        <Text style={styles.text}>
          Data: {new Date(item.created_at).toLocaleDateString('pt-BR')} -{' '}
          {new Date(item.created_at).toLocaleTimeString('pt-BR')}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text>Carregando prontuários...</Text>
      </View>
    );
  }

  if (medicalRecords.length === 0) {
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
        data={medicalRecords}
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
  recordItem: {
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
