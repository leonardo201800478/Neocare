// app/attendences/RegisterAttendanceStep2.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import VitalInfoForm from './VitalInfoForm';
import { VitalInfo } from './types';
import { uuid } from '../../utils/uuid';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import styles from '../styles/Styles';

const RegisterAttendanceStep2: React.FC = () => {
  const router = useRouter();
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();
  const { createVitalSigns } = useAttendanceVital();

  // Estado para armazenar os sinais vitais
  const [vitalInfo, setVitalInfo] = useState<VitalInfo>({
    peso_kg: '',
    comprimento_cm: '',
    perimetro_cefalico_cm: '',
    numero_respiracoes_por_minuto: '',
  });

  // Função para lidar com a mudança de valores no formulário de sinais vitais
  const handleVitalInfoChange = (field: keyof VitalInfo, value: string) => {
    setVitalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    try {
      if (!attendanceId) {
        Alert.alert('Erro', 'ID do atendimento não encontrado.');
        return;
      }

      const doctorId = 'sample-doctor-id'; // Substitua pelo ID real do médico autenticado
      const patientId = 'sample-patient-id'; // Substitua pelo ID real do paciente

      // Criar os sinais vitais no prontuário
      await createVitalSigns(
        {
          ...vitalInfo,
          attendance_id: attendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        attendanceId
      );

      Alert.alert('Sucesso', 'Sinais vitais registrados com sucesso!');

      // Navegar para a próxima etapa (por exemplo, sintomas)
      router.push({
        pathname: '/attendences/RegisterAttendanceStep3',
        params: { attendanceId },
      });
    } catch (error) {
      console.error('Erro ao registrar sinais vitais:', error);
      Alert.alert('Erro', 'Erro ao registrar sinais vitais. Verifique os dados e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VitalInfoForm data={vitalInfo} onChange={handleVitalInfoChange} />
      <View style={styles.buttonContainer}>
        <Button title="Próximo" onPress={handleNextStep} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep2;
