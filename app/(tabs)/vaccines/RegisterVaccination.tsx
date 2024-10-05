// app/(tabs)/vaccines/RegisterVaccination.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';
import styles from '../../styles/VaccinationStyles';

const RegisterVaccination = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams();
  const parsedPatient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const { supabaseConnector } = useSystem();
  const [vaccineName, setVaccineName] = useState('');
  const [doseNumber, setDoseNumber] = useState('');

  const handleRegister = async () => {
    if (!vaccineName || !doseNumber) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const { error } = await supabaseConnector.client.from('vaccinations').insert({
        patient_id: parsedPatient.id,
        vaccine_name: vaccineName,
        dose_number: doseNumber,
        administered_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Erro ao cadastrar vacina:', error);
        Alert.alert('Erro', 'Erro ao cadastrar vacina.');
      } else {
        Alert.alert('Sucesso', 'Vacina cadastrada com sucesso!');
        router.replace('/(tabs)/vaccines/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar vacina:', error);
      Alert.alert('Erro', 'Erro ao cadastrar vacina.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastrar Vacina</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Vacina"
        placeholderTextColor="#888"
        value={vaccineName}
        onChangeText={setVaccineName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número da Dose"
        placeholderTextColor="#888"
        value={doseNumber}
        onChangeText={setDoseNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTRAR VACINA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterVaccination;
