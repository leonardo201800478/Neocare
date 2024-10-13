import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useMedicaments } from '../context/MedicamentsContext';
import styles from './styles/MedicamentosStyles';

const MedicamentosPaciente = ({ patientId }: { patientId: string }) => {
  const router = useRouter(); // Hook do router
  const { medications, fetchMedicationsByPatient } = useMedicaments();

  useEffect(() => {
    fetchMedicationsByPatient(patientId);
  }, [patientId]);

  // Função para navegar para a tela de cálculo de medicação
  const handleNavigateToCalculation = () => {
    router.push(`/MedicationCalculation/${patientId}` as unknown as `${string}:${string}`);
  };

  // Função para voltar para a tela de detalhes do paciente
  const handleBackToPatientDetails = () => {
    router.push(`/(tabs)/patients/PatientDetails/${patientId}` as unknown as `${string}:${string}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Medicamentos do Paciente</Text>
      {medications.length > 0 ? (
        medications.map((medication) => (
          <View key={medication.id} style={styles.medicationItem}>
            <Text style={styles.label}>{medication.name}</Text>
            <Text>Dosagem: {medication.dosage_info}</Text>
            <Text>Indicações: {medication.indication}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhum medicamento registrado.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleNavigateToCalculation}>
        <Text style={styles.buttonText}>Calcular Medicação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBackToPatientDetails}>
        <Text style={styles.buttonText}>Voltar para Detalhes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MedicamentosPaciente;
