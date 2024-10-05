import React, { useState } from 'react';
import { View, ScrollView, Button, Alert } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import GeneralSymptomsForm from './GeneralSymptomsForm';
import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import { BasicInfo, GeneralSymptoms, NutritionDevelopment } from './types'; // Importando os tipos
import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/Styles';

const RegisterAttendance: React.FC = () => {
  const { supabaseConnector } = useSystem();

  // Inicializando o estado com objetos que seguem a estrutura das interfaces
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: undefined,
    consulta_retorno: undefined,
    primeira_consulta: undefined,
    data_atendimento: undefined,
    peso_kg: '',
    comprimento_cm: '',
    perimetro_cefalico_cm: '',
    numero_respiracoes_por_minuto: '',
  });

  const [generalSymptoms, setGeneralSymptoms] = useState<GeneralSymptoms>({
    tosse_ha_quanto_tempo: undefined,
    numero_respiracoes_por_minuto: undefined,
    respiracao_rapida: undefined,
    tiragem_subcostal: undefined,
    estridor: undefined,
    sibilancia_ha_quanto_tempo: undefined,
    primeira_crise: undefined,
    broncodilatador: undefined,
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

  const [saving, setSaving] = useState(false);

  const handleBasicInfoChange = (field: keyof BasicInfo, value: string | undefined) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleGeneralSymptomsChange = (field: keyof GeneralSymptoms, value: string | undefined) => {
    setGeneralSymptoms((prev) => ({ ...prev, [field]: value }));
  };

  const handleNutritionDevelopmentChange = (
    field: keyof NutritionDevelopment,
    value: string | undefined
  ) => {
    setNutritionDevelopment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      // Inserir dados de attendances
      const { data: attendance, error: attendanceError } = await supabaseConnector.client
        .from('attendances')
        .insert({
          ...basicInfo,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select();

      if (attendanceError) throw attendanceError;

      const attendanceId = attendance[0].id;

      // Inserir dados de attendance_vitals
      const vitalsData = {
        attendance_id: attendanceId,
        peso_kg: basicInfo.peso_kg,
        comprimento_cm: basicInfo.comprimento_cm,
        perimetro_cefalico_cm: basicInfo.perimetro_cefalico_cm,
        numero_respiracoes_por_minuto: basicInfo.numero_respiracoes_por_minuto,
      };

      const { error: vitalsError } = await supabaseConnector.client
        .from('attendance_vitals')
        .insert(vitalsData);

      if (vitalsError) throw vitalsError;

      // Inserir dados de attendance_symptoms
      const symptomsData = { attendance_id: attendanceId, ...generalSymptoms };

      const { error: symptomsError } = await supabaseConnector.client
        .from('attendance_symptoms')
        .insert(symptomsData);

      if (symptomsError) throw symptomsError;

      // Inserir dados de attendance_nutrition_development
      const nutritionDevelopmentData = { attendance_id: attendanceId, ...nutritionDevelopment };

      const { error: nutritionError } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .insert(nutritionDevelopmentData);

      if (nutritionError) throw nutritionError;

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar prontuário: ' + (error as any).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BasicInfoForm data={basicInfo} onChange={handleBasicInfoChange} />
      <GeneralSymptomsForm data={generalSymptoms} onChange={handleGeneralSymptomsChange} />
      <NutritionDevelopmentForm
        data={nutritionDevelopment}
        onChange={handleNutritionDevelopmentChange}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Salvar Prontuário"
          onPress={handleSaveAttendance}
          disabled={saving}
          color="#4CAF50"
        />
      </View>
    </ScrollView>
  );
};

export default RegisterAttendance;
