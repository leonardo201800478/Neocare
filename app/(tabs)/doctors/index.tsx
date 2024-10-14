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
  const [vaccinesCount, setVaccinesCount] = useState<number>(0);
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

      const { data: vaccinations, error: vaccinationsError } = await client
        .from('vaccinations')
        .select('id', { count: 'exact' })
        .eq('doctor_id', selectedDoctor!.id);

      if (vaccinationsError) throw vaccinationsError;
      setVaccinesCount(vaccinations?.length || 0);
    } catch {
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
        <View style={DoctorsStyles.infoBox}>
          <Text style={DoctorsStyles.infoBoxTitle}>Pacientes</Text>
          <Text style={DoctorsStyles.infoBoxValue}>{patientsCount}</Text>
        </View>
        <View style={DoctorsStyles.infoBox}>
          <Text style={DoctorsStyles.infoBoxTitle}>Prontuários</Text>
          <Text style={DoctorsStyles.infoBoxValue}>{recordsCount}</Text>
        </View>
        <View style={DoctorsStyles.infoBox}>
          <Text style={DoctorsStyles.infoBoxTitle}>Vacinas</Text>
          <Text style={DoctorsStyles.infoBoxValue}>{vaccinesCount}</Text>
        </View>
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
