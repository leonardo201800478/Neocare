import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { formatCPF } from '../../utils/formatUtils';
import { calcularIdade } from '../../utils/idadeCalculator';
import styles from '../styles/Styles';

// Definindo a interface para os dados do formulário de prontuário
interface AttendanceData {
  id?: string;
  created_at?: string;
  updated_at?: string;
  patient_id?: string;
  registered_by?: string;
  data_atendimento?: string;
  primeira_consulta?: string;
  consulta_retorno?: string;
  motivo_consulta?: string;
  peso_kg?: string;
  comprimento_cm?: string;
  perimetro_cefalico_cm?: string;
  problemas_da_crianca?: string;
  nao_bebe_ou_mama?: string;
  vomita_tudo?: string;
  convulsoes?: string;
  letargica?: string;
  enchimento_capilar?: string;
  batimento_asa?: string;
  tem_tosse?: string;
  tosse_ha_quanto_tempo?: string;
  numero_respiracoes_por_minuto?: string;
  respiracao_rapida?: string;
  tiragem_subcostal?: string;
  estridor?: string;
  sibilancia?: string;
  sibilancia_ha_quanto_tempo?: string;
  primeira_crise?: string;
  broncodilatador?: string;
  tem_diarreia?: string;
  diarreia_ha_quanto_tempo?: string;
  sangue_nas_fezes?: string;
  tem_febre?: string;
  area_risco_malaria?: string;
  febre_ha_quanto_tempo?: string;
  febre_todos_os_dias?: string;
  rigidez_nuca?: string;
  petequias?: string;
  abaulamento_fontanela?: string;
  problema_ouvido?: string;
  dor_no_ouvido?: string;
  secrecao_ouvido?: string;
  secrecao_ha_quanto_tempo?: string;
  dor_garganta?: string;
  ganglios_cervicais?: string;
  abaulamento_palato?: string;
  amigdalas_membrana?: string;
  amigdalas_pontos_purulentos?: string;
  vesiculas_hiperemia?: string;
  gemido?: string;
  cianose_periferica?: string;
  ictericia?: string;
  secrecao_umbilical?: string;
  distensao_abdominal?: string;
  anomalias_congenitas?: string;
  emagrecimento?: string;
  edema?: string;
  palidez_palmar?: string;
  peso_para_idade?: string;
  ganho_insuficiente_peso?: string;
  amamentando?: string;
  quantas_vezes_amamenta?: string;
  amamenta_noite?: string;
  alimentos_liquidos?: string;
  quantidade_refeicoes?: string;
  recebe_proporcao?: string;
  tipo_alimentacao?: string;
  mudou_alimentacao?: string;
  como_mudou_alimentacao?: string;
  perda_peso_primeira_semana?: string;
  tendencia_crescimento?: string;
  habilidades_desenvolvimento?: string;
  atividade_fisica_vezes_semana?: string;
  tempo_atividade_fisica?: string;
  tempo_sedentario?: string;
  avaliacao_violencia?: string;
  outros_problemas?: string;
}

