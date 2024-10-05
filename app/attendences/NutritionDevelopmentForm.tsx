import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { NutritionDevelopment } from './types'; // Importando o tipo

interface NutritionDevelopmentProps {
  data: NutritionDevelopment;
  onChange: (field: keyof NutritionDevelopment, value: string) => void;
}

const NutritionDevelopmentForm: React.FC<NutritionDevelopmentProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrição e Desenvolvimento</Text>
      <TextInput
        style={styles.input}
        placeholder="Amamentando? (Sim/Não)"
        value={data.amamentando}
        onChangeText={(text) => onChange('amamentando', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantas Vezes Amamenta por Dia"
        value={data.quantas_vezes_amamenta}
        onChangeText={(text) => onChange('quantas_vezes_amamenta', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Amamenta à Noite? (Sim/Não)"
        value={data.amamenta_noite}
        onChangeText={(text) => onChange('amamenta_noite', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Recebe outros Líquidos/Alimentos?"
        value={data.alimentos_liquidos}
        onChangeText={(text) => onChange('alimentos_liquidos', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantas Refeições por Dia"
        value={data.quantidade_refeicoes}
        onChangeText={(text) => onChange('quantidade_refeicoes', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Alimentação"
        value={data.tipo_alimentacao}
        onChangeText={(text) => onChange('tipo_alimentacao', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mudou a Alimentação Recentemente? (Sim/Não)"
        value={data.mudou_alimentacao}
        onChangeText={(text) => onChange('mudou_alimentacao', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Como Mudou a Alimentação?"
        value={data.como_mudou_alimentacao}
        onChangeText={(text) => onChange('como_mudou_alimentacao', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Perda de Peso na Primeira Semana >10%? (Sim/Não)"
        value={data.perda_peso_primeira_semana}
        onChangeText={(text) => onChange('perda_peso_primeira_semana', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tendência de Crescimento"
        value={data.tendencia_crescimento}
        onChangeText={(text) => onChange('tendencia_crescimento', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Habilidades de Desenvolvimento"
        value={data.habilidades_desenvolvimento}
        onChangeText={(text) => onChange('habilidades_desenvolvimento', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Atividade Física (Vezes por Semana)"
        value={data.atividade_fisica_vezes_semana}
        onChangeText={(text) => onChange('atividade_fisica_vezes_semana', text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo de Atividade Física"
        value={data.tempo_atividade_fisica}
        onChangeText={(text) => onChange('tempo_atividade_fisica', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo Sedentário"
        value={data.tempo_sedentario}
        onChangeText={(text) => onChange('tempo_sedentario', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Avaliação de Violência"
        value={data.avaliacao_violencia}
        onChangeText={(text) => onChange('avaliacao_violencia', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Outros Problemas"
        value={data.outros_problemas}
        onChangeText={(text) => onChange('outros_problemas', text)}
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

export default NutritionDevelopmentForm;
