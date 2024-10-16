import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

type PatientInputFormProps = {
  onCalculate: (data: {
    peso: number;
    idade: number;
    alergias: string[];
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
      // Verifique se a função onCalculate foi passada corretamente
      if (typeof onCalculate === 'function') {
        onCalculate({
          peso: parseFloat(peso),
          idade: parseInt(idade, 10),
          alergias: alergias.split(',').map((item) => item.trim()),
          condicoesClinicas: condicoesClinicas.split(',').map((item) => item.trim()),
        });
      } else {
        console.error('onCalculate não é uma função válida');
      }
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
