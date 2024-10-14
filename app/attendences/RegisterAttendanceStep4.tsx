// app/attendences/RegisterAttendanceStep4.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import { NutritionDevelopment } from './types';
import { uuid } from '../../utils/uuid';
import { useNutrition } from '../context/AttendanceNutritionContext';
import styles from '../styles/Styles';

const RegisterAttendanceStep4: React.FC = () => {
  const router = useRouter();
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();
  const { createNutrition } = useNutrition();

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

  // Função para lidar com a mudança de valores no formulário de nutrição e desenvolvimento
  const handleNutritionChange = (field: keyof NutritionDevelopment, value: string) => {
    setNutritionDevelopment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!attendanceId) {
        Alert.alert('Erro', 'ID do prontuário não encontrado.');
        return;
      }

      const doctorId = 'sample-doctor-id'; // Substitua pelo ID real do médico autenticado
      const patientId = 'sample-patient-id'; // Substitua pelo ID real do paciente

      // Criar registro de nutrição e desenvolvimento
      await createNutrition(
        {
          ...nutritionDevelopment,
          attendance_id: attendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        attendanceId
      );

      Alert.alert('Sucesso', 'Nutrição e desenvolvimento registrado com sucesso!');

      // Finaliza o registro ou redireciona para uma nova tela
      router.push('/attendences/AttendanceSummary' as unknown as `${string}:${string}`); // Substitua por onde o fluxo deve ir
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
        <Button title="Concluir Registro" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep4;
