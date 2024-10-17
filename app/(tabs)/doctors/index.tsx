// app/(tabs)/doctors/index.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import DoctorsStyles from './styles/DoctorsStyles';
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
      <View style={DoctorsStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Carregando os dados...</Text>
      </View>
    );
  }

  return (
    <View style={DoctorsStyles.container}>
      <Text style={DoctorsStyles.header}>{selectedDoctor?.name ?? 'Médico'}</Text>
      <Text style={DoctorsStyles.subHeader}>
        {selectedDoctor?.email ?? 'E-mail não disponível'}
      </Text>

      <View style={DoctorsStyles.infoBoxContainer}>
        <TouchableOpacity
          style={DoctorsStyles.infoBox}
          onPress={() => router.push('/(tabs)/doctors/DoctorsPatients')}>
          <Text style={DoctorsStyles.infoBoxTitle}>Pacientes</Text>
          <Text style={DoctorsStyles.infoBoxValue}>{patientsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={DoctorsStyles.infoBox}
          onPress={() => router.push('/(tabs)/doctors/DoctorsRecords')}>
          <Text style={DoctorsStyles.infoBoxTitle}>Prontuários</Text>
          <Text style={DoctorsStyles.infoBoxValue}>{recordsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={DoctorsStyles.infoBox}
          onPress={() => router.push('/(tabs)/doctors/DoctorsMedications')}>
          <Text style={DoctorsStyles.infoBoxTitle}>Medicamentos</Text>
          <Text style={DoctorsStyles.infoBoxValue}>{medicationsCount}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={DoctorsStyles.button}
        onPress={() => router.push('/(tabs)/doctors/update')}>
        <Text style={DoctorsStyles.buttonText}>Atualizar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={DoctorsStyles.buttonSecondary}
        onPress={() => router.replace('/(tabs)/home')}>
        <Text style={DoctorsStyles.buttonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorProfile;
