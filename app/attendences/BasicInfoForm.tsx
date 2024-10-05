import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { BasicInfo } from './types'; // Importando o tipo

interface BasicInfoProps {
  data: BasicInfo;
  onChange: (field: keyof BasicInfo, value: string) => void;
}
const BasicInfoForm: React.FC<BasicInfoProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações Básicas do Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Data do Atendimento"
        value={data.data_atendimento}
        onChangeText={(text) => onChange('data_atendimento', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Primeira Consulta (Sim/Não)"
        value={data.primeira_consulta}
        onChangeText={(text) => onChange('primeira_consulta', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Consulta de Retorno (Sim/Não)"
        value={data.consulta_retorno}
        onChangeText={(text) => onChange('consulta_retorno', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo da Consulta"
        value={data.motivo_consulta}
        onChangeText={(text) => onChange('motivo_consulta', text)}
      />
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

export default BasicInfoForm;
