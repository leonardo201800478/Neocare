// app/attendences/VitalInfoForm.tsx

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { VitalInfo } from './types'; // Importando o tipo

interface VitalInfoProps {
  data: VitalInfo;
  onChange: (field: keyof VitalInfo, value: string) => void;
}
const VitalInfoForm: React.FC<VitalInfoProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={data.peso_kg}
        onChangeText={(text) => onChange('peso_kg', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Comprimento (cm)"
        value={data.comprimento_cm}
        onChangeText={(text) => onChange('comprimento_cm', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Perímetro Cefálico (cm)"
        value={data.perimetro_cefalico_cm}
        onChangeText={(text) => onChange('perimetro_cefalico_cm', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Respirações por Minuto"
        value={data.numero_respiracoes_por_minuto}
        onChangeText={(text) => onChange('numero_respiracoes_por_minuto', text)}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 8,
  },
});

export default VitalInfoForm;
