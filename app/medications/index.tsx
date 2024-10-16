// app/medications/index.tsx

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

import { useDoctor } from '../context/DoctorContext'; // useDoctor do contexto correto
import { useMedicalRecords } from '../context/MedicalRecordsContext'; // useMedicalRecords do contexto correto
import { usePatient } from '../context/PatientContext'; // usePatient do contexto correto

const MedicamentsList = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>(); // Pega o patientId da URL
  const router = useRouter();
  const { fetchMedicalRecordsByPatient } = useMedicalRecords();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]); // Tipagem como any[] para evitar conflitos
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
      console.log('Prontuários encontrados:', records); // Verifica os registros retornados

      if (records) {
        // Ordena os registros do mais recente para o mais antigo
        const sortedRecords = records.sort(
          (a, b) => new Date(b.created_at ?? '').getTime() - new Date(a.created_at ?? '').getTime()
        );

        // Para cada prontuário, busca o nome do médico e do paciente de forma separada
        const recordsWithNames = await Promise.all(
          sortedRecords.map(async (record, index) => {
            // Busca separadamente os dados do médico e do paciente
            const doctor = record.doctor_id ? await fetchDoctorById(record.doctor_id) : null;
            const patient = record.patient_id ? await fetchPatientById(record.patient_id) : null;

            // Verifica se os dados de médicos e pacientes estão sendo buscados corretamente
            console.log(`Dados do médico (${record.doctor_id}):`, doctor);
            console.log(`Dados do paciente (${record.patient_id}):`, patient);

            // Retorna o registro com os nomes adicionais e o número de índice
            return {
              ...record,
              doctorName: doctor ? doctor.name : 'Médico não informado',
              patientName: patient ? patient.name : 'Paciente não informado',
              index: index + 1, // Enumera os registros com base na ordem
            };
          })
        );
        console.log('Registros com nomes atualizados:', recordsWithNames); // Verifica os registros com os nomes
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
    console.log('Selecionado prontuário:', record); // Verifica o prontuário selecionado
    router.push({
      pathname: '/medications/TestScreen',
      params: { medicalRecordId: record.id }, // Passa o id do prontuário para a próxima tela
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.recordItem} onPress={() => handleMedicalRecordSelect(item)}>
        <Text style={styles.text}>Prontuário #{item.index}</Text>
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
      <Text style={styles.header}>Dados do Paciente</Text>
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

export default MedicamentsList;
