// app/attendences/RegisterAttendanceStep3.tsx

import React, { useState } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import GeneralSymptomsForm from './GeneralSymptomsForm';
import { GeneralSymptoms } from './types';
import { useAttendanceSymptom } from '../context/AttendanceSymptomContext';
import { uuid } from '../../utils/uuid';
import styles from '../styles/Styles';

const RegisterAttendanceStep3: React.FC = () => {
  const router = useRouter();
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();
  const { createSymptom } = useAttendanceSymptom();

  // Estado para armazenar os sintomas gerais
  const [generalSymptoms, setGeneralSymptoms] = useState<GeneralSymptoms>({
    nao_bebe_ou_mama: 'no',
    vomita_tudo: 'no',
    convulsoes: 'no',
    letargica: 'no',
    enchimento_capilar: 'no',
    batimento_asa: 'no',
    tem_tosse: 'no',
    sibilancia: 'no',
    tem_diarreia: 'no',
    tem_febre: 'no',
    rigidez_nuca: 'no',
    problema_ouvido: 'no',
    dor_garganta: 'no',
    gemido: 'no',
    cianose_periferica: 'no',
    ictericia: 'no',
    distensao_abdominal: 'no',
    emagrecimento: 'no',
    edema: 'no',
  });

  // Função para lidar com a mudança de valores no formulário de sintomas gerais
  const handleGeneralSymptomsChange = (field: keyof GeneralSymptoms, value: string) => {
    setGeneralSymptoms((prev) => ({
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

      // Criar os sintomas gerais no prontuário
      await createSymptom(
        {
          ...generalSymptoms,
          attendance_id: attendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        attendanceId
      );

      Alert.alert('Sucesso', 'Sintomas registrados com sucesso!');

      // Navegar para a próxima etapa (por exemplo, nutrição e desenvolvimento)
      router.push({
        pathname: '/attendences/RegisterAttendanceStep4',
        params: { attendanceId },
      });
    } catch (error) {
      console.error('Erro ao registrar sintomas:', error);
      Alert.alert('Erro', 'Erro ao registrar sintomas. Verifique os dados e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GeneralSymptomsForm data={generalSymptoms} onChange={handleGeneralSymptomsChange} />
      <View style={styles.buttonContainer}>
        <Button title="Próximo" onPress={handleNextStep} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep3;
