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
      <Text style={styles.text}>Médico: {item.registered_by ?? 'Médico não informado'}</Text>
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
    backgroundColor: '#e8f5e9', // Verde claro para tornar a visualização agradável
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
    color: '#1b5e20', // Verde escuro para destacar o cabeçalho
  },
  listContainer: {
    paddingBottom: 16,
  },
  attendanceItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#1b5e20', // Verde escuro
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 16,
    color: '#1b5e20', // Verde escuro
    marginBottom: 4,
  },
});

export default AttendanceList;
