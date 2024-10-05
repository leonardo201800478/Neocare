// app/(tabs)/vaccines/UpdateVaccine.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/VaccinationStyles';

const UpdateVaccine = () => {
  const router = useRouter();
  const { patient, vaccineId } = useLocalSearchParams();
  const parsedPatient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const { supabaseConnector } = useSystem();
  const [vaccineName, setVaccineName] = useState('');
  const [doseNumber, setDoseNumber] = useState('');

  useEffect(() => {
    const fetchVaccineDetails = async () => {
      if (!vaccineId) {
        Alert.alert('Erro', 'Vacina não encontrada.');
        router.replace('/vaccines/');
        return;
      }

      try {
        const { data, error } = await supabaseConnector.client
          .from('vaccinations')
          .select('*')
          .eq('id', vaccineId)
          .single();

        if (error) {
          console.error('Erro ao buscar vacina:', error);
          Alert.alert('Erro', 'Erro ao buscar vacina.');
        } else {
          setVaccineName(data.vaccine_name);
          setDoseNumber(data.dose_number);
        }
      } catch (error) {
        console.error('Erro ao buscar vacina:', error);
        Alert.alert('Erro', 'Erro ao buscar vacina.');
      }
    };

    fetchVaccineDetails().catch((error) => {
      console.error('Erro ao buscar vacina:', error);
    });
  }, []);

  const handleUpdate = async () => {
    try {
      const { error } = await supabaseConnector.client
        .from('vaccinations')
        .update({
          vaccine_name: vaccineName,
          dose_number: doseNumber,
        })
        .eq('id', vaccineId);

      if (error) {
        console.error('Erro ao atualizar vacina:', error);
        Alert.alert('Erro', 'Erro ao atualizar vacina.');
      } else {
        Alert.alert('Sucesso', 'Vacina atualizada com sucesso!');
        router.replace('/vaccines/');
      }
    } catch (error) {
      console.error('Erro ao atualizar vacina:', error);
      Alert.alert('Erro', 'Erro ao atualizar vacina.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atualizar Vacina</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>ATUALIZAR VACINA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateVaccine;
