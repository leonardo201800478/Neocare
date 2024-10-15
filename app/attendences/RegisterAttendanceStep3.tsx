// app/attendences/RegisterAttendanceStep3.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import GeneralSymptomsForm from './GeneralSymptomsForm';
import { GeneralSymptoms } from './types';
import { uuid } from '../../utils/uuid';
import { useAttendanceSymptom } from '../context/AttendanceSymptomContext';
import { useDoctor } from '../context/DoctorContext'; // Pega o médico autenticado
import { useMedicalRecords } from '../context/MedicalRecordsContext'; // Função para atualizar o prontuário
import { usePatient } from '../context/PatientContext'; // Pega o paciente selecionado
import styles from '../styles/Styles';

const RegisterAttendanceStep3: React.FC = () => {
  const router = useRouter();
  const { attendanceId, medicalRecordId } = useLocalSearchParams<{
    attendanceId: string;
    medicalRecordId: string;
  }>();
  const { createSymptom } = useAttendanceSymptom();
  const { selectedDoctor } = useDoctor();
  const { selectedPatient } = usePatient();
  const { updateMedicalRecord } = useMedicalRecords(); // Função para atualizar o prontuário

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

  // Verificar se o paciente e o médico foram selecionados corretamente
  useEffect(() => {
    if (!selectedPatient?.id || !selectedDoctor?.id) {
      Alert.alert('Erro', 'Paciente ou médico não encontrado.');
      router.back(); // Retorna à tela anterior se não houver paciente ou médico
    }
  }, [selectedPatient, selectedDoctor]);

  // Função para lidar com a mudança de valores no formulário de sintomas gerais
  const handleGeneralSymptomsChange = (field: keyof GeneralSymptoms, value: string) => {
    setGeneralSymptoms((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    try {
      if (!attendanceId || !medicalRecordId) {
        Alert.alert('Erro', 'ID do atendimento ou prontuário não encontrado.');
        return;
      }

      const doctorId = selectedDoctor?.id; // Pega o ID do médico autenticado
      const patientId = selectedPatient?.id; // Pega o ID do paciente selecionado

      if (!doctorId || !patientId) {
        Alert.alert('Erro', 'Médico ou paciente não encontrado.');
        return;
      }

      // Gerar o UUID para os sintomas
      const symptomId = uuid();

      // Criar os sintomas gerais no prontuário
      const response = await createSymptom(
        {
          ...generalSymptoms,
          doctor_id: doctorId,
          patient_id: patientId,
          id: symptomId,
        },
        doctorId,
        patientId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Atualiza o medicalRecord com o UUID dos sintomas na tabela medical_records
      const { error: updateError } = await updateMedicalRecord(medicalRecordId, {
        symptom_id: symptomId, // Inserir o ID dos sintomas no prontuário
      });

      if (updateError) {
        throw new Error(updateError);
      }

      Alert.alert('Sucesso', 'Sintomas registrados com sucesso!');

      // Navegar para a próxima etapa (por exemplo, nutrição e desenvolvimento)
      router.push({
        pathname: '/attendences/RegisterAttendanceStep4',
        params: { attendanceId, medicalRecordId },
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
