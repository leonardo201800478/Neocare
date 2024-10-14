// app/attendences/RegisterAttendanceStep1.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import BasicInfoForm from './BasicInfoForm'; // Importando o formulário
import { BasicInfo } from './types'; // Importando o tipo BasicInfo
import { uuid } from '../../utils/uuid';
import { useAttendance } from '../context/AttendanceContext';
import styles from '../styles/Styles'; // Estilização global

const RegisterAttendanceStep1: React.FC = () => {
  const router = useRouter();
  const { createAttendance } = useAttendance();

  // Estado para os dados do formulário de informações básicas
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    hipertensao: 'no',
    diabetes: 'no',
    doenca_hepatica: 'no',
    deficiencia_g6pd: 'no',
  });

  // Função para alterar os valores dos campos do formulário
  const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    try {
      const newAttendanceId = uuid();
      const doctorId = 'sample-doctor-id'; // Você pode pegar o ID do médico autenticado

      // Aqui você pode obter o ID do paciente de um contexto ou parâmetro de URL
      const patientId = 'sample-patient-id';

      // Criar o prontuário com as informações básicas
      await createAttendance({ ...basicInfo, id: newAttendanceId }, doctorId, patientId);

      Alert.alert('Sucesso', 'Prontuário criado com sucesso!');

      // Navega para a próxima etapa (por exemplo, tela de sinais vitais)
      router.push({
        pathname: '/attendences/RegisterAttendanceStep2',
        params: { attendanceId: newAttendanceId },
      });
    } catch (error) {
      console.error('Erro ao criar prontuário:', error);
      Alert.alert('Erro', 'Não foi possível criar o prontuário. Tente novamente.');
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
