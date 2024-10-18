import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { useMedicaments } from '../app/context/MedicamentsContext';

const ManualDataForm = () => {
  const { provideManualData } = useMedicaments();

  const [patientName, setPatientName] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientCpf, setPatientCpf] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [alergias, setAlergias] = useState('');
  const [condicoesClinicas, setCondicoesClinicas] = useState('');

  const handleSubmit = () => {
    // Mapeia as alergias para um objeto { alergia1: true, alergia2: true, ... }
    const alergiasMap = alergias
      .split(',')
      .map((item) => item.trim())
      .reduce(
        (acc, alergia) => {
          acc[alergia] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );

    provideManualData({
      patient: {
        id: 'manual-patient-id',
        name: patientName,
        birth_date: patientBirthDate,
        cpf: patientCpf,
      },
      doctor: {
        id: 'manual-doctor-id',
        name: doctorName,
      },
      vitals: {
        peso_kg: parseFloat(peso),
        comprimento_cm: parseFloat(altura),
      },
      allergies: alergiasMap,
      attendance: {
        hipertensao: condicoesClinicas.includes('Hipertensão') ? 'Sim' : 'Não',
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Paciente</Text>
      <TextInput
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
        placeholder="Digite o nome do paciente"
      />

      <Text style={styles.label}>Data de Nascimento do Paciente</Text>
      <TextInput
        style={styles.input}
        value={patientBirthDate}
        onChangeText={setPatientBirthDate}
        placeholder="AAAA-MM-DD"
      />

      <Text style={styles.label}>CPF do Paciente</Text>
      <TextInput
        style={styles.input}
        value={patientCpf}
        onChangeText={setPatientCpf}
        placeholder="Digite o CPF do paciente"
      />

      <Text style={styles.label}>Nome do Médico</Text>
      <TextInput
        style={styles.input}
        value={doctorName}
        onChangeText={setDoctorName}
        placeholder="Digite o nome do médico"
      />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        placeholder="Digite o peso"
      />

      <Text style={styles.label}>Altura (cm)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
        placeholder="Digite a altura"
      />

      <Text style={styles.label}>Alergias (separadas por vírgulas)</Text>
      <TextInput
        style={styles.input}
        value={alergias}
        onChangeText={setAlergias}
        placeholder="Ex: Penicilina, AINEs"
      />

      <Text style={styles.label}>Condições Clínicas</Text>
      <TextInput
        style={styles.input}
        value={condicoesClinicas}
        onChangeText={setCondicoesClinicas}
        placeholder="Ex: Hipertensão, Diabetes"
      />

      <Button title="Enviar Dados" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default ManualDataForm;
