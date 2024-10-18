import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
  Switch,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles/AllergiesStyles'; // Substituir este arquivo pelo novo estilo atualizado
import { useAllergies } from '../context/AllergiesContext';
import { useDoctor } from '../context/DoctorContext';
import { usePatient } from '../context/PatientContext';

// Nomes das alergias em português
const allergyNames = {
  allergy_milk: 'Leite e derivados',
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
  allergy_aspirin: 'Aspirina',
  allergy_diclofenac: 'Diclofenaco',
  allergy_paracetamol: 'Paracetamol',
  allergy_penicillin: 'Penicilina',
  allergy_magnesium_bisulphate: 'Magnésio bisulfato',
  allergy_rivaroxaban: 'Rivaroxabana',
  allergy_losartan_potassium: 'Losartana',
  allergy_metformin: 'Metformina',
  allergy_butylscopolamine: 'Butilescopolamina',
  allergy_cephalosporin: 'Cefalosporina',
  allergy_salbutamol: 'Salbutamol',
  allergy_acido_folico: 'Ácido Fólico',
  allergy_isotretinoina: 'Isotretinoína',
};

const RegisterAllergies = () => {
  const router = useRouter();
  const { selectedPatient } = usePatient();
  const { selectedDoctor } = useDoctor();
  const { addOrUpdateAllergy, fetchAllergiesByPatient } = useAllergies();

  // Estados para alergias com valores "yes" ou "no"
  const [allergyStates, setAllergyStates] = useState<Record<string, string>>({
    allergy_milk: 'no',
    allergy_eggs: 'no',
    allergy_beef: 'no',
    allergy_fish: 'no',
    allergy_shellfish: 'no',
    allergy_cat: 'no',
    allergy_dog: 'no',
    allergy_bee: 'no',
    allergy_ant: 'no',
    allergy_venomous_animals: 'no',
    allergy_insects: 'no',
    allergy_dipyrone: 'no',
    allergy_aspirin: 'no',
    allergy_diclofenac: 'no',
    allergy_paracetamol: 'no',
    allergy_penicillin: 'no',
    allergy_magnesium_bisulphate: 'no',
    allergy_rivaroxaban: 'no',
    allergy_losartan_potassium: 'no',
    allergy_metformin: 'no',
    allergy_butylscopolamine: 'no',
    allergy_cephalosporin: 'no',
    allergy_salbutamol: 'no',
    allergy_acido_folico: 'no',
    allergy_isotretinoina: 'no',
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar alergias e configurar os switches com os valores existentes
  const loadAllergies = async () => {
    if (!selectedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

    setLoading(true);

    try {
      const patientAllergies = await fetchAllergiesByPatient(selectedPatient.id);

      if (patientAllergies && patientAllergies.length > 0) {
        const allergyData = patientAllergies[0]; // Pegamos o primeiro registro de alergias do paciente
        console.log('Alergias carregadas:', allergyData);

        // Atualiza o estado com as alergias carregadas
        setAllergyStates({
          allergy_milk: allergyData.allergy_milk || 'no',
          allergy_eggs: allergyData.allergy_eggs || 'no',
          allergy_beef: allergyData.allergy_beef || 'no',
          allergy_fish: allergyData.allergy_fish || 'no',
          allergy_shellfish: allergyData.allergy_shellfish || 'no',
          allergy_cat: allergyData.allergy_cat || 'no',
          allergy_dog: allergyData.allergy_dog || 'no',
          allergy_bee: allergyData.allergy_bee || 'no',
          allergy_ant: allergyData.allergy_ant || 'no',
          allergy_venomous_animals: allergyData.allergy_venomous_animals || 'no',
          allergy_insects: allergyData.allergy_insects || 'no',
          allergy_dipyrone: allergyData.allergy_dipyrone || 'no',
          allergy_aspirin: allergyData.allergy_aspirin || 'no',
          allergy_diclofenac: allergyData.allergy_diclofenac || 'no',
          allergy_paracetamol: allergyData.allergy_paracetamol || 'no',
          allergy_penicillin: allergyData.allergy_penicillin || 'no',
          allergy_magnesium_bisulphate: allergyData.allergy_magnesium_bisulphate || 'no',
          allergy_rivaroxaban: allergyData.allergy_rivaroxaban || 'no',
          allergy_losartan_potassium: allergyData.allergy_losartan_potassium || 'no',
          allergy_metformin: allergyData.allergy_metformin || 'no',
          allergy_butylscopolamine: allergyData.allergy_butylscopolamine || 'no',
          allergy_cephalosporin: allergyData.allergy_cephalosporin || 'no',
          allergy_salbutamol: allergyData.allergy_salbutamol || 'no',
          allergy_acido_folico: allergyData.allergy_acido_folico || 'no',
          allergy_isotretinoina: allergyData.allergy_isotretinoina || 'no',
        });
      } else {
        console.log('Nenhuma alergia cadastrada para este paciente.');
      }
    } catch (error) {
      console.error('Erro ao carregar alergias:', error);
      Alert.alert('Erro', 'Não foi possível carregar as alergias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllergies();
  }, [selectedPatient]);

  const handleToggleSwitch = (key: string) => {
    setAllergyStates((prevState) => ({
      ...prevState,
      [key]: prevState[key] === 'yes' ? 'no' : 'yes',
    }));
  };

  const handleRegisterAllergy = async () => {
    if (!selectedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

    if (!selectedDoctor) {
      Alert.alert('Erro', 'Médico não encontrado.');
      return;
    }

    try {
      await addOrUpdateAllergy(allergyStates, selectedDoctor.id, selectedPatient.id);
      Alert.alert('Sucesso', 'Alergias registradas com sucesso!');
    } catch {
      Alert.alert('Erro', 'Erro ao registrar alergias.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Cadastrar Alergias</Text>
        {Object.keys(allergyStates).map((allergy) => (
          <View key={allergy} style={styles.switchContainer}>
            <Text style={styles.label}>{allergyNames[allergy as keyof typeof allergyNames]}</Text>
            <Switch
              value={allergyStates[allergy] === 'yes'}
              onValueChange={() => handleToggleSwitch(allergy)}
            />
          </View>
        ))}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegisterAllergy}>
            <Icon name="check" size={16} color="#FFF" />
            <Text style={styles.buttonText}>Registrar Alergias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={() => router.back()}>
            <Text style={styles.exitButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterAllergies;
