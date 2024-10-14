// app/attendences/RegisterAttendance.tsx
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View, Button, Alert, Text } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import GeneralSymptomsForm from './GeneralSymptomsForm';
import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import VitalInfoForm from './VitalInfoForm';
import { BasicInfo, VitalInfo, GeneralSymptoms, NutritionDevelopment } from './types';
import { uuid } from '../../utils/uuid';
import { useAttendance } from '../context/AttendanceContext';
import { useAttendanceNutritionDevelopment } from '../context/AttendanceNutritionDevelopmentContext';
import { useAttendanceSymptom } from '../context/AttendanceSymptomContext';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import styles from '../styles/Styles';

const RegisterAttendance: React.FC = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();

  const { createAttendance } = useAttendance();
  const { createVitalSigns } = useAttendanceVital();
  const { createSymptom } = useAttendanceSymptom();
  const { createNutritionDevelopment } = useAttendanceNutritionDevelopment();
  const { selectedDoctor } = useDoctor();

  const doctorId = selectedDoctor?.id;

  // Definir valores padrão para os campos
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: '',
    consulta_retorno: 'no', // Valor default
    primeira_consulta: 'no', // Valor default
    hipertensao: 'no', // Valor default
    diabetes: 'no', // Valor default
    doenca_hepatica: 'no', // Valor default
    deficiencia_g6pd: 'no', // Valor default
  });

  const [vitalInfo, setVitalInfo] = useState<VitalInfo>({
    peso_kg: '0', // Valor default
    comprimento_cm: '0', // Valor default
    perimetro_cefalico_cm: '0', // Valor default
    numero_respiracoes_por_minuto: '0', // Valor default
  });

  const [generalSymptoms, setGeneralSymptoms] = useState<GeneralSymptoms>({
    nao_bebe_ou_mama: 'no', // Valor default
    vomita_tudo: 'no', // Valor default
    convulsoes: 'no', // Valor default
    letargica: 'no', // Valor default
    enchimento_capilar: 'no', // Valor default
    batimento_asa: 'no', // Valor default
    tem_tosse: 'no', // Valor default
    sibilancia: 'no', // Valor default
    tem_diarreia: 'no', // Valor default
    tem_febre: 'no', // Valor default
    rigidez_nuca: 'no', // Valor default
    problema_ouvido: 'no', // Valor default
    dor_garganta: 'no', // Valor default
    gemido: 'no', // Valor default
    cianose_periferica: 'no', // Valor default
    ictericia: 'no', // Valor default
    distensao_abdominal: 'no', // Valor default
    emagrecimento: 'no', // Valor default
    edema: 'no', // Valor default
  });

  const [nutritionDevelopment, setNutritionDevelopment] = useState<NutritionDevelopment>({
    amamentando: 'no', // Valor default
    quantas_vezes_amamenta: '0', // Valor default
    amamenta_noite: 'no', // Valor default
    alimentos_liquidos: 'no', // Valor default
    quantidade_refeicoes: '0', // Valor default
    tipo_alimentacao: '', // Valor default
    mudou_alimentacao: 'no', // Valor default
    como_mudou_alimentacao: '', // Valor default
    perda_peso_primeira_semana: 'no', // Valor default
    tendencia_crescimento: '', // Valor default
    habilidades_desenvolvimento: '', // Valor default
    atividade_fisica_vezes_semana: '0', // Valor default
    tempo_atividade_fisica: '0', // Valor default
    tempo_sedentario: '0', // Valor default
    avaliacao_violencia: '', // Valor default
    outros_problemas: '', // Valor default
  });

  // Funções onChange para atualizar os estados
  const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleVitalInfoChange = (field: keyof VitalInfo, value: string) => {
    setVitalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleGeneralSymptomsChange = (field: keyof GeneralSymptoms, value: string) => {
    setGeneralSymptoms((prev) => ({ ...prev, [field]: value }));
  };

  const handleNutritionDevelopmentChange = (field: keyof NutritionDevelopment, value: string) => {
    setNutritionDevelopment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAttendance = async () => {
    if (!patientId) {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
      return;
    }

    if (!doctorId) {
      Alert.alert('Erro', 'ID do médico não encontrado.');
      return;
    }

    try {
      // Criar o registro de atendimento (prontuário)
      const attendanceId = uuid();
      await createAttendance({ ...basicInfo, id: attendanceId }, doctorId, patientId);

      // Criar os sinais vitais associados ao atendimento
      await createVitalSigns(
        {
          ...vitalInfo,
          attendance_id: attendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        attendanceId
      );

      // Criar os sintomas gerais associados ao atendimento
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

      // Criar o registro de nutrição e desenvolvimento associado ao atendimento
      await createNutritionDevelopment(
        {
          ...nutritionDevelopment,
          attendance_id: attendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        attendanceId
      );

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
      router.push(
        `/(tabs)/patients/PacienteDetails:${encodeURIComponent(JSON.stringify({ id: patientId }))}`
      );
    } catch (error) {
      console.error('Erro ao salvar prontuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o prontuário. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {patientId ? (
        <>
          <BasicInfoForm data={basicInfo} onChange={handleBasicInfoChange} />
          <VitalInfoForm data={vitalInfo} onChange={handleVitalInfoChange} />
          <NutritionDevelopmentForm
            data={nutritionDevelopment}
            onChange={handleNutritionDevelopmentChange}
          />
          <GeneralSymptomsForm data={generalSymptoms} onChange={handleGeneralSymptomsChange} />
          <View style={styles.buttonContainer}>
            <Button title="Salvar Prontuário" onPress={handleSaveAttendance} />
          </View>
        </>
      ) : (
        <View>
          <Text>Erro: ID do paciente não encontrado.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterAttendance;
