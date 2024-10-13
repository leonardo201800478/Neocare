import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { useAllergy } from '../context/AllergiesContext';
import { usePatient } from '../context/PatientContext';
import styles from './styles/AllergiesDetailsStyles';

const AllergiesDetails = () => {
  const router = useRouter();
  const { selectedPatient } = usePatient();
  const { fetchAllergiesByPatient } = useAllergy();

  const [allergies, setAllergies] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedPatient) {
      loadAllergies(selectedPatient.id);
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
      router.replace('/(tabs)/patients/PacienteDetails');
    }
  }, [selectedPatient]);

  const loadAllergies = async (patientId: string) => {
    setLoading(true);
    try {
      const patientAllergies = await fetchAllergiesByPatient(patientId);
      if (patientAllergies) {
        setAllergies(patientAllergies);
      } else {
        setAllergies(null); // Tratar a ausência de alergias
      }
    } catch (error) {
      console.error('Erro ao buscar alergias:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar as alergias do paciente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando alergias...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes das Alergias</Text>

      {/* Exibe o nome do paciente */}
      {selectedPatient && <Text style={styles.patientName}>Paciente: {selectedPatient.name}</Text>}

      {/* Verifica se o paciente possui alergias cadastradas */}
      {allergies ? (
        <View style={styles.allergiesContainer}>
          {/* Exibir alergias alimentares */}
          <Text style={styles.sectionTitle}>Alimentar</Text>
          {allergies.milk_allergy === 1 && (
            <Text style={styles.allergyItem}>Leite e derivados</Text>
          )}
          {allergies.eggs_allergy === 1 && <Text style={styles.allergyItem}>Ovos</Text>}
          {allergies.beef_allergy === 1 && <Text style={styles.allergyItem}>Carne bovina</Text>}
          {allergies.fish_allergy === 1 && <Text style={styles.allergyItem}>Peixe</Text>}
          {allergies.shellfish_allergy === 1 && <Text style={styles.allergyItem}>Crustáceos</Text>}

          {/* Exibir alergias a animais */}
          <Text style={styles.sectionTitle}>Animais</Text>
          {allergies.cat_allergy === 1 && <Text style={styles.allergyItem}>Gato</Text>}
          {allergies.dog_allergy === 1 && <Text style={styles.allergyItem}>Cachorro</Text>}
          {allergies.bee_allergy === 1 && <Text style={styles.allergyItem}>Abelha</Text>}
          {allergies.ant_allergy === 1 && <Text style={styles.allergyItem}>Formiga</Text>}
          {allergies.venomous_animal_allergy === 1 && (
            <Text style={styles.allergyItem}>Animais peçonhentos</Text>
          )}
          {allergies.insects_allergy === 1 && <Text style={styles.allergyItem}>Insetos</Text>}

          {/* Exibir alergias a medicamentos */}
          <Text style={styles.sectionTitle}>Medicamentos</Text>
          {allergies.dipyrone_allergy === 1 && <Text style={styles.allergyItem}>Dipirona</Text>}
          {allergies.aspirin_allergy === 1 && <Text style={styles.allergyItem}>Aspirina</Text>}
          {allergies.diclofenac_allergy === 1 && (
            <Text style={styles.allergyItem}>Diclofenaco</Text>
          )}
          {allergies.paracetamol_allergy === 1 && (
            <Text style={styles.allergyItem}>Paracetamol</Text>
          )}
          {allergies.penicillin_allergy === 1 && <Text style={styles.allergyItem}>Penicilina</Text>}
          {allergies.magnesium_bisulphate_allergy === 1 && (
            <Text style={styles.allergyItem}>Magnésio bisulfato</Text>
          )}
          {allergies.rivaroxaban_allergy === 1 && (
            <Text style={styles.allergyItem}>Rivaroxabana</Text>
          )}
          {allergies.losartan_allergy === 1 && <Text style={styles.allergyItem}>Losartana</Text>}
          {allergies.metformin_allergy === 1 && <Text style={styles.allergyItem}>Metformina</Text>}
          {allergies.butylscopolamine_allergy === 1 && (
            <Text style={styles.allergyItem}>Butilbrometo de escopolamina</Text>
          )}
        </View>
      ) : (
        <Text style={styles.noAllergiesText}>Nenhuma alergia cadastrada para este paciente.</Text>
      )}

      {/* Botões de navegação */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/patients/PacienteDetails')}>
          <Text style={styles.buttonText}>Voltar para Detalhes do Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/allergies/RegisterAllergies')}>
          <Text style={styles.buttonText}>Cadastrar Nova Alergia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AllergiesDetails;
