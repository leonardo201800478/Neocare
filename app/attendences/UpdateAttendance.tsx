// app/attendences/UpdateAttendance.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Button, Alert, Text, ActivityIndicator, StyleSheet } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import GeneralSymptomsForm from './GeneralSymptomsForm';
import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import VitalInfoForm from './VitalInfoForm';
import { BasicInfo, VitalInfo, GeneralSymptoms, NutritionDevelopment } from './types';
import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/Styles';

const UpdateAttendance: React.FC = () => {
  const { supabaseConnector } = useSystem();
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();

  const [attendanceId, setAttendanceId] = useState<string | null>(null);
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

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!patientId) {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
      router.back();
      return;
    }

    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        // Buscar se existe um prontuário para o paciente
        const { data, error } = await supabaseConnector.client
          .from('attendances')
          .select('*')
          .eq('patient_id', patientId)
          .order('updated_at', { ascending: false }) // Buscar a consulta mais recente
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          // Se existir um prontuário, setar os dados para atualização
          setAttendanceId(data.id);
          setBasicInfo(data);

          // Fetch `attendance_vitals`
          const { data: vitalData, error: vitalError } = await supabaseConnector.client
            .from('attendance_vitals')
            .select('*')
            .eq('attendance_id', data.id)
            .single();

          if (vitalError && vitalError.code !== 'PGRST116') {
            throw vitalError;
          }

          if (vitalData) {
            setVitalInfo(vitalData);
          }

          // Fetch `attendance_symptoms`
          const { data: symptomsData, error: symptomsError } = await supabaseConnector.client
            .from('attendance_symptoms')
            .select('*')
            .eq('attendance_id', data.id)
            .single();

          if (symptomsError && symptomsError.code !== 'PGRST116') {
            throw symptomsError;
          }

          if (symptomsData) {
            setGeneralSymptoms(symptomsData);
          }

          // Fetch `attendance_nutrition_development`
          const { data: nutritionData, error: nutritionError } = await supabaseConnector.client
            .from('attendance_nutrition_development')
            .select('*')
            .eq('attendance_id', data.id)
            .single();

          if (nutritionError && nutritionError.code !== 'PGRST116') {
            throw nutritionError;
          }

          if (nutritionData) {
            setNutritionDevelopment(nutritionData);
          }
        } else {
          // Se não existir um prontuário, configurar como novo registro
          setAttendanceId(null);
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar os dados do prontuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [patientId]);

  const handleSaveAttendance = async () => {
    if (!patientId) {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
      return;
    }

    setLoading(true);
    try {
      if (attendanceId) {
        // Atualizar `attendances` se já existe um registro
        const { error: attendanceError } = await supabaseConnector.client
          .from('attendances')
          .update(basicInfo)
          .eq('id', attendanceId);

        if (attendanceError) throw attendanceError;

        // Atualizar os registros das outras tabelas
        await updateOtherTables();
      } else {
        // Criar novo registro de `attendances` se não existe
        const { data: newAttendance, error: attendanceError } = await supabaseConnector.client
          .from('attendances')
          .insert({
            ...basicInfo,
            patient_id: patientId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (attendanceError) throw attendanceError;

        setAttendanceId(newAttendance.id);

        // Inserir dados nas outras tabelas relacionadas
        await updateOtherTables(newAttendance.id);
      }

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
      router.replace(
        `/patients/PacienteDetails?patient=${encodeURIComponent(JSON.stringify({ id: patientId }))}`
      );
    } catch (error) {
      Alert.alert('Erro', `Erro ao salvar prontuário: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateOtherTables = async (attendanceIdParam?: string) => {
    const id = attendanceIdParam || attendanceId;

    if (!id) {
      throw new Error('ID do prontuário não encontrado.');
    }

    // Update `attendance_vitals`
    const { error: vitalsError } = await supabaseConnector.client
      .from('attendance_vitals')
      .upsert({ attendance_id: id, ...vitalInfo })
      .eq('attendance_id', id);

    if (vitalsError) throw vitalsError;

    // Update `attendance_symptoms`
    const { error: symptomsError } = await supabaseConnector.client
      .from('attendance_symptoms')
      .upsert({ attendance_id: id, ...generalSymptoms })
      .eq('attendance_id', id);

    if (symptomsError) throw symptomsError;

    // Update `attendance_nutrition_development`
    const { error: nutritionError } = await supabaseConnector.client
      .from('attendance_nutrition_development')
      .upsert({ attendance_id: id, ...nutritionDevelopment })
      .eq('attendance_id', id);

    if (nutritionError) throw nutritionError;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005F9E" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BasicInfoForm
        data={basicInfo}
        onChange={(field, value) => setBasicInfo((prev) => ({ ...prev, [field]: value }))}
      />
      <VitalInfoForm
        data={vitalInfo}
        onChange={(field, value) => setVitalInfo((prev) => ({ ...prev, [field]: value }))}
      />
      <GeneralSymptomsForm
        data={generalSymptoms}
        onChange={(field, value) => setGeneralSymptoms((prev) => ({ ...prev, [field]: value }))}
      />
      <NutritionDevelopmentForm
        data={nutritionDevelopment}
        onChange={(field, value) =>
          setNutritionDevelopment((prev) => ({ ...prev, [field]: value }))
        }
      />

      <View style={styles.buttonContainer}>
        <Button title="Salvar Prontuário" onPress={handleSaveAttendance} />
      </View>
    </ScrollView>
  );
};

export default UpdateAttendance;
