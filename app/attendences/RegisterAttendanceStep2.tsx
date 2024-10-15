// app/attendences/RegisterAttendanceStep2.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import VitalInfoForm from './VitalInfoForm';
import { VitalInfo } from './types';
import { uuid } from '../../utils/uuid';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import { usePatient } from '../context/PatientContext';
import styles from '../styles/Styles';

const RegisterAttendanceStep2: React.FC = () => {
  const router = useRouter();
  const {
    attendanceId,
    doctorId: doctorIdParam,
    patientId: patientIdParam,
  } = useLocalSearchParams<{
    attendanceId: string;
    doctorId: string;
    patientId: string;
  }>(); // Pega o ID do atendimento, médico e paciente da rota
  const { createVitalSigns } = useAttendanceVital(); // Função para criar sinais vitais
  const { selectedDoctor } = useDoctor(); // Obtém o médico autenticado
  const { selectedPatient } = usePatient(); // Obtém o paciente selecionado

  // Garante que `doctorId` e `patientId` sejam strings e não `null`
  const doctorId = doctorIdParam || selectedDoctor?.id || '';
  const patientId = patientIdParam || selectedPatient?.id || '';

  // Estado para armazenar os dados dos sinais vitais
  const [vitalInfo, setVitalInfo] = useState<VitalInfo>({
    peso_kg: '',
    comprimento_cm: '',
    perimetro_cefalico_cm: '',
    numero_respiracoes_por_minuto: '',
  });

  // Verifica se os IDs de médico, paciente e atendimento estão disponíveis
  useEffect(() => {
    if (!doctorId || !patientId || !attendanceId) {
      Alert.alert('Erro', 'Dados do médico, paciente ou atendimento não encontrados.');
      router.back(); // Retorna à tela anterior se algum ID estiver faltando
    }
  }, [doctorId, patientId, attendanceId]);

  // Função para lidar com a mudança de valores no formulário de sinais vitais
  const handleVitalInfoChange = (field: keyof VitalInfo, value: string) => {
    setVitalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Função para salvar os sinais vitais e navegar para a próxima etapa
  const handleNextStep = async () => {
    try {
      if (!doctorId || !patientId || !attendanceId) {
        Alert.alert('Erro', 'Médico, paciente ou ID de atendimento não encontrados.');
        return;
      }

      // Criar os sinais vitais no banco de dados
      const response = await createVitalSigns(
        {
          ...vitalInfo,
          id: uuid(), // Gera um UUID único para os sinais vitais
        },
        doctorId,
        patientId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      const vitalId = response.vitalId;

      // Exibe mensagem de sucesso
      Alert.alert('Sucesso', 'Sinais vitais registrados com sucesso!');

      // Navega para o Step 3, passando os IDs para a próxima etapa
      router.push({
        pathname: '/attendences/RegisterAttendanceStep3',
        params: {
          attendanceId: attendanceId || '',
          doctorId: doctorId || '',
          patientId: patientId || '',
          vitalId: vitalId || '',
        },
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
