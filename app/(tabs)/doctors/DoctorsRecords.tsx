// app/(tabs)/doctors/DoctorsRecords.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { useDoctor } from '../../context/DoctorContext';
import { useMedicalRecords } from '../../context/MedicalRecordsContext';

const DoctorsRecords: React.FC = () => {
  const { selectedDoctor } = useDoctor();
  const { fetchMedicalRecordsByDoctor } = useMedicalRecords();
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedDoctor) {
      loadMedicalRecords();
    } else {
      console.error('Nenhum médico selecionado');
    }
  }, [selectedDoctor]);

  const loadMedicalRecords = async () => {
    if (!selectedDoctor?.id) return;

    const records = await fetchMedicalRecordsByDoctor(selectedDoctor.id);
    if (records) {
      setMedicalRecords(records);
    } else {
      console.error('Erro ao carregar prontuários médicos.');
    }
  };

  const handleRecordPress = (record: any) => {
    router.push({
      pathname: '/attendences/AttendanceDetails',
      params: { id: record.id },
    });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleRecordPress(item)}>
      <Text style={styles.itemTitle}>Paciente: {item.patient?.name || 'Desconhecido'}</Text>
      <Text style={styles.itemDetail}>Médico: {item.doctor?.name || 'Desconhecido'}</Text>
      <Text style={styles.itemDetail}>Atendimento ID: {item.attendance_id}</Text>
      <Text style={styles.itemDetail}>Data: {new Date(item.created_at).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medicalRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Nenhum prontuário encontrado</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  itemTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
  },
});

export default DoctorsRecords;
