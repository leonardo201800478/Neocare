// app/attendences/UpdateAttendance.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Attendance, Patient, Doctor } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/Styles'; // Importando o estilo padronizado
import { formatCPF } from '../../utils/formatUtils';
import { calcularIdade } from '../../utils/idadeCalculator';

const UpdateAttendance = () => {
  const params = useLocalSearchParams();

  // Obtendo os dados do paciente e prontuário pelos parâmetros
  const parsedPatient: Patient = params.patient
    ? JSON.parse(decodeURIComponent(params.patient as string))
    : null;
  
  const attendanceId = params.attendanceId ? (params.attendanceId as string) : null;

  const { supabaseConnector } = useSystem();
  const [patientData, setPatientData] = useState<Patient | null>(parsedPatient);
  const [attendanceData, setAttendanceData] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (attendanceId) {
      loadAttendanceData(attendanceId);
    } else {
      setLoading(false);
    }
  }, [attendanceId]);

  const loadAttendanceData = async (id: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao carregar os dados do prontuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do prontuário.');
      } else {
        setAttendanceData(data);
      }
    } catch (error) {
      console.error('Erro ao buscar prontuário:', error);
      Alert.alert('Erro', 'Erro ao buscar o prontuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (attendanceData) {
      setAttendanceData({ ...attendanceData, [field]: value });
    }
  };

  const handleUpdateAttendance = async () => {
    if (!attendanceData) {
      Alert.alert(
        'Erro',
        'Os dados do prontuário não estão disponíveis. Por favor, tente novamente mais tarde.'
      );
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabaseConnector.client
        .from('attendances')
        .update(attendanceData)
        .eq('id', attendanceData.id);

      if (error) {
        console.error('Erro ao atualizar prontuário:', error);
        Alert.alert('Erro', 'Erro ao atualizar prontuário: ' + error.message);
      } else {
        Alert.alert('Sucesso', 'Prontuário atualizado com sucesso!');
        router.replace('/home/');
      }
    } catch (error) {
      console.error('Erro ao atualizar prontuário:', error);
      Alert.alert('Erro', 'Erro ao atualizar o prontuário.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#32CD32" />
          <Text>Carregando...</Text>
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
                ? calcularIdade(new Date(patientData.birth_date))
                : 'Data de nascimento não disponível'}
            </Text>
          </View>

          <View style={styles.attendanceContainer}>
            <Text style={styles.title}>Atualização do Prontuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Peso do Paciente (kg)"
              value={attendanceData?.weight || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('weight', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Altura do Paciente (m)"
              value={attendanceData?.height || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('height', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pressão Arterial"
              value={attendanceData?.blood_pressure || ''}
              keyboardType="default"
              onChangeText={(text) => handleInputChange('blood_pressure', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apgar após 1 minuto"
              value={attendanceData?.apgar_score_at_one_minute || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('apgar_score_at_one_minute', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Apgar após 5 minutos"
              value={attendanceData?.apgar_score_at_five_minutes || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('apgar_score_at_five_minutes', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso da Mãe (kg)"
              value={attendanceData?.maternal_weight || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('maternal_weight', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Altura da Mãe (m)"
              value={attendanceData?.maternal_height || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('maternal_height', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pressão Arterial da Mãe"
              value={attendanceData?.maternal_blood_pressure || ''}
              keyboardType="default"
              onChangeText={(text) => handleInputChange('maternal_blood_pressure', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo Sanguíneo da Mãe"
              value={attendanceData?.maternal_blood_type || ''}
              keyboardType="default"
              onChangeText={(text) => handleInputChange('maternal_blood_type', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de Gestações Anteriores"
              value={attendanceData?.number_of_previous_pregnancies || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('number_of_previous_pregnancies', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de Consultas Pré-natais"
              value={attendanceData?.number_of_prenatal_consultations || ''}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('number_of_prenatal_consultations', text)}
            />
            {/* Continue adicionando todos os demais campos necessários */}
          </View>

          <Button
            title={saving ? "Salvando..." : "Salvar Atualizações"}
            onPress={handleUpdateAttendance}
            disabled={saving}
          />
        </>
      )}
    </ScrollView>
  );
};

export default UpdateAttendance;
