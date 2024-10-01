//APP/ATTENDANCES/REGISTERATTENDANCE.TSX

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';

import { Patient, Doctor } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { formatCPF } from '../../utils/formatUtils';
import { calcularIdade } from '../../utils/idadeCalculator';
import { uuid } from '../../utils/uuid';
import styles from '../styles/Styles';

const RegisterAttendance = () => {
  const params = useLocalSearchParams();
  console.log('Raw useLocalSearchParams output:', params);

  // Capturando os dados do paciente diretamente dos parâmetros fornecidos
  const parsedPatient: Patient = params.patient
    ? JSON.parse(decodeURIComponent(params.patient as string))
    : null;

  // Capturando o ID do médico e garantindo que ele seja uma string
  let doctorId: string | null = null;
  if (params.doctorId) {
    doctorId = Array.isArray(params.doctorId) ? params.doctorId[0] : params.doctorId;
  }

  console.log('Processed parameters:', { parsedPatient, doctorId });

  const { supabaseConnector } = useSystem();
  console.log('useSystem:', { supabaseConnector });

  const [patientData, setPatientData] = useState<Patient | null>(parsedPatient);
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  const [attendanceData, setAttendanceData] = useState({
    weight: '',
    height: '',
    blood_pressure: '',
    apgar_score_at_one_minute: '',
    apgar_score_at_five_minutes: '',
    maternal_tax: '',
    maternal_weight: '',
    maternal_height: '',
    maternal_blood_pressure: '',
    maternal_blood_type: '',
    number_of_previous_pregnancies: '',
    number_of_previous_births: '',
    number_of_cesarean_sections: '',
    number_of_abortions: '',
    spontaneous_abortions: '',
    maternal_vaccines: '',
    number_of_living_children: '',
    number_of_neonatal_deaths: '',
    number_of_children: '',
    maternal_hospitalizations: '',
    maternal_surgeries: '',
    number_of_surgeries: '',
    prenatal_consultations: '',
    number_of_prenatal_consultations: '',
    maternal_treatments: '',
    maternal_description: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (doctorId) {
      setLoading(true);
      console.log('Starting data load for doctor.');
      loadDoctor(doctorId)
        .then(() => setLoading(false))
        .catch((error) => {
          console.error('Error during doctor data load:', error);
          setLoading(false);
        });
    }
  }, [doctorId]);

  const loadDoctor = async (id: string) => {
    console.log('Loading doctor data for ID:', id);
    try {
      const { data, error } = await supabaseConnector.client
        .from('doctors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading doctor data from Supabase:', error);
      } else {
        console.log('Doctor data loaded successfully:', data);
        setDoctorData(data);
      }
    } catch (error) {
      console.error('Exception caught while loading doctor data:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Input change - Field: ${field}, Value: ${value}`);
    setAttendanceData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveAttendance = async () => {
    if (!patientData || !doctorData) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar o prontuário porque os dados do paciente ou do médico não estão disponíveis. Por favor, tente novamente mais tarde.'
      );
      console.warn('Attempted to save attendance without patientData or doctorData:', {
        patientData,
        doctorData,
      });
      return;
    }

    setSaving(true);
    console.log('Saving attendance data:', {
      ...attendanceData,
      patient_id: patientData.id,
      doctor_id: doctorData.id,
    });

    const newAttendance = {
      ...attendanceData,
      id: uuid(),
      patient_id: patientData.id,
      doctor_id: doctorData.id,
      doctor_name: doctorData.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabaseConnector.client.from('attendances').insert(newAttendance);

      if (error) {
        console.error('Error saving attendance data:', error);
        Alert.alert('Erro', 'Erro ao salvar prontuário: ' + error.message);
      } else {
        console.log('Attendance saved successfully:', newAttendance);
        Alert.alert('Sucesso', 'Prontuário salvo com sucesso!');
        router.replace('/home/');
      }
    } catch (error) {
      console.error('Exception caught while saving attendance data:', error);
      Alert.alert('Erro', 'Erro ao salvar prontuário.');
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
          {/* Informações do Paciente */}
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

          {/* Informações do Médico */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Médico Responsável</Text>
            <Text>Nome: {doctorData?.name ?? 'Nome não disponível'}</Text>
            <Text>Email: {doctorData?.email ?? 'Email não disponível'}</Text>
          </View>

          {/* Cadastro do Prontuário */}
          <View style={styles.attendanceContainer}>
            <Text style={styles.title}>Cadastro do Prontuário</Text>

            {/* Peso do Paciente */}
            <TextInput
              style={styles.input}
              placeholder="Peso do Paciente (kg)"
              value={attendanceData.weight}
              onChangeText={(text) => handleInputChange('weight', text)}
              keyboardType="numeric"
            />

            {/* Altura do Paciente */}
            <TextInput
              style={styles.input}
              placeholder="Altura do Paciente (m)"
              value={attendanceData.height}
              onChangeText={(text) => handleInputChange('height', text)}
              keyboardType="numeric"
            />

            {/* Pressão Arterial */}
            <TextInput
              style={styles.input}
              placeholder="Pressão Arterial (mmHg)"
              value={attendanceData.blood_pressure}
              onChangeText={(text) => handleInputChange('blood_pressure', text)}
              keyboardType="default"
            />

            {/* Apgar após 1 minuto */}
            <TextInput
              style={styles.input}
              placeholder="Apgar após 1 minuto (0-10)"
              value={attendanceData.apgar_score_at_one_minute}
              onChangeText={(text) => handleInputChange('apgar_score_at_one_minute', text)}
              keyboardType="numeric"
            />

            {/* Apgar após 5 minutos */}
            <TextInput
              style={styles.input}
              placeholder="Apgar após 5 minutos (0-10)"
              value={attendanceData.apgar_score_at_five_minutes}
              onChangeText={(text) => handleInputChange('apgar_score_at_five_minutes', text)}
              keyboardType="numeric"
            />

            {/* Peso da Mãe */}
            <TextInput
              style={styles.input}
              placeholder="Peso da Mãe (kg)"
              value={attendanceData.maternal_weight}
              onChangeText={(text) => handleInputChange('maternal_weight', text)}
              keyboardType="numeric"
            />

            {/* Altura da Mãe */}
            <TextInput
              style={styles.input}
              placeholder="Altura da Mãe (m)"
              value={attendanceData.maternal_height}
              onChangeText={(text) => handleInputChange('maternal_height', text)}
              keyboardType="numeric"
            />

            {/* Pressão Arterial da Mãe */}
            <TextInput
              style={styles.input}
              placeholder="Pressão Arterial da Mãe (mmHg)"
              value={attendanceData.maternal_blood_pressure}
              onChangeText={(text) => handleInputChange('maternal_blood_pressure', text)}
              keyboardType="default"
            />

            {/* Tipo Sanguíneo da Mãe */}
            <TextInput
              style={styles.input}
              placeholder="Tipo Sanguíneo da Mãe (ex.: O+)"
              value={attendanceData.maternal_blood_type}
              onChangeText={(text) => handleInputChange('maternal_blood_type', text)}
              keyboardType="default"
            />

            {/* Número de Gestações Anteriores */}
            <TextInput
              style={styles.input}
              placeholder="Número de Gestações Anteriores"
              value={attendanceData.number_of_previous_pregnancies}
              onChangeText={(text) => handleInputChange('number_of_previous_pregnancies', text)}
              keyboardType="numeric"
            />

            {/* Número de Partos Anteriores */}
            <TextInput
              style={styles.input}
              placeholder="Número de Partos Anteriores"
              value={attendanceData.number_of_previous_births}
              onChangeText={(text) => handleInputChange('number_of_previous_births', text)}
              keyboardType="numeric"
            />

            {/* Número de Cesáreas */}
            <TextInput
              style={styles.input}
              placeholder="Número de Cesáreas"
              value={attendanceData.number_of_cesarean_sections}
              onChangeText={(text) => handleInputChange('number_of_cesarean_sections', text)}
              keyboardType="numeric"
            />

            {/* Abortos */}
            <TextInput
              style={styles.input}
              placeholder="Número de Abortos"
              value={attendanceData.number_of_abortions}
              onChangeText={(text) => handleInputChange('number_of_abortions', text)}
              keyboardType="numeric"
            />

            {/* Abortos Espontâneos */}
            <TextInput
              style={styles.input}
              placeholder="Número de Abortos Espontâneos"
              value={attendanceData.spontaneous_abortions}
              onChangeText={(text) => handleInputChange('spontaneous_abortions', text)}
              keyboardType="numeric"
            />

            {/* Vacinas Maternas */}
            <TextInput
              style={styles.input}
              placeholder="Vacinas Maternas"
              value={attendanceData.maternal_vaccines}
              onChangeText={(text) => handleInputChange('maternal_vaccines', text)}
              keyboardType="default"
            />

            {/* Número de Filhos Vivos */}
            <TextInput
              style={styles.input}
              placeholder="Número de Filhos Vivos"
              value={attendanceData.number_of_living_children}
              onChangeText={(text) => handleInputChange('number_of_living_children', text)}
              keyboardType="numeric"
            />

            {/* Consultas Pré-natais */}
            <TextInput
              style={styles.input}
              placeholder="Número de Consultas Pré-natais"
              value={attendanceData.number_of_prenatal_consultations}
              onChangeText={(text) => handleInputChange('number_of_prenatal_consultations', text)}
              keyboardType="numeric"
            />

            {/* Descrição Adicional */}
            <TextInput
              style={styles.inputMultiline}
              placeholder="Descrição Adicional"
              value={attendanceData.maternal_description}
              onChangeText={(text) => handleInputChange('maternal_description', text)}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Botão para salvar o prontuário */}
          <View style={styles.buttonContainer}>
            <Button
              title="Salvar Prontuário"
              onPress={handleSaveAttendance}
              disabled={saving}
              color="#4CAF50"
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default RegisterAttendance;
