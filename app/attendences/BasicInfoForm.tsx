// app/attendences/BasicInfoForm.tsx

import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from './styles/AttendanceStyles'; // Estilização separada
import { BasicInfo } from './types'; // Importando o tipo BasicInfo

interface BasicInfoFormProps {
  data: BasicInfo; // Estrutura de dados que o formulário vai receber
  onChange: (field: keyof BasicInfo, value: string) => void; // Função para alterar os valores
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ data, onChange }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Campo de Hipertensão */}
      <View style={styles.section}>
        <Text style={styles.label}>Hipertensão</Text>
        <Picker
          selectedValue={data.hipertensao ?? 'no'} // Valor padrão "Não"
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
          selectedValue={data.diabetes ?? 'no'} // Valor padrão "Não"
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
          selectedValue={data.doenca_hepatica ?? 'no'} // Valor padrão "Não"
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
          selectedValue={data.deficiencia_g6pd ?? 'no'} // Valor padrão "Não"
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
