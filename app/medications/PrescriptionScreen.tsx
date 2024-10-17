// app/medications/PrescriptionScreen.tsx

import { useLocalSearchParams } from 'expo-router'; // Correção: useLocalSearchParams para acessar os parâmetros
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

interface MedicationRecord {
  medication: string;
  dosage: string;
}

interface PatientInfo {
  name: string;
  cpf: string;
  age: string;
}

interface DoctorInfo {
  name: string;
}

const PrescriptionScreen: React.FC = () => {
  const { dosageRecords, patient, doctor } = useLocalSearchParams<{
    dosageRecords: string;
    patient: string;
    doctor: string;
  }>();

  // Parse dos dados recebidos que são strings JSON
  const parsedDosageRecords: MedicationRecord[] = JSON.parse(dosageRecords);
  const parsedPatient: PatientInfo = JSON.parse(patient);
  const parsedDoctor: DoctorInfo = JSON.parse(doctor);

  const handlePrint = () => {
    // Função para imprimir ou compartilhar a receita
    console.log('Imprimindo receita...');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Receita Médica</Text>

      <View style={styles.section}>
        <Text style={styles.patientInfo}>Nome: {parsedPatient.name}</Text>
        <Text style={styles.patientInfo}>CPF: {parsedPatient.cpf}</Text>
        <Text style={styles.patientInfo}>Idade: {parsedPatient.age}</Text>
      </View>

      <View style={styles.medicationsList}>
        {parsedDosageRecords.map((record: MedicationRecord, index: number) => (
          <View key={index} style={styles.medicationItem}>
            <Text style={styles.medicationName}>{record.medication}</Text>
            <Text style={styles.medicationDosage}>{record.dosage}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.doctorName}>Prescrito por: Dr. {parsedDoctor.name}</Text>

      <Button title="Imprimir Receita" onPress={handlePrint} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  patientInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  medicationsList: {
    marginBottom: 20,
  },
  medicationItem: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicationDosage: {
    fontSize: 14,
  },
  doctorName: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PrescriptionScreen;
