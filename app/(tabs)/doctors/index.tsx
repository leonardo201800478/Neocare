import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';

const DoctorProfile: React.FC = () => {
  const router = useRouter();
  const { selectedDoctor } = useDoctor();
  const { supabaseConnector } = useSystem();
  const [patientsCount, setPatientsCount] = useState<number>(0);
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const [medicationsCount, setMedicationsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedDoctor) {
      Alert.alert('Erro', 'Nenhum médico selecionado. Faça login novamente.');
      router.replace('/(tabs)/doctors/register');
    } else {
      fetchData();
    }
  }, [selectedDoctor]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { client } = await supabaseConnector.fetchCredentials();

      const { data: patients, error: patientsError } = await client
        .from('patients')
        .select('id', { count: 'exact' })
        .eq('doctor_id', selectedDoctor!.id);
      if (patientsError) throw patientsError;
      setPatientsCount(patients?.length || 0);

      const { data: attendances, error: attendancesError } = await client
        .from('attendances')
        .select('id', { count: 'exact' })
        .eq('doctor_id', selectedDoctor!.id);
      if (attendancesError) throw attendancesError;
      setRecordsCount(attendances?.length || 0);

      const { data: medications, error: medicationsError } = await client
        .from('medications')
        .select('id', { count: 'exact' })
        .eq('doctor_id', selectedDoctor!.id);
      if (medicationsError) throw medicationsError;
      setMedicationsCount(medications?.length || 0);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Carregando os dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedDoctor?.name ?? 'Médico'}</Text>
      <Text style={styles.subHeader}>{selectedDoctor?.email ?? 'E-mail não disponível'}</Text>

      <View style={styles.infoBoxContainer}>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => router.push('/(tabs)/doctors/DoctorsPatients')}>
          <FontAwesome name="user-md" size={30} color="#4CAF50" />
          <Text style={styles.infoBoxValue}>{patientsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => router.push('/(tabs)/doctors/DoctorsRecords')}>
          <FontAwesome name="folder" size={30} color="#4CAF50" />
          <Text style={styles.infoBoxValue}>{recordsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => router.push('/(tabs)/doctors/DoctorsMedications')}>
          <FontAwesome name="medkit" size={30} color="#4CAF50" />
          <Text style={styles.infoBoxValue}>{medicationsCount}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/doctors/update')}>
        <FontAwesome name="edit" size={20} color="#fff" />
        <Text style={styles.buttonText}>Atualizar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.replace('/(tabs)/home')}>
        <FontAwesome name="arrow-left" size={20} color="#fff" />
        <Text style={styles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginLeft: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  infoBoxTitle: {
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  infoBoxValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DoctorProfile;
