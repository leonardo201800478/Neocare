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
        placeholder="Tosse há Quanto Tempo (dias)"
        value={data.tosse_ha_quanto_tempo}
        onChangeText={(text) => onChange('tosse_ha_quanto_tempo', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Respirações por Minuto"
        value={data.numero_respiracoes_por_minuto}
        onChangeText={(text) => onChange('numero_respiracoes_por_minuto', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Respiração Rápida? (Sim/Não)"
        value={data.respiracao_rapida}
        onChangeText={(text) => onChange('respiracao_rapida', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tiragem Subcostal (Sim/Não)"
        value={data.tiragem_subcostal}
        onChangeText={(text) => onChange('tiragem_subcostal', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estridor (Sim/Não)"
        value={data.estridor}
        onChangeText={(text) => onChange('estridor', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sibilância (Sim/Não)"
        value={data.sibilancia}
        onChangeText={(text) => onChange('sibilancia', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Sibilância há Quanto Tempo (dias)"
        value={data.sibilancia_ha_quanto_tempo}
        onChangeText={(text) => onChange('sibilancia_ha_quanto_tempo', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Primeira Crise? (Sim/Não)"
        value={data.primeira_crise}
        onChangeText={(text) => onChange('primeira_crise', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Uso de Broncodilatador nas últimas 24h (Sim/Não)"
        value={data.broncodilatador}
        onChangeText={(text) => onChange('broncodilatador', text)}
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
