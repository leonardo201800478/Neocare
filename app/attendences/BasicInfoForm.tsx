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

      {/* Hipertensão */}
      <Text style={styles.label}>Hipertenso?:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva se o paciente é ou não hipertenso"
        value={data.hipertensao}
        onChangeText={(text) => onChange('hipertensao', text)}
        multiline
      />

      {/* Diabetes */}
      <Text style={styles.label}>Diabetes?:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva se o paciente é ou não diabético"
        value={data.diabetes}
        onChangeText={(text) => onChange('diabetes', text)}
        multiline
      />
      {/* Doenca Hepática */}
      <Text style={styles.label}>Doenca Hepática?:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva se o paciente tem doenca hepática"
        value={data.doenca_hepatica}
        onChangeText={(text) => onChange('doenca_hepatica', text)}
        multiline
      />

      {/* Deficiencia G6PD */}
      <Text style={styles.label}>Deficiencia G6PD?:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva se o paciente é ou não diabético"
        value={data.deficiencia_g6pd}
        onChangeText={(text) => onChange('deficiencia_g6pd', text)}
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
