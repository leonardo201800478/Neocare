// app/attendences/RegisterAttendanceStep4.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import { NutritionDevelopment } from './types';
import { uuid } from '../../utils/uuid';
import { useNutrition } from '../context/AttendanceNutritionContext';
import { useDoctor } from '../context/DoctorContext';
import { usePatient } from '../context/PatientContext';
import styles from '../styles/Styles';

const RegisterAttendanceStep4: React.FC = () => {
  const router = useRouter();
  const { attendanceId, doctorId, patientId, vitalId, symptomId } = useLocalSearchParams<{
    attendanceId: string;
    doctorId: string;
    patientId: string;
    vitalId: string;
    symptomId: string;
  }>();

  const { createNutrition } = useNutrition();
  const { selectedDoctor } = useDoctor();
  const { selectedPatient } = usePatient();

  // Estado para armazenar os dados de nutrição e desenvolvimento
  const [nutritionDevelopment, setNutritionDevelopment] = useState<NutritionDevelopment>({
    amamentando: 'no',
    quantas_vezes_amamenta: '0',
    amamenta_noite: 'no',
    alimentos_liquidos: 'no',
    quantidade_refeicoes: '0',
    tipo_alimentacao: '',
    mudou_alimentacao: 'no',
    como_mudou_alimentacao: '',
    perda_peso_primeira_semana: 'no',
    tendencia_crescimento: '',
    habilidades_desenvolvimento: '',
    atividade_fisica_vezes_semana: '0',
    tempo_atividade_fisica: '0',
    tempo_sedentario: '0',
    avaliacao_violencia: '',
    outros_problemas: '',
  });

  // Verifica se o paciente e o médico estão definidos
  useEffect(() => {
    if (!doctorId || !patientId || !attendanceId || !vitalId || !symptomId) {
      Alert.alert('Erro', 'Dados essenciais não encontrados.');
      router.back(); // Retorna à tela anterior se algum dado essencial estiver faltando
    }
  }, [doctorId, patientId, attendanceId, vitalId, symptomId]);

  // Função para lidar com a mudança de valores no formulário de nutrição e desenvolvimento
  const handleNutritionChange = (field: keyof NutritionDevelopment, value: string) => {
    setNutritionDevelopment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    try {
      const doctorIdFinal = doctorId || selectedDoctor?.id;
      const patientIdFinal = patientId || selectedPatient?.id;

      if (!doctorIdFinal || !patientIdFinal) {
        Alert.alert('Erro', 'Médico ou paciente não encontrado.');
        return;
      }

      // Criar registro de nutrição e desenvolvimento vinculado ao prontuário
      const { nutritionId, error } = await createNutrition(
        {
          ...nutritionDevelopment,
          doctor_id: doctorIdFinal,
          patient_id: patientIdFinal,
          id: uuid(), // Gera um ID único para nutrição
        },
        doctorIdFinal,
        patientIdFinal
      );

      if (error || !nutritionId) {
        throw new Error(error || 'Erro ao gerar ID de nutrição.');
      }

      // Redireciona para a próxima tela (AttendanceSummary) com todos os IDs
      router.push({
        pathname: '/attendences/AttendanceSummary',
        params: {
          attendanceId,
          doctorId: doctorIdFinal,
          patientId: patientIdFinal,
          vitalId,
          symptomId,
          nutritionId, // Certifique-se de que o nutritionId não seja null
        },
      });
    } catch (error) {
      console.error('Erro ao registrar nutrição e desenvolvimento:', error);
      Alert.alert(
        'Erro',
        'Erro ao registrar nutrição e desenvolvimento. Verifique os dados e tente novamente.'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NutritionDevelopmentForm data={nutritionDevelopment} onChange={handleNutritionChange} />
      <View style={styles.buttonContainer}>
        <Button title="Próximo" onPress={handleNextStep} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep4;
