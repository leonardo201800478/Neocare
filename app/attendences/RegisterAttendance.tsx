// app/attendences/RegisterAttendance.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import styles from '../styles/Styles';

const RegisterAttendance: React.FC = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();

  const { createAttendance } = useAttendance();
  const { createVitalSigns } = useAttendanceVital();
  const { createSymptom } = useAttendanceSymptom();
  const { createNutritionDevelopment } = useAttendanceNutritionDevelopment();

  // Definindo os estados com valores iniciais corretos
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: '',
    consulta_retorno: '',
    primeira_consulta: '',
    alergias: '',
    medicamentos: '',
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

  // As funções onChange que atualizam os estados
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

    try {
      // Criar o registro de atendimento (prontuário)
      const attendanceId = uuid();
      await createAttendance(
        { ...basicInfo, id: attendanceId },
        'doctorId',
        patientId,
        'additionalArg1',
        'additionalArg2'
      );

      // Criar os sinais vitais associados ao atendimento
      await createVitalSigns({ ...vitalInfo, id: uuid() }, attendanceId);

      // Criar os sintomas gerais associados ao atendimento
      await createSymptom({ ...generalSymptoms, id: uuid() }, attendanceId);

      // Criar o registro de nutrição e desenvolvimento associado ao atendimento
      await createNutritionDevelopment({ ...nutritionDevelopment, id: uuid() }, attendanceId);

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
      // Redirecionar para a tela de detalhes do paciente após salvar
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
          <GeneralSymptomsForm data={generalSymptoms} onChange={handleGeneralSymptomsChange} />
          <NutritionDevelopmentForm
            data={nutritionDevelopment}
            onChange={handleNutritionDevelopmentChange}
          />

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
