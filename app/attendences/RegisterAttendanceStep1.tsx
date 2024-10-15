//app/attendences/RegisterAttendanceStep1.tsx

//app/attendences/RegisterAttendanceStep1.tsx

import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import { BasicInfo } from './types';
import { uuid } from '../../utils/uuid'; // Para gerar o UUID
import { useAttendance } from '../context/AttendanceContext'; // Importando o contexto de Atendimentos
import { useDoctor } from '../context/DoctorContext'; // Importando o contexto de Doutores
import { useMedicalRecords } from '../context/MedicalRecordsContext'; // Importando o contexto de Prontuários
import { usePatient } from '../context/PatientContext'; // Importando o contexto de Pacientes
import styles from '../styles/Styles';

const RegisterAttendanceStep1: React.FC = () => {
  const router = useRouter();
  const { createAttendance } = useAttendance(); // Função para criar atendimento no banco de dados
  const { selectedDoctor } = useDoctor(); // Pegando o médico selecionado
  const { selectedPatient } = usePatient(); // Pegando o paciente selecionado
  const { createMedicalRecord } = useMedicalRecords(); // Função para criar prontuário

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
      const doctorId = selectedDoctor?.id;
      const patientId = selectedPatient?.id;

      if (!doctorId || !patientId) {
        Alert.alert('Erro', 'Médico ou paciente não encontrado.');
        return;
      }

      // Gerar o UUID para o atendimento
      const attendanceId = uuid();

      // Salvar os dados do atendimento no banco de dados
      const response = await createAttendance(
        {
          id: attendanceId,
          motivo_consulta: basicInfo.motivo_consulta,
          hipertensao: basicInfo.hipertensao,
          diabetes: basicInfo.diabetes,
          doenca_hepatica: basicInfo.doenca_hepatica,
          deficiencia_g6pd: basicInfo.deficiencia_g6pd,
        },
        doctorId,
        patientId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Criar o registro médico associado ao atendimento
      const medicalRecordResponse = await createMedicalRecord(
        attendanceId,
        '', // vitalId será preenchido nos steps seguintes
        '', // symptomId será preenchido nos steps seguintes
        '', // nutritionId será preenchido nos steps seguintes
        doctorId,
        patientId
      );

      if (medicalRecordResponse.error) {
        throw new Error(medicalRecordResponse.error);
      }

      // Exibir mensagem de sucesso e navegar para o próximo passo
      Alert.alert('Sucesso', 'Prontuário criado com sucesso!');

      // Navega para o Step 2, passando o attendanceId e medicalRecordId
      router.push({
        pathname: '/attendences/RegisterAttendanceStep2',
        params: { attendanceId, medicalRecordId: medicalRecordResponse.medicalRecordId ?? '' },
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
