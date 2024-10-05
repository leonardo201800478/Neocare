// app/(tabs)/vaccines/RegisterVaccination.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/VaccinationStyles';

const RegisterVaccination = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams();
  const parsedPatient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const { supabaseConnector } = useSystem();
  const [vaccineName, setVaccineName] = useState('');
  const [doseNumber, setDoseNumber] = useState('');

  const handleRegister = async () => {
    // Valida se os campos estão preenchidos e se o paciente foi passado corretamente
    if (!parsedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

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
        // Redireciona para a lista de vacinas do paciente
        router.replace(`/vaccines/?patient=${encodeURIComponent(JSON.stringify(parsedPatient))}`);
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
        keyboardType="numeric" // Define o tipo de teclado apropriado
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTRAR VACINA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterVaccination;
