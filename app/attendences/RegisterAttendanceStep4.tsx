// app/attendences/RegisterAttendanceStep4.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import { NutritionDevelopment } from './types';
import { uuid } from '../../utils/uuid';
import { useNutrition } from '../context/AttendanceNutritionContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { usePatient } from '../context/PatientContext';
import styles from '../styles/Styles';

const RegisterAttendanceStep4: React.FC = () => {
  const router = useRouter();
  const { attendanceId, doctorId, patientId, vitalId, symptomId, medicalRecordId } =
    useLocalSearchParams<{
      attendanceId: string;
      doctorId: string;
      patientId: string;
      vitalId: string;
      symptomId: string;
      medicalRecordId: string;
    }>();

  const { createNutrition } = useNutrition();
  const { selectedDoctor } = useDoctor();
  const { selectedPatient } = usePatient();
  const { updateMedicalRecord } = useMedicalRecords();

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

  const handleSubmit = async () => {
    try {
      if (!medicalRecordId) {
        Alert.alert('Erro', 'ID do prontuário não encontrado.');
        return;
      }

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

      if (error) {
        throw new Error(error);
      }

      // Garante que o nutritionId seja uma string válida
      const validNutritionId = nutritionId ?? ''; // Se nutritionId for null, usa uma string vazia

      // Atualiza o medicalRecord com o UUID da nutrição
      const { error: updateError } = await updateMedicalRecord(medicalRecordId, {
        nutrition_id: validNutritionId,
      });

      if (updateError) {
        throw new Error(updateError);
      }

      Alert.alert('Sucesso', 'Nutrição e desenvolvimento registrado com sucesso!');

      // Redireciona para a próxima tela (AttendanceSummary) com todos os IDs
      router.push({
        pathname: '/attendences/AttendanceSummary',
        params: {
          attendanceId,
          doctorId: doctorIdFinal,
          patientId: patientIdFinal,
          vitalId,
          symptomId,
          nutritionId: validNutritionId,
          medicalRecordId,
        }, // Passa todos os IDs necessários para a próxima tela
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
        <Button title="Concluir Registro" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep4;
