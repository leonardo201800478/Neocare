import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { GeneralSymptoms } from './types'; // Importando o tipo


interface GeneralSymptomsProps {
  data: GeneralSymptoms;
  onChange: (field: keyof GeneralSymptoms, value: string) => void;
}

const GeneralSymptomsForm: React.FC<GeneralSymptomsProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sintomas Gerais</Text>

      {/* Campos do formulário para sintomas gerais */}
      <TextInput
        style={styles.input}
        placeholder="Não Bebe ou Mama (Sim/Não)"
        value={data.nao_bebe_ou_mama}
        onChangeText={(text) => onChange('nao_bebe_ou_mama', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Vomita Tudo (Sim/Não)"
        value={data.vomita_tudo}
        onChangeText={(text) => onChange('vomita_tudo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Convulsões (Sim/Não)"
        value={data.convulsoes}
        onChangeText={(text) => onChange('convulsoes', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Letárgica (Sim/Não)"
        value={data.letargica}
        onChangeText={(text) => onChange('letargica', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enchimento Capilar (Sim/Não)"
        value={data.enchimento_capilar}
        onChangeText={(text) => onChange('enchimento_capilar', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Batimento de Asa (Sim/Não)"
        value={data.batimento_asa}
        onChangeText={(text) => onChange('batimento_asa', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tem Tosse (Sim/Não)"
        value={data.tem_tosse}
        onChangeText={(text) => onChange('tem_tosse', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sibilância (Sim/Não)"
        value={data.sibilancia}
        onChangeText={(text) => onChange('sibilancia', text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default GeneralSymptomsForm;