const UpdateAttendance: React.FC = () => {
  const params = useLocalSearchParams();
  const parsedAttendanceId = params.attendance_id ? String(params.attendance_id) : null;

  const { supabaseConnector } = useSystem();
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (parsedAttendanceId) {
      loadAttendanceData(parsedAttendanceId);
    }
  }, [parsedAttendanceId]);

  const loadAttendanceData = async (attendanceId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('id', attendanceId)
        .single();

      if (error || !data) {
        Alert.alert('Erro', 'Erro ao carregar os dados do prontuário.');
      } else {
        setAttendanceData(data);
        // Carregar também os dados do paciente associado ao prontuário
        if (data.patient_id) {
          const { data: patientData, error: patientError } = await supabaseConnector.client
            .from('patients')
            .select('*')
            .eq('id', data.patient_id)
            .single();

          if (patientError || !patientData) {
            Alert.alert('Erro', 'Erro ao carregar os dados do paciente.');
          } else {
            setPatientData(patientData);
          }
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar os dados do prontuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setAttendanceData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleUpdateAttendance = async () => {
    if (!parsedAttendanceId) {
      Alert.alert('Erro', 'ID do prontuário não disponível.');
      return;
    }

    setSaving(true);
    try {
      const updatedAttendance = {
        ...attendanceData,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabaseConnector.client
        .from('attendances')
        .update(updatedAttendance)
        .eq('id', parsedAttendanceId);

      if (error) {
        Alert.alert('Erro', 'Erro ao atualizar prontuário: ' + error.message);
      } else {
        Alert.alert('Sucesso', 'Prontuário atualizado com sucesso!');
        router.replace('/(tabs)/home/');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar prontuário.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#32CD32" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Dados do Paciente</Text>
            <Text>Nome: {patientData?.name ?? 'Nome não disponível'}</Text>
            <Text>CPF: {formatCPF(patientData?.cpf ?? '')}</Text>
            <Text>
              Idade:{' '}
              {patientData && patientData.birth_date
                ? calcularIdade(new Date(patientData.birth_date), 'years')
                : 'Data de nascimento não disponível'}
            </Text>
          </View>

          <View style={styles.attendanceContainer}>
            <Text style={styles.title}>Atualização do Prontuário</Text>

            {/* Renderizando todos os campos do formulário */}
            <TextInput
              style={styles.input}
              placeholder="Data de Atendimento"
              value={attendanceData.data_atendimento}
              onChangeText={(text) => handleInputChange('data_atendimento', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Primeira Consulta (Sim/Não)"
              value={attendanceData.primeira_consulta}
              onChangeText={(text) => handleInputChange('primeira_consulta', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Consulta de Retorno (Sim/Não)"
              value={attendanceData.consulta_retorno}
              onChangeText={(text) => handleInputChange('consulta_retorno', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Motivo da Consulta"
              value={attendanceData.motivo_consulta}
              onChangeText={(text) => handleInputChange('motivo_consulta', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              value={attendanceData.peso_kg}
              onChangeText={(text) => handleInputChange('peso_kg', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Comprimento (cm)"
              value={attendanceData.comprimento_cm}
              onChangeText={(text) => handleInputChange('comprimento_cm', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Perímetro Cefálico (cm)"
              value={attendanceData.perimetro_cefalico_cm}
              onChangeText={(text) => handleInputChange('perimetro_cefalico_cm', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Problemas da Criança"
              value={attendanceData.problemas_da_crianca}
              onChangeText={(text) => handleInputChange('problemas_da_crianca', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Não Bebe ou Mama (Sim/Não)"
              value={attendanceData.nao_bebe_ou_mama}
              onChangeText={(text) => handleInputChange('nao_bebe_ou_mama', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Vomita Tudo (Sim/Não)"
              value={attendanceData.vomita_tudo}
              onChangeText={(text) => handleInputChange('vomita_tudo', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Convulsões (Sim/Não)"
              value={attendanceData.convulsoes}
              onChangeText={(text) => handleInputChange('convulsoes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Letárgica (Sim/Não)"
              value={attendanceData.letargica}
              onChangeText={(text) => handleInputChange('letargica', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enchimento Capilar (Sim/Não)"
              value={attendanceData.enchimento_capilar}
              onChangeText={(text) => handleInputChange('enchimento_capilar', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Batimento de Asa (Sim/Não)"
              value={attendanceData.batimento_asa}
              onChangeText={(text) => handleInputChange('batimento_asa', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tem Tosse (Sim/Não)"
              value={attendanceData.tem_tosse}
              onChangeText={(text) => handleInputChange('tem_tosse', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tosse há Quanto Tempo (dias)"
              value={attendanceData.tosse_ha_quanto_tempo}
              onChangeText={(text) => handleInputChange('tosse_ha_quanto_tempo', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Número de Respirações por Minuto"
              value={attendanceData.numero_respiracoes_por_minuto}
              onChangeText={(text) => handleInputChange('numero_respiracoes_por_minuto', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Respiração Rápida? (Sim/Não)"
              value={attendanceData.respiracao_rapida}
              onChangeText={(text) => handleInputChange('respiracao_rapida', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tiragem Subcostal (Sim/Não)"
              value={attendanceData.tiragem_subcostal}
              onChangeText={(text) => handleInputChange('tiragem_subcostal', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Estridor (Sim/Não)"
              value={attendanceData.estridor}
              onChangeText={(text) => handleInputChange('estridor', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Sibilância (Sim/Não)"
              value={attendanceData.sibilancia}
              onChangeText={(text) => handleInputChange('sibilancia', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Sibilância há Quanto Tempo (dias)"
              value={attendanceData.sibilancia_ha_quanto_tempo}
              onChangeText={(text) => handleInputChange('sibilancia_ha_quanto_tempo', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Primeira Crise? (Sim/Não)"
              value={attendanceData.primeira_crise}
              onChangeText={(text) => handleInputChange('primeira_crise', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Uso de Broncodilatador nas Últimas 24h (Sim/Não)"
              value={attendanceData.broncodilatador}
              onChangeText={(text) => handleInputChange('broncodilatador', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Criança tem Diarreia? (Sim/Não)"
              value={attendanceData.tem_diarreia}
              onChangeText={(text) => handleInputChange('tem_diarreia', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Diarreia há Quanto Tempo (dias)"
              value={attendanceData.diarreia_ha_quanto_tempo}
              onChangeText={(text) => handleInputChange('diarreia_ha_quanto_tempo', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Sangue nas Fezes? (Sim/Não)"
              value={attendanceData.sangue_nas_fezes}
              onChangeText={(text) => handleInputChange('sangue_nas_fezes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Criança está com Febre? (Sim/Não)"
              value={attendanceData.tem_febre}
              onChangeText={(text) => handleInputChange('tem_febre', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Área com Risco de Malária ('sem risco', 'alto risco', 'baixo risco')"
              value={attendanceData.area_risco_malaria}
              onChangeText={(text) => handleInputChange('area_risco_malaria', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Febre há Quanto Tempo (dias)"
              value={attendanceData.febre_ha_quanto_tempo}
              onChangeText={(text) => handleInputChange('febre_ha_quanto_tempo', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Febre Todos os Dias? (Sim/Não)"
              value={attendanceData.febre_todos_os_dias}
              onChangeText={(text) => handleInputChange('febre_todos_os_dias', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Rigidez de Nuca? (Sim/Não)"
              value={attendanceData.rigidez_nuca}
              onChangeText={(text) => handleInputChange('rigidez_nuca', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Presença de Petéquias? (Sim/Não)"
              value={attendanceData.petequias}
              onChangeText={(text) => handleInputChange('petequias', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Abaulamento da Fontanela? (Sim/Não)"
              value={attendanceData.abaulamento_fontanela}
              onChangeText={(text) => handleInputChange('abaulamento_fontanela', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Problema de Ouvido? (Sim/Não)"
              value={attendanceData.problema_ouvido}
              onChangeText={(text) => handleInputChange('problema_ouvido', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Dor no Ouvido? (Sim/Não)"
              value={attendanceData.dor_no_ouvido}
              onChangeText={(text) => handleInputChange('dor_no_ouvido', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Secreção no Ouvido? (Sim/Não)"
              value={attendanceData.secrecao_ouvido}
              onChangeText={(text) => handleInputChange('secrecao_ouvido', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Secreção há Quanto Tempo (dias)"
              value={attendanceData.secrecao_ha_quanto_tempo}
              onChangeText={(text) => handleInputChange('secrecao_ha_quanto_tempo', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Dor de Garganta? (Sim/Não)"
              value={attendanceData.dor_garganta}
              onChangeText={(text) => handleInputChange('dor_garganta', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Gânglios Cervicais aumentados/dolorosos? (Sim/Não)"
              value={attendanceData.ganglios_cervicais}
              onChangeText={(text) => handleInputChange('ganglios_cervicais', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Abaulamento do Palato? (Sim/Não)"
              value={attendanceData.abaulamento_palato}
              onChangeText={(text) => handleInputChange('abaulamento_palato', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amígdalas com Membrana Branco-acinzentada? (Sim/Não)"
              value={attendanceData.amigdalas_membrana}
              onChangeText={(text) => handleInputChange('amigdalas_membrana', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pontos Purulentos nas Amígdalas? (Sim/Não)"
              value={attendanceData.amigdalas_pontos_purulentos}
              onChangeText={(text) => handleInputChange('amigdalas_pontos_purulentos', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Presença de Vesículas e/ou Hiperemia? (Sim/Não)"
              value={attendanceData.vesiculas_hiperemia}
              onChangeText={(text) => handleInputChange('vesiculas_hiperemia', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Gemido, Estridor ou Sibilância? (Sim/Não)"
              value={attendanceData.gemido}
              onChangeText={(text) => handleInputChange('gemido', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cianose Periférica? (Sim/Não)"
              value={attendanceData.cianose_periferica}
              onChangeText={(text) => handleInputChange('cianose_periferica', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Icterícia? (Sim/Não)"
              value={attendanceData.ictericia}
              onChangeText={(text) => handleInputChange('ictericia', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Secreção Umbilical? (Sim/Não)"
              value={attendanceData.secrecao_umbilical}
              onChangeText={(text) => handleInputChange('secrecao_umbilical', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Distensão Abdominal? (Sim/Não)"
              value={attendanceData.distensao_abdominal}
              onChangeText={(text) => handleInputChange('distensao_abdominal', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Anomalias Congênitas? (Sim/Não)"
              value={attendanceData.anomalias_congenitas}
              onChangeText={(text) => handleInputChange('anomalias_congenitas', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Emagrecimento Acentuado? (Sim/Não)"
              value={attendanceData.emagrecimento}
              onChangeText={(text) => handleInputChange('emagrecimento', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Edema? (Sim/Não)"
              value={attendanceData.edema}
              onChangeText={(text) => handleInputChange('edema', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Palidez Palmar ('leve' ou 'grave')"
              value={attendanceData.palidez_palmar}
              onChangeText={(text) => handleInputChange('palidez_palmar', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso para Idade ('muito baixo', 'baixo', 'adequado', 'elevado')"
              value={attendanceData.peso_para_idade}
              onChangeText={(text) => handleInputChange('peso_para_idade', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ganho Insuficiente de Peso? (Sim/Não)"
              value={attendanceData.ganho_insuficiente_peso}
              onChangeText={(text) => handleInputChange('ganho_insuficiente_peso', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amamentando? (Sim/Não)"
              value={attendanceData.amamentando}
              onChangeText={(text) => handleInputChange('amamentando', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantas Vezes Amamenta por Dia"
              value={attendanceData.quantas_vezes_amamenta}
              onChangeText={(text) => handleInputChange('quantas_vezes_amamenta', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Amamenta à Noite? (Sim/Não)"
              value={attendanceData.amamenta_noite}
              onChangeText={(text) => handleInputChange('amamenta_noite', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Recebe outros Líquidos/Alimentos?"
              value={attendanceData.alimentos_liquidos}
              onChangeText={(text) => handleInputChange('alimentos_liquidos', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantas Refeições por Dia"
              value={attendanceData.quantidade_refeicoes}
              onChangeText={(text) => handleInputChange('quantidade_refeicoes', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Recebe Proporção Adequada? (Sim/Não)"
              value={attendanceData.recebe_proporcao}
              onChangeText={(text) => handleInputChange('recebe_proporcao', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo de Alimentação (mamadeira/copo/colher)"
              value={attendanceData.tipo_alimentacao}
              onChangeText={(text) => handleInputChange('tipo_alimentacao', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mudou a Alimentação Recentemente? (Sim/Não)"
              value={attendanceData.mudou_alimentacao}
              onChangeText={(text) => handleInputChange('mudou_alimentacao', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Como Mudou a Alimentação?"
              value={attendanceData.como_mudou_alimentacao}
              onChangeText={(text) => handleInputChange('como_mudou_alimentacao', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Perda de Peso na Primeira Semana >10%? (Sim/Não)"
              value={attendanceData.perda_peso_primeira_semana}
              onChangeText={(text) => handleInputChange('perda_peso_primeira_semana', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tendência de Crescimento"
              value={attendanceData.tendencia_crescimento}
              onChangeText={(text) => handleInputChange('tendencia_crescimento', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Habilidades de Desenvolvimento Alcançadas"
              value={attendanceData.habilidades_desenvolvimento}
              onChangeText={(text) => handleInputChange('habilidades_desenvolvimento', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Prática de Atividade Física (Vezes por Semana)"
              value={attendanceData.atividade_fisica_vezes_semana}
              onChangeText={(text) => handleInputChange('atividade_fisica_vezes_semana', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Tempo de Atividade Física"
              value={attendanceData.tempo_atividade_fisica}
              onChangeText={(text) => handleInputChange('tempo_atividade_fisica', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tempo Sedentário (TV/Computador/Celular)"
              value={attendanceData.tempo_sedentario}
              onChangeText={(text) => handleInputChange('tempo_sedentario', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Possibilidade de Violência?"
              value={attendanceData.avaliacao_violencia}
              onChangeText={(text) => handleInputChange('avaliacao_violencia', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Outros Problemas"
              value={attendanceData.outros_problemas}
              onChangeText={(text) => handleInputChange('outros_problemas', text)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Atualizar Prontuário"
              onPress={handleUpdateAttendance}
              disabled={saving}
              color="#4CAF50"
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default UpdateAttendance;
