// app/attendences/RegisterAttendanceStep1.tsx

import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import { BasicInfo } from './types';
import { uuid } from '../../utils/uuid'; // Para gerar o UUID
import { useAttendance } from '../context/AttendanceContext'; // Importando o contexto de Atendimentos
import { useDoctor } from '../context/DoctorContext'; // Importando o contexto de Doutores
import { usePatient } from '../context/PatientContext'; // Importando o contexto de Pacientes
import styles from '../styles/Styles';

const RegisterAttendanceStep1: React.FC = () => {
  const router = useRouter();
  const { createAttendance } = useAttendance(); // Função para criar o atendimento no banco de dados
  const { selectedDoctor } = useDoctor(); // Obtém o médico autenticado
  const { selectedPatient } = usePatient(); // Obtém o paciente selecionado

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: '',
    hipertensao: 'no',
    diabetes: 'no',
    doenca_hepatica: 'no',
    deficiencia_g6pd: 'no',
  });

  // Verificar se o paciente e o médico foram selecionados corretamente
  useEffect(() => {
    if (!selectedPatient || !selectedDoctor) {
      Alert.alert('Erro', 'Paciente ou médico não selecionado.');
    }
  }, [selectedPatient, selectedDoctor]);

  const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    try {
      const doctorId = selectedDoctor?.id; // ID do médico autenticado
      const patientId = selectedPatient?.id; // ID do paciente selecionado

      if (!doctorId || !patientId) {
        Alert.alert('Erro', 'Médico ou paciente não encontrado.');
        return;
      }

      // Criar o atendimento no banco de dados
      const response = await createAttendance(
        {
          ...basicInfo,
          id: uuid(),
        },
        doctorId,
        patientId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Exibir mensagem de sucesso e navegar para o próximo passo
      Alert.alert('Sucesso', 'Atendimento registrado com sucesso!');

      // Navega para o Step 2, passando o attendanceId, doctorId e patientId
      router.push({
        pathname: '/attendences/RegisterAttendanceStep2',
        params: {
          attendanceId: response.attendanceId ?? '',
          doctorId,
          patientId,
        }, // Passa os parâmetros corretos
      });
    } catch (error) {
      console.error('Erro ao registrar atendimento:', error);
      Alert.alert('Erro', 'Não foi possível registrar o atendimento. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BasicInfoForm data={basicInfo} onChange={handleBasicInfoChange} />
      <View style={styles.buttonContainer}>
        <Button title="Próximo" onPress={handleNextStep} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep1;
