// app/attendences/VitalInfoForm.tsx

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { VitalInfo } from './types';

interface VitalInfoProps {
  data: VitalInfo;
  onChange: (field: keyof VitalInfo, value: string) => void;
}

const VitalInfoForm: React.FC<VitalInfoProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      {/* Peso (kg) */}
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 70.5"
        value={data.peso_kg}
        onChangeText={(text) => {
          // Tratamento para converter vírgula em ponto decimal e validar se é um número
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('peso_kg', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      {/* Comprimento (cm) */}
      <Text style={styles.label}>Comprimento (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150.5"
        value={data.comprimento_cm}
        onChangeText={(text) => {
          // Tratamento para converter vírgula em ponto decimal e validar se é um número
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('comprimento_cm', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      {/* Perímetro Cefálico (cm) */}
      <Text style={styles.label}>Perímetro Cefálico (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 35.0"
        value={data.perimetro_cefalico_cm}
        onChangeText={(text) => {
          // Tratamento para converter vírgula em ponto decimal e validar se é um número
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('perimetro_cefalico_cm', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      {/* Número de Respirações por Minuto */}
      <Text style={styles.label}>Número de Respirações por Minuto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 18"
        value={data.numero_respiracoes_por_minuto}
        onChangeText={(text) => {
          // Validar para permitir apenas números inteiros
          if (/^\d*$/.test(text)) {
            onChange('numero_respiracoes_por_minuto', text);
          }
        }}
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 8,
    fontSize: 16,
  },
});

export default VitalInfoForm;
