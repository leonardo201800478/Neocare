import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Button, Alert, Text, TouchableOpacity } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import GeneralSymptomsForm from './GeneralSymptomsForm';
import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import VitalInfoForm from './VitalInfoForm';
import { BasicInfo, VitalInfo, GeneralSymptoms, NutritionDevelopment } from './types';
import { uuid } from '../../utils/uuid';
import { useAttendance } from '../context/AttendanceContext';
import { useNutrition } from '../context/AttendanceNutritionContext';
import { useAttendanceSymptom } from '../context/AttendanceSymptomContext';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import styles from '../styles/Styles';

const RegisterAttendance: React.FC = () => {
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();

  const { createAttendance, fetchAttendanceByPatient } = useAttendance();
  const { createVitalSigns, fetchVitalsByAttendance } = useAttendanceVital();
  const { createSymptom, fetchSymptomsByAttendanceId } = useAttendanceSymptom();
  const { createNutrition, fetchNutritionByAttendance } = useNutrition();
  const { selectedDoctor } = useDoctor();

  const doctorId = selectedDoctor?.id;
  const [attendanceId, setAttendanceId] = useState<string | null>(null);

  // Estados para os dados dos formulários
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    motivo_consulta: '',
    consulta_retorno: 'no',
    primeira_consulta: 'no',
    hipertensao: 'no',
    diabetes: 'no',
    doenca_hepatica: 'no',
    deficiencia_g6pd: 'no',
  });

  const [vitalInfo, setVitalInfo] = useState<VitalInfo>({
    peso_kg: '',
    comprimento_cm: '',
    perimetro_cefalico_cm: '',
    numero_respiracoes_por_minuto: '',
  });

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

  useEffect(() => {
    const fetchExistingAttendance = async () => {
      if (!patientId) return;

      try {
        const existingAttendance = await fetchAttendanceByPatient(patientId);
        if (existingAttendance) {
          setAttendanceId(existingAttendance.id);
          setBasicInfo({
            motivo_consulta: existingAttendance.motivo_consulta ?? '',
            consulta_retorno: existingAttendance.consulta_retorno ?? '',
            primeira_consulta: existingAttendance.primeira_consulta ?? '',
            hipertensao: existingAttendance.hipertensao ?? '',
            diabetes: existingAttendance.diabetes ?? '',
            doenca_hepatica: existingAttendance.doenca_hepatica ?? '',
            deficiencia_g6pd: existingAttendance.deficiencia_g6pd ?? '',
          });

          const existingVitals = await fetchVitalsByAttendance(existingAttendance.id);
          if (existingVitals) {
            setVitalInfo({
              peso_kg: existingVitals.peso_kg ?? '',
              comprimento_cm: existingVitals.comprimento_cm ?? '',
              perimetro_cefalico_cm: existingVitals.perimetro_cefalico_cm ?? '',
              numero_respiracoes_por_minuto: existingVitals.numero_respiracoes_por_minuto ?? '',
            });
          }

          const existingSymptoms = await fetchSymptomsByAttendanceId(existingAttendance.id);
          if (existingSymptoms) {
            setGeneralSymptoms({
              nao_bebe_ou_mama: existingSymptoms.nao_bebe_ou_mama ?? '',
              vomita_tudo: existingSymptoms.vomita_tudo ?? '',
              convulsoes: existingSymptoms.convulsoes ?? '',
              letargica: existingSymptoms.letargica ?? '',
              enchimento_capilar: existingSymptoms.enchimento_capilar ?? '',
              batimento_asa: existingSymptoms.batimento_asa ?? '',
              tem_tosse: existingSymptoms.tem_tosse ?? '',
              sibilancia: existingSymptoms.sibilancia ?? '',
              tem_diarreia: existingSymptoms.tem_diarreia ?? '',
              tem_febre: existingSymptoms.tem_febre ?? '',
              rigidez_nuca: existingSymptoms.rigidez_nuca ?? '',
              problema_ouvido: existingSymptoms.problema_ouvido ?? '',
              dor_garganta: existingSymptoms.dor_garganta ?? '',
              gemido: existingSymptoms.gemido ?? '',
              cianose_periferica: existingSymptoms.cianose_periferica ?? '',
              ictericia: existingSymptoms.ictericia ?? '',
              distensao_abdominal: existingSymptoms.distensao_abdominal ?? '',
              emagrecimento: existingSymptoms.emagrecimento ?? '',
              edema: existingSymptoms.edema ?? '',
            });
          }

          const existingNutrition = await fetchNutritionByAttendance(existingAttendance.id);
          if (existingNutrition && existingNutrition.length > 0) {
            const nutrition = existingNutrition[0];
            setNutritionDevelopment({
              amamentando: nutrition.amamentando ?? '',
              quantas_vezes_amamenta: nutrition.quantas_vezes_amamenta ?? '',
              amamenta_noite: nutrition.amamenta_noite ?? '',
              alimentos_liquidos: nutrition.alimentos_liquidos ?? '',
              quantidade_refeicoes: nutrition.quantidade_refeicoes ?? '',
              tipo_alimentacao: nutrition.tipo_alimentacao ?? '',
              mudou_alimentacao: nutrition.mudou_alimentacao ?? '',
              como_mudou_alimentacao: nutrition.como_mudou_alimentacao ?? '',
              perda_peso_primeira_semana: nutrition.perda_peso_primeira_semana ?? '',
              tendencia_crescimento: nutrition.tendencia_crescimento ?? '',
              habilidades_desenvolvimento: nutrition.habilidades_desenvolvimento ?? '',
              atividade_fisica_vezes_semana: nutrition.atividade_fisica_vezes_semana ?? '',
              tempo_atividade_fisica: nutrition.tempo_atividade_fisica ?? '',
              tempo_sedentario: nutrition.tempo_sedentario ?? '',
              avaliacao_violencia: nutrition.avaliacao_violencia ?? '',
              outros_problemas: nutrition.outros_problemas ?? '',
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados existentes:', error);
      }
    };

    fetchExistingAttendance();
  }, [patientId]);

  // Funções de alteração de estado dos formulários
  const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVitalInfoChange = (field: keyof VitalInfo, value: string) => {
    setVitalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGeneralSymptomsChange = (field: keyof GeneralSymptoms, value: string) => {
    setGeneralSymptoms((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNutritionChange = (field: keyof NutritionDevelopment, value: string) => {
    setNutritionDevelopment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateAttendance = async () => {
    try {
      if (!patientId || !doctorId) {
        Alert.alert('Erro', 'ID do paciente ou do médico não encontrado.');
        return;
      }

      const newAttendanceId = uuid();
      console.log('Criando novo atendimento com ID:', newAttendanceId);

      await createAttendance({ ...basicInfo, id: newAttendanceId }, doctorId, patientId);
      await createVitalSigns(
        {
          ...vitalInfo,
          attendance_id: newAttendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        newAttendanceId
      );
      await createSymptom(
        {
          ...generalSymptoms,
          attendance_id: newAttendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        newAttendanceId
      );
      await createNutrition(
        {
          ...nutritionDevelopment,
          attendance_id: newAttendanceId,
          doctor_id: doctorId,
          patient_id: patientId,
          id: uuid(),
        },
        newAttendanceId
      );

      Alert.alert('Sucesso', 'Prontuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar prontuário:', error);
      Alert.alert('Erro', 'Erro ao criar prontuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {patientId ? (
        <>
          <BasicInfoForm data={basicInfo} onChange={handleBasicInfoChange} />
          <VitalInfoForm data={vitalInfo} onChange={handleVitalInfoChange} />
          <NutritionDevelopmentForm data={nutritionDevelopment} onChange={handleNutritionChange} />
          <GeneralSymptomsForm data={generalSymptoms} onChange={handleGeneralSymptomsChange} />
          <View style={styles.buttonRow}>
            <Button title="Criar Prontuário" onPress={handleCreateAttendance} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(tabs)/patients/PacienteDetails')}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
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
