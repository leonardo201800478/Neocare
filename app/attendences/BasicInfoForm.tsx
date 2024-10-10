// app/attendences/BasicInfoForm.tsx

import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { BasicInfo } from './types';

interface BasicInfoProps {
  data: BasicInfo;
  onChange: (field: keyof BasicInfo, value: string) => void;
}

const BasicInfoForm: React.FC<BasicInfoProps> = ({ data, onChange }) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações Básicas do Paciente</Text>

      {/* Primeira Consulta (Sim/Não) */}
      <Text style={styles.label}>Primeira Consulta:</Text>
      <Picker
        selectedValue={data.primeira_consulta}
        onValueChange={(value) => onChange('primeira_consulta', value)}
        style={styles.picker}>
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Consulta de Retorno (Sim/Não) */}
      <Text style={styles.label}>Consulta de Retorno:</Text>
      <Picker
        selectedValue={data.consulta_retorno}
        onValueChange={(value) => onChange('consulta_retorno', value)}
        style={styles.picker}>
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Motivo da Consulta */}
      <Text style={styles.label}>Motivo da Consulta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o motivo da consulta"
        value={data.motivo_consulta}
        onChangeText={(text) => onChange('motivo_consulta', text)}
        multiline
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
  picker: {
    marginBottom: 20,
    padding: 8,
  },
});

export default BasicInfoForm;
