import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Button, Alert, Text, ActivityIndicator, StyleSheet } from 'react-native';

import BasicInfoForm from './BasicInfoForm';
import GeneralSymptomsForm from './GeneralSymptomsForm';
import NutritionDevelopmentForm from './NutritionDevelopmentForm';
import VitalInfoForm from './VitalInfoForm';
import { BasicInfo, VitalInfo, GeneralSymptoms, NutritionDevelopment } from './types';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';
import { useDoctor } from '../context/DoctorContext';

const UpdateAttendance: React.FC = () => {
  const { db } = useSystem();
  const { patientId } = useLocalSearchParams<{ patientId: string }>();
  const router = useRouter();
  const { selectedDoctor } = useDoctor();

  const doctorId = selectedDoctor?.id;

  const [attendanceId, setAttendanceId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    if (!patientId) {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
      router.back();
      return;
    }

    const fetchAttendanceData = async () => {
      setLoading(true);
      try {
        const attendance = await db
          .selectFrom('attendances')
          .selectAll()
          .where('patient_id', '=', patientId)
          .orderBy('updated_at', 'desc')
          .executeTakeFirst();

        if (attendance) {
          setAttendanceId(attendance.id);
          setBasicInfo({
            motivo_consulta: attendance.motivo_consulta || '',
            consulta_retorno: attendance.consulta_retorno || '',
            primeira_consulta: attendance.primeira_consulta || '',
            hipertensao: attendance.hipertensao || '',
            diabetes: attendance.diabetes || '',
            doenca_hepatica: attendance.doenca_hepatica || '',
            deficiencia_g6pd: attendance.deficiencia_g6pd || '',
          });

          const vitalData = await db
            .selectFrom('attendance_vitals')
            .selectAll()
            .where('attendance_id', '=', attendance.id)
            .executeTakeFirst();

          if (vitalData) {
            setVitalInfo({
              peso_kg: vitalData.peso_kg || '',
              comprimento_cm: vitalData.comprimento_cm || '',
              perimetro_cefalico_cm: vitalData.perimetro_cefalico_cm || '',
              numero_respiracoes_por_minuto: vitalData.numero_respiracoes_por_minuto || '',
            });
          }

          const symptomsData = await db
            .selectFrom('attendance_symptoms')
            .selectAll()
            .where('attendance_id', '=', attendance.id)
            .executeTakeFirst();

          if (symptomsData) {
            setGeneralSymptoms({
              nao_bebe_ou_mama: symptomsData.nao_bebe_ou_mama || '',
              vomita_tudo: symptomsData.vomita_tudo || '',
              convulsoes: symptomsData.convulsoes || '',
              letargica: symptomsData.letargica || '',
              enchimento_capilar: symptomsData.enchimento_capilar || '',
              batimento_asa: symptomsData.batimento_asa || '',
              tem_tosse: symptomsData.tem_tosse || '',
              sibilancia: symptomsData.sibilancia || '',
              tem_diarreia: symptomsData.tem_diarreia || '',
              tem_febre: symptomsData.tem_febre || '',
              rigidez_nuca: symptomsData.rigidez_nuca || '',
              problema_ouvido: symptomsData.problema_ouvido || '',
              dor_garganta: symptomsData.dor_garganta || '',
              gemido: symptomsData.gemido || '',
              cianose_periferica: symptomsData.cianose_periferica || '',
              ictericia: symptomsData.ictericia || '',
              distensao_abdominal: symptomsData.distensao_abdominal || '',
              emagrecimento: symptomsData.emagrecimento || '',
              edema: symptomsData.edema || '',
            });
          }

          const nutritionData = await db
            .selectFrom('attendance_nutrition_development')
            .selectAll()
            .where('attendance_id', '=', attendance.id)
            .executeTakeFirst();

          if (nutritionData) {
            setNutritionDevelopment({
              amamentando: nutritionData.amamentando || '',
              quantas_vezes_amamenta: nutritionData.quantas_vezes_amamenta || '',
              amamenta_noite: nutritionData.amamenta_noite || '',
              alimentos_liquidos: nutritionData.alimentos_liquidos || '',
              quantidade_refeicoes: nutritionData.quantidade_refeicoes || '',
              tipo_alimentacao: nutritionData.tipo_alimentacao || '',
              mudou_alimentacao: nutritionData.mudou_alimentacao || '',
              como_mudou_alimentacao: nutritionData.como_mudou_alimentacao || '',
              perda_peso_primeira_semana: nutritionData.perda_peso_primeira_semana || '',
              tendencia_crescimento: nutritionData.tendencia_crescimento || '',
              habilidades_desenvolvimento: nutritionData.habilidades_desenvolvimento || '',
              atividade_fisica_vezes_semana: nutritionData.atividade_fisica_vezes_semana || '',
              tempo_atividade_fisica: nutritionData.tempo_atividade_fisica || '',
              tempo_sedentario: nutritionData.tempo_sedentario || '',
              avaliacao_violencia: nutritionData.avaliacao_violencia || '',
              outros_problemas: nutritionData.outros_problemas || '',
            });
          }
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

    if (!doctorId) {
      Alert.alert('Erro', 'ID do médico não encontrado.');
      return;
    }

    setLoading(true);
    try {
      if (attendanceId) {
        await db
          .updateTable('attendances')
          .set({
            ...basicInfo,
            updated_at: new Date().toISOString(),
          })
          .where('id', '=', attendanceId)
          .execute();

        await updateOtherTables(attendanceId);
      } else {
        const [newAttendance] = await db
          .insertInto('attendances')
          .values({
            id: uuid(),
            patient_id: patientId,
            doctor_id: doctorId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            motivo_consulta: basicInfo.motivo_consulta,
            consulta_retorno: basicInfo.consulta_retorno,
            primeira_consulta: basicInfo.primeira_consulta,
          })
          .returning('id')
          .execute();

        if (newAttendance && newAttendance.id) {
          setAttendanceId(newAttendance.id);
          await updateOtherTables(newAttendance.id);
        }
      }

      Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
      router.replace(
        `/patients/PacienteDetails:${encodeURIComponent(JSON.stringify({ id: patientId }))}`
      );
    } catch (error) {
      Alert.alert('Erro', `Erro ao salvar prontuário: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateOtherTables = async (attendanceId: string) => {
    await db
      .insertInto('attendance_vitals')
      .values({ id: uuid(), ...vitalInfo, attendance_id: attendanceId, doctor_id: doctorId })
      .onConflict((oc) =>
        oc.column('attendance_id').doUpdateSet({
          peso_kg: vitalInfo.peso_kg,
          comprimento_cm: vitalInfo.comprimento_cm,
          perimetro_cefalico_cm: vitalInfo.perimetro_cefalico_cm,
          numero_respiracoes_por_minuto: vitalInfo.numero_respiracoes_por_minuto,
        })
      )
      .execute();

    await db
      .insertInto('attendance_symptoms')
      .values({ id: uuid(), ...generalSymptoms, attendance_id: attendanceId, doctor_id: doctorId })
      .onConflict((oc) => oc.column('attendance_id').doUpdateSet(generalSymptoms))
      .execute();

    await db
      .insertInto('attendance_nutrition_development')
      .values({
        id: uuid(),
        ...nutritionDevelopment,
        attendance_id: attendanceId,
        doctor_id: doctorId,
      })
      .onConflict((oc) => oc.column('attendance_id').doUpdateSet(nutritionDevelopment))
      .execute();
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
      {/* Verificação de carregamento */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#005F9E" />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          {/* Formulário de informações básicas */}
          <BasicInfoForm
            data={basicInfo}
            onChange={(field, value) => setBasicInfo((prev) => ({ ...prev, [field]: value }))}
          />

          {/* Formulário de sinais vitais */}
          <VitalInfoForm
            data={vitalInfo}
            onChange={(field, value) => setVitalInfo((prev) => ({ ...prev, [field]: value }))}
          />

          {/* Formulário de sintomas gerais */}
          <GeneralSymptomsForm
            data={generalSymptoms}
            onChange={(field, value) => setGeneralSymptoms((prev) => ({ ...prev, [field]: value }))}
          />

          {/* Formulário de nutrição e desenvolvimento */}
          <NutritionDevelopmentForm
            data={nutritionDevelopment}
            onChange={(field, value) =>
              setNutritionDevelopment((prev) => ({ ...prev, [field]: value }))
            }
          />

          {/* Botão para salvar o prontuário */}
          <View style={styles.buttonContainer}>
            <Button title="Salvar Prontuário" onPress={handleSaveAttendance} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default UpdateAttendance;
