import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';

import { useAllergy } from '../context/AllergiesContext';
import { usePatient } from '../context/PatientContext';
import styles from './styles/RegisterAllergiesStyles';

const RegisterAllergies = () => {
  const { createAllergy, updateAllergy, fetchAllergiesByPatient } = useAllergy();
  const { selectedPatient } = usePatient();
  const router = useRouter();

  const [foodAllergies, setFoodAllergies] = useState({
    milk: false,
    eggs: false,
    beef: false,
    fish: false,
    shellfish: false,
  });

  const [animalAllergies, setAnimalAllergies] = useState({
    cat: false,
    dog: false,
    bee: false,
    ant: false,
    venomous_animals: false,
    insects: false,
  });

  const [medicationAllergies, setMedicationAllergies] = useState({
    dipyrone: false,
    aspirin: false,
    diclofenac: false,
    paracetamol: false,
    penicillin: false,
    magnesium_bisulphate: false,
    rivaroxaban: false,
    losartan_potassium: false,
    metformin: false,
    butylscopolamine: false,
  });

  useEffect(() => {
    if (selectedPatient) {
      initializeAllergies(selectedPatient.id);
    }
  }, [selectedPatient]);

  const initializeAllergies = async (patientId: string) => {
    try {
      const allergies = await fetchAllergiesByPatient(patientId);

      if (!allergies) {
        // Cria um registro inicial com tudo setado para '0'
        const newAllergies = {
          allergy_milk: 0,
          allergy_eggs: 0,
          allergy_beef: 0,
          allergy_fish: 0,
          allergy_shellfish: 0,
          allergy_cat: 0,
          allergy_dog: 0,
          allergy_bee: 0,
          allergy_ant: 0,
          allergy_venomous_animals: 0,
          allergy_insects: 0,
          allergy_dipyrone: 0,
          allergy_aspirin: 0,
          allergy_diclofenac: 0,
          allergy_paracetamol: 0,
          allergy_penicillin: 0,
          allergy_magnesium_bisulphate: 0,
          allergy_rivaroxaban: 0,
          allergy_losartan_potassium: 0,
          allergy_metformin: 0,
          allergy_butylscopolamine: 0,
        };
        await createAllergy(newAllergies, patientId, 'DOCTOR_ID');
      } else {
        // Inicializar os estados com base nas alergias do paciente
        setFoodAllergies({
          milk: allergies.allergy_milk === 1,
          eggs: allergies.allergy_eggs === 1,
          beef: allergies.allergy_beef === 1,
          fish: allergies.allergy_fish === 1,
          shellfish: allergies.allergy_shellfish === 1,
        });
        setAnimalAllergies({
          cat: allergies.allergy_cat === 1,
          dog: allergies.allergy_dog === 1,
          bee: allergies.allergy_bee === 1,
          ant: allergies.allergy_ant === 1,
          venomous_animals: allergies.allergy_venomous_animals === 1,
          insects: allergies.allergy_insects === 1,
        });
        setMedicationAllergies({
          dipyrone: allergies.allergy_dipyrone === 1,
          aspirin: allergies.allergy_aspirin === 1,
          diclofenac: allergies.allergy_diclofenac === 1,
          paracetamol: allergies.allergy_paracetamol === 1,
          penicillin: allergies.allergy_penicillin === 1,
          magnesium_bisulphate: allergies.allergy_magnesium_bisulphate === 1,
          rivaroxaban: allergies.allergy_rivaroxaban === 1,
          losartan_potassium: allergies.allergy_losartan_potassium === 1,
          metformin: allergies.allergy_metformin === 1,
          butylscopolamine: allergies.allergy_butylscopolamine === 1,
        });
      }
    } catch (error) {
      console.error('Erro ao inicializar alergias:', error);
      Alert.alert('Erro', 'Não foi possível inicializar as alergias do paciente.');
    }
  };

  const toggleAllergy = async (
    type: 'food' | 'animal' | 'medication',
    key: string,
    value: boolean
  ) => {
    if (!selectedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

    const updatedFields: Partial<any> = {};
    updatedFields[`allergy_${key}`] = value ? 1 : 0;

    try {
      await updateAllergy(selectedPatient.id, updatedFields); // Atualiza diretamente no banco
      // Atualizando o estado local
      if (type === 'food') {
        setFoodAllergies((prev) => ({ ...prev, [key]: value }));
      } else if (type === 'animal') {
        setAnimalAllergies((prev) => ({ ...prev, [key]: value }));
      } else if (type === 'medication') {
        setMedicationAllergies((prev) => ({ ...prev, [key]: value }));
      }
    } catch (error) {
      console.error('Erro ao atualizar alergia:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar as alergias.');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Alergias</Text>
        <Text style={styles.subtitle}>Selecione um grupo de alergias</Text>

        {/* Alimentares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alimentares</Text>
          <View style={styles.checkboxContainer}>
            <Text>Leite e derivados</Text>
            <Checkbox
              value={foodAllergies.milk}
              onValueChange={(newValue) => toggleAllergy('food', 'milk', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Ovos</Text>
            <Checkbox
              value={foodAllergies.eggs}
              onValueChange={(newValue) => toggleAllergy('food', 'eggs', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Carne bovina</Text>
            <Checkbox
              value={foodAllergies.beef}
              onValueChange={(newValue) => toggleAllergy('food', 'beef', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Peixe</Text>
            <Checkbox
              value={foodAllergies.fish}
              onValueChange={(newValue) => toggleAllergy('food', 'fish', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Crustáceos</Text>
            <Checkbox
              value={foodAllergies.shellfish}
              onValueChange={(newValue) => toggleAllergy('food', 'shellfish', newValue)}
            />
          </View>
        </View>

        {/* Animais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Animais</Text>
          <View style={styles.checkboxContainer}>
            <Text>Gato</Text>
            <Checkbox
              value={animalAllergies.cat}
              onValueChange={(newValue) => toggleAllergy('animal', 'cat', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Cachorro</Text>
            <Checkbox
              value={animalAllergies.dog}
              onValueChange={(newValue) => toggleAllergy('animal', 'dog', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Abelha</Text>
            <Checkbox
              value={animalAllergies.bee}
              onValueChange={(newValue) => toggleAllergy('animal', 'bee', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Formiga</Text>
            <Checkbox
              value={animalAllergies.ant}
              onValueChange={(newValue) => toggleAllergy('animal', 'ant', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Animais peçonhentos</Text>
            <Checkbox
              value={animalAllergies.venomous_animals}
              onValueChange={(newValue) => toggleAllergy('animal', 'venomous_animals', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Insetos</Text>
            <Checkbox
              value={animalAllergies.insects}
              onValueChange={(newValue) => toggleAllergy('animal', 'insects', newValue)}
            />
          </View>
        </View>

        {/* Medicamentos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medicamentos</Text>
          <View style={styles.checkboxContainer}>
            <Text>Dipirona</Text>
            <Checkbox
              value={medicationAllergies.dipyrone}
              onValueChange={(newValue) => toggleAllergy('medication', 'dipyrone', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Aspirina</Text>
            <Checkbox
              value={medicationAllergies.aspirin}
              onValueChange={(newValue) => toggleAllergy('medication', 'aspirin', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Diclofenaco</Text>
            <Checkbox
              value={medicationAllergies.diclofenac}
              onValueChange={(newValue) => toggleAllergy('medication', 'diclofenac', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Paracetamol</Text>
            <Checkbox
              value={medicationAllergies.paracetamol}
              onValueChange={(newValue) => toggleAllergy('medication', 'paracetamol', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Penicilina</Text>
            <Checkbox
              value={medicationAllergies.penicillin}
              onValueChange={(newValue) => toggleAllergy('medication', 'penicillin', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Magnésio bisulfato</Text>
            <Checkbox
              value={medicationAllergies.magnesium_bisulphate}
              onValueChange={(newValue) =>
                toggleAllergy('medication', 'magnesium_bisulphate', newValue)
              }
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Rivaroxabana</Text>
            <Checkbox
              value={medicationAllergies.rivaroxaban}
              onValueChange={(newValue) => toggleAllergy('medication', 'rivaroxaban', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Losartana</Text>
            <Checkbox
              value={medicationAllergies.losartan_potassium}
              onValueChange={(newValue) =>
                toggleAllergy('medication', 'losartan_potassium', newValue)
              }
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Metformina</Text>
            <Checkbox
              value={medicationAllergies.metformin}
              onValueChange={(newValue) => toggleAllergy('medication', 'metformin', newValue)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Butilbrometo de escopolamina</Text>
            <Checkbox
              value={medicationAllergies.butylscopolamine}
              onValueChange={(newValue) =>
                toggleAllergy('medication', 'butylscopolamine', newValue)
              }
            />
          </View>
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
