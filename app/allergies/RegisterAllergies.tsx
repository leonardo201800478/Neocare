import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para ícones personalizados

import { useAllergy } from '../context/AllergiesContext';
import { usePatient } from '../context/PatientContext';
import styles from './styles/RegisterAllergiesStyles';

// Nomes em português
const allergyNames = {
  allergy_milk: 'Leite',
  allergy_eggs: 'Ovos',
  allergy_beef: 'Carne de boi',
  allergy_fish: 'Peixe',
  allergy_shellfish: 'Frutos do mar',
  allergy_cat: 'Gato',
  allergy_dog: 'Cachorro',
  allergy_bee: 'Abelha',
  allergy_ant: 'Formiga',
  allergy_venomous_animals: 'Animais venenosos',
  allergy_insects: 'Insetos',
  allergy_dipyrone: 'Dipirona',
  allergy_aspirin: 'AAS',
  allergy_diclofenac: 'Diclofenaco',
  allergy_paracetamol: 'Paracetamol',
  allergy_penicillin: 'Penicilina',
  allergy_magnesium_bisulphate: 'Magnésio Bisurado',
  allergy_rivaroxaban: 'Rivaroxabana',
  allergy_losartan_potassium: 'Losartana',
  allergy_metformin: 'Metformina',
  allergy_butylscopolamine: 'Butilescopolamina',
};

const RegisterAllergies = () => {
  const { updateAllergy, fetchAllergiesByPatient } = useAllergy();
  const { selectedPatient } = usePatient();
  const router = useRouter();

  // Definindo o estado de alergias com strings '1' ou '0'
  const [allergies, setAllergies] = useState<Record<keyof typeof allergyNames, string>>({
    allergy_milk: '0',
    allergy_eggs: '0',
    allergy_beef: '0',
    allergy_fish: '0',
    allergy_shellfish: '0',
    allergy_cat: '0',
    allergy_dog: '0',
    allergy_bee: '0',
    allergy_ant: '0',
    allergy_venomous_animals: '0',
    allergy_insects: '0',
    allergy_dipyrone: '0',
    allergy_aspirin: '0',
    allergy_diclofenac: '0',
    allergy_paracetamol: '0',
    allergy_penicillin: '0',
    allergy_magnesium_bisulphate: '0',
    allergy_rivaroxaban: '0',
    allergy_losartan_potassium: '0',
    allergy_metformin: '0',
    allergy_butylscopolamine: '0',
  });

  useEffect(() => {
    if (selectedPatient) {
      initializeAllergies(selectedPatient.id);
    }
  }, [selectedPatient]);

  const initializeAllergies = async (patientId: string) => {
    try {
      const fetchedAllergies = await fetchAllergiesByPatient(patientId);
      if (fetchedAllergies) {
        // Inicializa os valores de alergias com base nos dados do banco
        const newState = Object.keys(allergies).reduce(
          (acc, key) => {
            // Forçando a tipagem de key como keyof typeof allergies
            const typedKey = key as keyof typeof allergies;
            acc[typedKey] = String(
              fetchedAllergies[typedKey as keyof typeof fetchedAllergies] || '0'
            ); // Se não houver valor, define como '0'
            return acc;
          },
          {} as Record<keyof typeof allergies, string>
        );
        setAllergies(newState);
      }
    } catch (error) {
      console.error('Erro ao inicializar alergias:', error);
      Alert.alert('Erro', 'Não foi possível carregar as alergias.');
    }
  };

  const toggleAllergy = async (key: keyof typeof allergyNames, value: boolean) => {
    if (!selectedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

    const updatedValue = value ? '1' : '0'; // Converte o valor booleano para string '1' ou '0'

    const updatedFields: Partial<any> = {};
    updatedFields[key] = updatedValue; // Atualiza valor no formato correto

    try {
      await updateAllergy(selectedPatient.id, updatedFields); // Atualiza no banco de dados
      setAllergies((prev) => ({ ...prev, [key]: updatedValue })); // Atualiza o estado local
    } catch (error) {
      console.error('Erro ao atualizar alergia:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar as alergias.');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar Alergia</Text>
        <Text style={styles.subtitle}>Selecione um grupo de alergias.</Text>

        {/* Alimentares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Icon name="apple" size={20} color="black" /> Alimentar
          </Text>
          {(
            [
              'allergy_milk',
              'allergy_eggs',
              'allergy_beef',
              'allergy_fish',
              'allergy_shellfish',
            ] as const
          ).map((key) => (
            <View style={styles.checkboxContainer} key={key}>
              <Text>{allergyNames[key]}</Text>
              <Checkbox
                value={allergies[key] === '1'}
                onValueChange={(newValue) => toggleAllergy(key, newValue)}
              />
            </View>
          ))}
        </View>

        {/* Animais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Icon name="bug" size={20} color="black" /> Animais
          </Text>
          {(
            [
              'allergy_cat',
              'allergy_dog',
              'allergy_bee',
              'allergy_ant',
              'allergy_venomous_animals',
              'allergy_insects',
            ] as const
          ).map((key) => (
            <View style={styles.checkboxContainer} key={key}>
              <Text>{allergyNames[key]}</Text>
              <Checkbox
                value={allergies[key] === '1'}
                onValueChange={(newValue) => toggleAllergy(key, newValue)}
              />
            </View>
          ))}
        </View>

        {/* Medicamentos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Icon name="medkit" size={20} color="black" /> Medicamentos
          </Text>
          {(
            [
              'allergy_dipyrone',
              'allergy_aspirin',
              'allergy_diclofenac',
              'allergy_paracetamol',
              'allergy_penicillin',
              'allergy_magnesium_bisulphate',
              'allergy_rivaroxaban',
              'allergy_losartan_potassium',
              'allergy_metformin',
              'allergy_butylscopolamine',
            ] as const
          ).map((key) => (
            <View style={styles.checkboxContainer} key={key}>
              <Text>{allergyNames[key]}</Text>
              <Checkbox
                value={allergies[key] === '1'}
                onValueChange={(newValue) => toggleAllergy(key, newValue)}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => router.push('/allergies/AllergiesDetails')}>
          <Text style={styles.submitButtonText}>Voltar para Detalhes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterAllergies;
