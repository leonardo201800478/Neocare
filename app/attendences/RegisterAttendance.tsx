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

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: '',
    consulta_retorno: '',
    primeira_consulta: '',
    hipertensao: '',
    diabetes: '',
    doenca_hepatica: '',
    deficiencia_g6pd: '',
  });

  const [vitalInfo, setVitalInfo] = useState<VitalInfo>({
    peso_kg: '',
    comprimento_cm: '',
    perimetro_cefalico_cm: '',
    numero_respiracoes_por_minuto: '',
  });

  const [generalSymptoms, setGeneralSymptoms] = useState<GeneralSymptoms>({
    nao_bebe_ou_mama: '',
    vomita_tudo: '',
    convulsoes: '',
    letargica: '',
    enchimento_capilar: '',
    batimento_asa: '',
    tem_tosse: '',
    sibilancia: '',
    tem_diarreia: '',
    tem_febre: '',
    rigidez_nuca: '',
    problema_ouvido: '',
    dor_garganta: '',
    gemido: '',
    cianose_periferica: '',
    ictericia: '',
    distensao_abdominal: '',
    emagrecimento: '',
    edema: '',
  });

  const [nutritionDevelopment, setNutritionDevelopment] = useState<NutritionDevelopment>({
    amamentando: '',
    quantas_vezes_amamenta: '',
    amamenta_noite: '',
    alimentos_liquidos: '',
    quantidade_refeicoes: '',
    tipo_alimentacao: '',
    mudou_alimentacao: '',
    como_mudou_alimentacao: '',
    perda_peso_primeira_semana: '',
    tendencia_crescimento: '',
    habilidades_desenvolvimento: '',
    atividade_fisica_vezes_semana: '',
    tempo_atividade_fisica: '',
    tempo_sedentario: '',
    avaliacao_violencia: '',
    outros_problemas: '',
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
      await createVitalSigns({ ...vitalInfo, attendance_id: attendanceId, id: uuid() }, doctorId);

      // Criar os sintomas gerais associados ao atendimento
      await createSymptom(
        { ...generalSymptoms, attendance_id: attendanceId, id: uuid() },
        doctorId
      );

      // Criar o registro de nutrição e desenvolvimento associado ao atendimento
      await createNutritionDevelopment(
        {
          ...nutritionDevelopment,
          attendance_id: attendanceId,
          id: uuid(),
        },
        doctorId
      );

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
      router.replace(
        `/patients/PacienteDetails:${encodeURIComponent(JSON.stringify({ id: patientId }))}`
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
