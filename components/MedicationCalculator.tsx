import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import MedicationPicker from './MedicationPicker'; // Componente para selecionar o medicamento
import MedicationResult from './MedicationResult'; // Componente para exibir o resultado
import PatientInputForm from './PatientInputForm'; // Componente para entrada dos dados do paciente
import { calcularMedicamento } from '../app/medications/api/CalculadoraMedicamentos'; // Função de cálculo de medicamento

const MedicationCalculator = () => {
  const [patientData, setPatientData] = useState<any>(null); // Armazenar os dados do paciente
  const [medication, setMedication] = useState<string | null>(null); // Armazenar o medicamento selecionado
  const [result, setResult] = useState<{ dosage: string; alertas: string[] } | null>(null); // Armazenar o resultado do cálculo

  // Função chamada quando os dados do paciente são enviados
  const handleCalculate = (data: any) => {
    setPatientData(data); // Armazenar os dados do paciente
    if (medication) {
      // Se já houver um medicamento selecionado, fazer o cálculo
      const calculatedResult = calcularMedicamento(medication, data.peso, data.idade, {
        alergias: data.alergias,
        condicoesClinicas: data.condicoesClinicas,
      });
      setResult(calculatedResult); // Armazenar o resultado do cálculo
    }
  };

  // Função chamada quando um medicamento é selecionado
  const handleMedicationSelect = (medicamento: string) => {
    setMedication(medicamento); // Armazenar o medicamento selecionado
    if (patientData) {
      // Se já houver dados do paciente, fazer o cálculo
      const calculatedResult = calcularMedicamento(
        medicamento,
        patientData.peso,
        patientData.idade,
        { alergias: patientData.alergias, condicoesClinicas: patientData.condicoesClinicas }
      );
      setResult(calculatedResult); // Armazenar o resultado do cálculo
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PatientInputForm onCalculate={handleCalculate} /> {/* Entrada dos dados do paciente */}
      <MedicationPicker onSelect={handleMedicationSelect} /> {/* Seleção de medicamento */}
      {result ? (
        <MedicationResult result={result} />
      ) : (
        <Text style={styles.noResult}>Sem resultados no momento</Text>
      )}{' '}
      {/* Exibe o resultado */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noResult: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
  },
});

export default MedicationCalculator;
