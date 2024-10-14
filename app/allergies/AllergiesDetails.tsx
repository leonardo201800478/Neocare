import { format } from 'date-fns'; // Para formatar datas
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { useAllergies } from '../context/AllergiesContext';
import { usePatient } from '../context/PatientContext';
import styles from './styles/AllergiesDetailsStyles';

const AllergiesDetails = () => {
  const router = useRouter();
  const { selectedPatient } = usePatient();
  const { fetchAllergiesByPatient } = useAllergies();

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
      if (patientAllergies && patientAllergies.length > 0) {
        setAllergies(patientAllergies[0]); // Assume-se que existe apenas um registro de alergias por paciente
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

  const renderAllergyItem = (label: string, value: string) => {
    return value === 'yes' ? <Text style={styles.allergyItem}>{label}</Text> : null;
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

      {/* Exibe a data da última atualização */}
      {allergies?.updated_at && (
        <Text style={styles.updateText}>
          Última atualização: {format(new Date(allergies.updated_at), 'dd/MM/yyyy')}
        </Text>
      )}

      {/* Verifica se o paciente possui alergias cadastradas */}
      {allergies ? (
        <View style={styles.allergiesContainer}>
          <Text style={styles.sectionTitle}>Alergias</Text>
          {/* Exibir apenas as alergias marcadas como 'yes' */}
          {renderAllergyItem('Leite e derivados', allergies.allergy_milk)}
          {renderAllergyItem('Ovos', allergies.allergy_eggs)}
          {renderAllergyItem('Carne bovina', allergies.allergy_beef)}
          {renderAllergyItem('Peixe', allergies.allergy_fish)}
          {renderAllergyItem('Crustáceos', allergies.allergy_shellfish)}
          {renderAllergyItem('Gato', allergies.allergy_cat)}
          {renderAllergyItem('Cachorro', allergies.allergy_dog)}
          {renderAllergyItem('Abelha', allergies.allergy_bee)}
          {renderAllergyItem('Formiga', allergies.allergy_ant)}
          {renderAllergyItem('Animais peçonhentos', allergies.allergy_venomous_animals)}
          {renderAllergyItem('Insetos', allergies.allergy_insects)}
          {renderAllergyItem('Dipirona', allergies.allergy_dipyrone)}
          {renderAllergyItem('Aspirina', allergies.allergy_aspirin)}
          {renderAllergyItem('Diclofenaco', allergies.allergy_diclofenac)}
          {renderAllergyItem('Paracetamol', allergies.allergy_paracetamol)}
          {renderAllergyItem('Penicilina', allergies.allergy_penicillin)}
          {renderAllergyItem('Magnésio bisulfato', allergies.allergy_magnesium_bisulphate)}
          {renderAllergyItem('Rivaroxabana', allergies.allergy_rivaroxaban)}
          {renderAllergyItem('Losartana', allergies.allergy_losartan_potassium)}
          {renderAllergyItem('Metformina', allergies.allergy_metformin)}
          {renderAllergyItem('Butilbrometo de escopolamina', allergies.allergy_butylscopolamine)}
          {renderAllergyItem('Cefalosporina', allergies.allergy_cephalosporin)}
          {renderAllergyItem('Salbutamol', allergies.allergy_salbutamol)}
          {renderAllergyItem('Ácido fólico', allergies.allergy_acido_folico)}
          {renderAllergyItem('Isotretinoína', allergies.allergy_isotretinoina)}
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
