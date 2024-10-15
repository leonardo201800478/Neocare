// app/attendences/RegisterAttendanceStep2.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView } from 'react-native';

import VitalInfoForm from './VitalInfoForm';
import { VitalInfo } from './types';
import { uuid } from '../../utils/uuid';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext'; // Importa o contexto de MedicalRecords
import { usePatient } from '../context/PatientContext';
import styles from '../styles/Styles';

const RegisterAttendanceStep2: React.FC = () => {
  const router = useRouter();
  const { attendanceId, medicalRecordId } = useLocalSearchParams<{
    attendanceId: string;
    medicalRecordId: string;
  }>(); // Pega o ID do atendimento e o ID do prontuário da rota
  const { createVitalSigns } = useAttendanceVital(); // Função para criar sinais vitais
  const { selectedDoctor } = useDoctor(); // Obtém o médico autenticado
  const { selectedPatient } = usePatient(); // Obtém o paciente selecionado
  const { updateMedicalRecord } = useMedicalRecords(); // Importa a função updateMedicalRecord

  // Estado para armazenar os dados dos sinais vitais
  const [vitalInfo, setVitalInfo] = useState<VitalInfo>({
    peso_kg: '',
    comprimento_cm: '',
    perimetro_cefalico_cm: '',
    numero_respiracoes_por_minuto: '',
  });

  // Verifica se o paciente e o médico estão definidos
  useEffect(() => {
    if (!selectedPatient?.id || !selectedDoctor?.id) {
      Alert.alert('Erro', 'Paciente ou médico não encontrado.');
      router.back(); // Retorna à tela anterior se não houver paciente ou médico
    }
  }, [selectedPatient, selectedDoctor]);

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
      const doctorId = selectedDoctor?.id; // ID do médico autenticado
      const patientId = selectedPatient?.id; // ID do paciente selecionado

      if (!doctorId || !patientId || !medicalRecordId) {
        Alert.alert('Erro', 'Médico, paciente ou prontuário não encontrado.');
        return;
      }

      // Criar os sinais vitais no banco de dados
      const response = await createVitalSigns(
        {
          ...vitalInfo,
          id: uuid(),
        },
        doctorId,
        patientId
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Atualiza o medicalRecord com o UUID dos sinais vitais na tabela medical_records
      const { error: updateError } = await updateMedicalRecord(medicalRecordId, {
        vital_id: response.vitalId ?? undefined, // Inserir o ID da tabela de sinais vitais no prontuário
      });

      if (updateError) {
        throw new Error(updateError);
      }

      Alert.alert('Sucesso', 'Sinais vitais registrados com sucesso!');

      // Navegar para a próxima etapa (por exemplo, a tela de sintomas gerais)
      router.push({
        pathname: '/attendences/RegisterAttendanceStep3',
        params: {
          vitalId: response.vitalId || '',
          doctorId: doctorId || '',
          patientId: patientId || '',
        }, // Passa os parâmetros corretos
      });
    } catch (error) {
      console.error('Erro ao registrar sinais vitais:', error);
      Alert.alert('Erro', 'Erro ao registrar sinais vitais. Verifique os dados e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VitalInfoForm
        data={vitalInfo}
        onChange={handleVitalInfoChange}
        attendanceId={attendanceId || ''} // Certifique-se de passar o attendanceId
        doctorId={selectedDoctor?.id || ''}
        patientId={selectedPatient?.id || ''}
      />
      <View style={styles.buttonContainer}>
        <Button title="Próximo" onPress={handleNextStep} />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendanceStep2;
