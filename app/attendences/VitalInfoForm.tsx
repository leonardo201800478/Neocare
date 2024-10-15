// app/attendences/VitalInfoForm.tsx

import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles/AttendanceStyles';
import { VitalInfo } from './types';

interface VitalInfoProps {
  data: VitalInfo;
  onChange: (field: keyof VitalInfo, value: string) => void;
}

const VitalInfoForm: React.FC<VitalInfoProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 0.560 kg"
        value={(Number(data.peso_kg) * 1000).toString()}
        onChangeText={(text) => {
          if (!isNaN(Number(text))) {
            const pesoEmKg = (Number(text) / 1000).toFixed(3);
            onChange('peso_kg', pesoEmKg);
          }
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Comprimento (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150.5"
        value={data.comprimento_cm}
        onChangeText={(text) => {
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('comprimento_cm', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Perímetro Cefálico (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 35.0"
        value={data.perimetro_cefalico_cm}
        onChangeText={(text) => {
          const formattedText = text.replace(',', '.');
          if (!isNaN(Number(formattedText))) {
            onChange('perimetro_cefalico_cm', formattedText);
          }
        }}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Número de Respirações por Minuto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 18"
        value={data.numero_respiracoes_por_minuto}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('numero_respiracoes_por_minuto', text);
          }
        }}
        keyboardType="numeric"
      />
    </View>
  );
};

export default VitalInfoForm;
