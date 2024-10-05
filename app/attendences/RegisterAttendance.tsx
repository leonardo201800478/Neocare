import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View, Button, Alert, Text } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import GeneralSymptomsForm from './GeneralSymptomsForm';
import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import VitalInfoForm from './VitalInfoForm';
import { BasicInfo, VitalInfo, GeneralSymptoms, NutritionDevelopment } from './types';
import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/Styles';

const RegisterAttendance: React.FC = () => {
  const { supabaseConnector } = useSystem();
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();

  // Definindo os estados com valores iniciais corretos
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: '',
    consulta_retorno: '',
    primeira_consulta: '',
    data_atendimento: '',
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
      // Inserir dados de `attendances`
      const { data: attendanceData, error: attendanceError } = await supabaseConnector.client
        .from('attendances')
        .insert({
          ...basicInfo,
          patient_id: patientId, // Incluindo o patient_id na inserção
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select();

      if (attendanceError) throw attendanceError;

      const attendanceId = attendanceData[0].id;

      // Inserir dados de `attendance_vitals`
      const vitalsData = {
        attendance_id: attendanceId,
        ...vitalInfo,
      };

      const { error: vitalsError } = await supabaseConnector.client
        .from('attendance_vitals')
        .insert(vitalsData);

      if (vitalsError) throw vitalsError;

      // Inserir dados de `attendance_symptoms`
      const symptomsData = {
        attendance_id: attendanceId,
        ...generalSymptoms,
      };

      const { error: symptomsError } = await supabaseConnector.client
        .from('attendance_symptoms')
        .insert(symptomsData);

      if (symptomsError) throw symptomsError;

      // Inserir dados de `attendance_nutrition_development`
      const nutritionDevelopmentData = {
        attendance_id: attendanceId,
        ...nutritionDevelopment,
      };

      const { error: nutritionError } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .insert(nutritionDevelopmentData);

      if (nutritionError) throw nutritionError;

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
      // Redirecionar para a tela de detalhes do paciente após salvar
      router.replace(
        `/patients/PacienteDetails?patient=${encodeURIComponent(JSON.stringify({ id: patientId }))}`
      );
    } catch (error) {
      Alert.alert('Erro', `Erro ao salvar prontuário: ${(error as any).message}`);
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
