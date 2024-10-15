// app/attendences/RegisterAttendanceStep4.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import { NutritionDevelopment } from './types';
import { uuid } from '../../utils/uuid';
import { useNutrition } from '../context/AttendanceNutritionContext';
import { useDoctor } from '../context/DoctorContext'; // Pega o médico autenticado
import { useMedicalRecords } from '../context/MedicalRecordsContext'; // Importa o contexto de MedicalRecords
import { usePatient } from '../context/PatientContext'; // Pega o paciente selecionado
import styles from '../styles/Styles';

const RegisterAttendanceStep4: React.FC = () => {
  const router = useRouter();
  const { medicalRecordId } = useLocalSearchParams<{ medicalRecordId: string }>(); // Pega o ID do prontuário (medical_record_id)
  const { createNutrition } = useNutrition();
  const { selectedDoctor } = useDoctor();
  const { selectedPatient } = usePatient();
  const { updateMedicalRecord } = useMedicalRecords(); // Importa a função updateMedicalRecord

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
    if (!selectedPatient?.id || !selectedDoctor?.id) {
      Alert.alert('Erro', 'Paciente ou médico não encontrado.');
      router.back(); // Retorna à tela anterior se não houver paciente ou médico
    }
  }, [selectedPatient, selectedDoctor]);

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
        Alert.alert('Erro', 'ID do prontuário (medicalRecordId) não encontrado.');
        return;
      }

      const doctorId = selectedDoctor?.id; // ID do médico autenticado
      const patientId = selectedPatient?.id; // ID do paciente selecionado

      if (!doctorId || !patientId) {
        Alert.alert('Erro', 'Médico ou paciente não encontrado.');
        return;
      }

      // Criar registro de nutrição e desenvolvimento vinculado ao prontuário
      const { nutritionId, error } = await createNutrition(
        {
          ...nutritionDevelopment,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(), // Gera um ID único para nutrição
        },
        doctorId,
        patientId
      );

      if (error) {
        throw new Error(error);
      }

      // Atualiza o medicalRecord com o UUID da nutrição na tabela medical_records
      const { error: updateError } = await updateMedicalRecord(medicalRecordId, {
        nutrition_id: nutritionId ?? undefined, // Inserir o ID da tabela de nutrição no prontuário
      });

      if (updateError) {
        throw new Error(updateError);
      }

      Alert.alert('Sucesso', 'Nutrição e desenvolvimento registrado com sucesso!');

      // Finaliza o registro ou redireciona para uma nova tela (resumo ou outra)
      router.push('/attendences/AttendanceSummary' as unknown as `${string}:${string}`);
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
