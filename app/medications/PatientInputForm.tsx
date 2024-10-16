import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type PatientInputFormProps = {
  onCalculate: (data: {
    peso: number;
    idade: number;
    alergias: Record<string, boolean>;
    condicoesClinicas: string[];
  }) => void;
};

const PatientInputForm: React.FC<PatientInputFormProps> = ({ onCalculate }) => {
  const [peso, setPeso] = useState('');
  const [idade, setIdade] = useState('');
  const [alergias, setAlergias] = useState('');
  const [condicoesClinicas, setCondicoesClinicas] = useState('');

  // Função para enviar os dados capturados no formulário
  const handleSubmit = () => {
    if (peso && idade) {
      const alergiasMap = alergias
        .split(',')
        .map((item) => item.trim())
        .reduce((acc, alergia) => {
          acc[alergia] = true; // Define cada alergia como true
          return acc;
        }, {} as Record<string, boolean>);

      // Chama onCalculate com os dados do paciente
      onCalculate({
        peso: parseFloat(peso),
        idade: parseInt(idade),
        alergias: alergiasMap, // Alergias são passadas como objeto
        condicoesClinicas: condicoesClinicas.split(',').map((item) => item.trim()),
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Peso (kg) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        placeholder="Insira o peso"
      />

      <Text style={styles.label}>Idade (anos) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
        placeholder="Insira a idade"
      />

      <Text style={styles.label}>Alergias (separadas por vírgulas)</Text>
      <TextInput
        style={styles.input}
        value={alergias}
        onChangeText={setAlergias}
        placeholder="Ex: Penicilina, AINEs"
      />

      <Text style={styles.label}>Condições Clínicas (separadas por vírgulas)</Text>
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
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default PatientInputForm;
