import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useMedicaments } from '../context/MedicamentsContext';
import styles from './styles/MedicamentosPacienteStyles'; // Estilos separados

const MedicamentosPaciente = ({ patientId }: { patientId: string }) => {
  const router = useRouter();
  const { medications, fetchMedicationsByPatient } = useMedicaments();

  useEffect(() => {
    if (patientId) {
      fetchMedicationsByPatient(patientId);
    }
  }, [patientId]);

  // Função para navegar para a tela de cálculo de medicação
  const handleNavigateToCalculation = () => {
    if (patientId) {
      router.push(
        `/medications/CalculadoraMedicamentos/?patientId=${patientId}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Medicamentos do Paciente</Text>

      {medications.length > 0 ? (
        medications.map((medication, index) => (
          <Animatable.View
            key={medication.id}
            style={styles.medicationCard}
            animation="fadeInUp"
            delay={index * 100}>
            <View style={styles.cardHeader}>
              <Icon name="medkit" size={24} color="#4CAF50" />
              <Text style={styles.medicationName}>{medication.name}</Text>
            </View>
            <Text style={styles.label}>
              Dosagem: <Text style={styles.value}>{medication.dosage_info}</Text>
            </Text>
            <Text style={styles.label}>
              Indicações: <Text style={styles.value}>{medication.indication}</Text>
            </Text>
            {medication.contraindications && (
              <Text style={styles.label}>
                Contraindicações: <Text style={styles.value}>{medication.contraindications}</Text>
              </Text>
            )}
          </Animatable.View>
        ))
      ) : (
        <Animatable.Text animation="fadeIn" style={styles.noMedicationText}>
          Nenhum medicamento cadastrado.
        </Animatable.Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleNavigateToCalculation}>
        <Icon name="calculator" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Calcular Medicação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/patients/PacienteDetails')}>
        <Icon name="arrow-left" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Voltar para Detalhes do Paciente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MedicamentosPaciente;
