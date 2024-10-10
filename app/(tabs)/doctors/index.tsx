import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import DoctorsStyles from './styles/DoctorsStyles';
import { useAttendance } from '../../context/AttendanceContext';
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';
import { useVaccination } from '../../context/VaccinationContext';

const DoctorProfile: React.FC = () => {
  const router = useRouter();
  const { selectedDoctor } = useDoctor();
  const { db } = useDoctor().db;
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
      // Fetch number of patients associated with the doctor
      const patients = await db
        .selectFrom('patients')
        .selectCount()
        .where('doctor_id', '=', selectedDoctor!.id)
        .execute();
      setPatientsCount(patients[0].count);

      // Fetch number of attendances (medical records) made by the doctor
      const attendances = await db
        .selectFrom('attendances')
        .selectCount()
        .where('doctor_id', '=', selectedDoctor!.id)
        .execute();
      setRecordsCount(attendances[0].count);

      // Fetch number of vaccinations applied by the doctor
      const vaccinations = await db
        .selectFrom('vaccinations')
        .selectCount()
        .where('doctor_id', '=', selectedDoctor!.id)
        .execute();
      setVaccinesCount(vaccinations[0].count);
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
