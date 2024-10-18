import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import MedicationPicker from './MedicationPicker';
import MedicationResult from './MedicationResult';
import PatientInputForm from './PatientInputForm';
import { calcularMedicamento } from '../app/medications/api/CalculadoraMedicamentos';

const MedicationCalculator = () => {
  const [patientData, setPatientData] = useState<any>(null);
  const [medication, setMedication] = useState<string | null>(null);
  const [result, setResult] = useState<{ dosage: string; alertas: string[] } | null>(null);

  // Função chamada quando os dados do paciente são enviados
  const handleCalculate = (data: any) => {
    setPatientData(data);
    if (medication) {
      // Se já houver um medicamento selecionado, fazer o cálculo
      const calculatedResult = calcularMedicamento(medication, data.peso, data.idade, {
        alergias: data.alergias,
        condicoesClinicas: data.condicoesClinicas,
      });
      setResult(calculatedResult);
    }
  };

  // Função chamada quando um medicamento é selecionado
  const handleMedicationSelect = (medicamento: string) => {
    setMedication(medicamento);
    if (patientData) {
      // Se já houver dados do paciente, fazer o cálculo
      const calculatedResult = calcularMedicamento(
        medicamento,
        patientData.peso,
        patientData.idade,
        { alergias: patientData.alergias, condicoesClinicas: patientData.condicoesClinicas }
      );
      setResult(calculatedResult);
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
