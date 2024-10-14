import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { useMedicaments } from '../context/MedicamentsContext';
import styles from './styles/MedicamentosStyles';

const MedicamentosPaciente = ({ patientId }: { patientId: string }) => {
  const router = useRouter(); // Hook do router
  const { medications, fetchMedicationsByPatient } = useMedicaments();

  useEffect(() => {
    fetchMedicationsByPatient(patientId);
  }, [patientId]);

  // Função para navegar para a tela de cálculo de medicação, mesmo sem dados completos
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
      {medications.length > 0
        ? medications.map((medication) => (
            <View key={medication.id} style={styles.medicationItem}>
              <Text style={styles.label}>{medication.name}</Text>
              <Text>Dosagem: {medication.dosage_info}</Text>
              <Text>Indicações: {medication.indication}</Text>
            </View>
          ))
        : // Nenhum aviso para a ausência de medicamentos
          null}
      <TouchableOpacity style={styles.button} onPress={handleNavigateToCalculation}>
        <Text style={styles.buttonText}>Calcular Medicação</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/patients/PacienteDetails')}>
        <Text style={styles.buttonText}>Voltar para Detalhes do Paciente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MedicamentosPaciente;
