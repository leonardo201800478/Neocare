import { useRouter } from 'expo-router';
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

const AttendanceList = () => {
  const router = useRouter();
  const { db } = useSystem();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendances();
  }, []);

  const loadAttendances = async () => {
    setLoading(true);
    try {
      // Busca os atendimentos da tabela de prontuários
      const result = await db
        .selectFrom(ATTENDANCES_TABLE)
        .selectAll()
        .orderBy('updated_at', 'desc') // Ordena pelo mais recente
        .execute();

      setAttendances(result);
    } catch (error) {
      console.error('Erro ao carregar prontuários:', error);
      Alert.alert('Erro', 'Não foi possível carregar os prontuários.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Attendance }) => (
    <TouchableOpacity
      style={styles.attendanceItem}
      onPress={() => {
        if (item.patient_id) {
          router.push({
            pathname: '/attendences/RegisterAttendance',
            params: { patientId: item.patient_id },
          });
        } else {
          Alert.alert('Erro', 'ID do paciente não encontrado.');
        }
      }}>
      <Text style={styles.text}>Médico: {item.doctor_name ?? 'Médico não informado'}</Text>
      <Text style={styles.text}>
        Data:{' '}
        {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'Data não disponível'}
      </Text>
      <Text style={styles.text}>Paciente ID: {item.patient_id}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A700FF" />
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
      <Text style={styles.header}>Lista de Prontuários</Text>
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
    backgroundColor: '#f9f9f9',
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
  },
  listContainer: {
    paddingBottom: 16,
  },
  attendanceItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default AttendanceList;
