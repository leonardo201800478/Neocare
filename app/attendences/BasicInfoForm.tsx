import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';

import styles from './styles/AttendanceStyles';
import { BasicInfo } from './types';

interface BasicInfoFormProps {
  data: BasicInfo;
  onChange: (field: keyof BasicInfo, value: string) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ data, onChange }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Motivo da Consulta */}
      <Text style={styles.label}>Motivo da Consulta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o motivo da consulta"
        value={data.motivo_consulta}
        onChangeText={(text) => onChange('motivo_consulta', text)}
        multiline
      />
      {/* Campo de Hipertensão */}
      <View style={styles.section}>
        <Text style={styles.label}>Hipertensão</Text>
        <Picker
          selectedValue={data.hipertensao ?? 'no'}
          onValueChange={(value) => onChange('hipertensao', value)}
          style={styles.picker}>
          <Picker.Item label="Não" value="no" />
          <Picker.Item label="Sim" value="yes" />
        </Picker>
      </View>

      {/* Campo de Diabetes */}
      <View style={styles.section}>
        <Text style={styles.label}>Diabetes</Text>
        <Picker
          selectedValue={data.diabetes ?? 'no'}
          onValueChange={(value) => onChange('diabetes', value)}
          style={styles.picker}>
          <Picker.Item label="Não" value="no" />
          <Picker.Item label="Sim" value="yes" />
        </Picker>
      </View>

      {/* Campo de Doença Hepática */}
      <View style={styles.section}>
        <Text style={styles.label}>Doença Hepática</Text>
        <Picker
          selectedValue={data.doenca_hepatica ?? 'no'}
          onValueChange={(value) => onChange('doenca_hepatica', value)}
          style={styles.picker}>
          <Picker.Item label="Não" value="no" />
          <Picker.Item label="Sim" value="yes" />
        </Picker>
      </View>

      {/* Campo de Deficiência de G6PD */}
      <View style={styles.section}>
        <Text style={styles.label}>Deficiência de G6PD</Text>
        <Picker
          selectedValue={data.deficiencia_g6pd ?? 'no'}
          onValueChange={(value) => onChange('deficiencia_g6pd', value)}
          style={styles.picker}>
          <Picker.Item label="Não" value="no" />
          <Picker.Item label="Sim" value="yes" />
        </Picker>
      </View>
    </ScrollView>
  );
};

export default BasicInfoForm;
