import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles/AttendanceStyles'; // Importando a estilização separada
import { NutritionDevelopment } from './types';

interface NutritionDevelopmentProps {
  data: NutritionDevelopment;
  onChange: (field: keyof NutritionDevelopment, value: string) => void;
}

const NutritionDevelopmentForm: React.FC<NutritionDevelopmentProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrição e Desenvolvimento</Text>

      {/* Amamentando (Sim/Não) */}
      <Text style={styles.label}>Amamentando:</Text>
      <Picker
        selectedValue={data.amamentando ?? 'no'} // Valor padrão "Não"
        onValueChange={(value) => onChange('amamentando', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Quantas Vezes Amamenta por Dia */}
      <Text style={styles.label}>Quantas Vezes Amamenta por Dia:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 6"
        value={data.quantas_vezes_amamenta}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('quantas_vezes_amamenta', text);
          }
        }}
        keyboardType="numeric"
      />

      {/* Amamenta à Noite (Sim/Não) */}
      <Text style={styles.label}>Amamenta à Noite:</Text>
      <Picker
        selectedValue={data.amamenta_noite ?? 'no'} // Valor padrão "Não"
        onValueChange={(value) => onChange('amamenta_noite', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Recebe outros Líquidos/Alimentos? */}
      <Text style={styles.label}>Recebe Outros Líquidos/Alimentos:</Text>
      <Picker
        selectedValue={data.alimentos_liquidos ?? 'no'} // Valor padrão "Não"
        onValueChange={(value) => onChange('alimentos_liquidos', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Quantas Refeições por Dia */}
      <Text style={styles.label}>Quantas Refeições por Dia:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 3"
        value={data.quantidade_refeicoes}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('quantidade_refeicoes', text);
          }
        }}
        keyboardType="numeric"
      />

      {/* Tipo de Alimentação */}
      <Text style={styles.label}>Tipo de Alimentação:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o tipo de alimentação"
        value={data.tipo_alimentacao}
        onChangeText={(text) => onChange('tipo_alimentacao', text)}
      />

      {/* Mudou a Alimentação Recentemente? */}
      <Text style={styles.label}>Mudou a Alimentação Recentemente:</Text>
      <Picker
        selectedValue={data.mudou_alimentacao ?? 'no'} // Valor padrão "Não"
        onValueChange={(value) => onChange('mudou_alimentacao', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Como Mudou a Alimentação */}
      <Text style={styles.label}>Como Mudou a Alimentação:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva a mudança"
        value={data.como_mudou_alimentacao}
        onChangeText={(text) => onChange('como_mudou_alimentacao', text)}
        multiline
      />

      {/* Perda de Peso na Primeira Semana >10% */}
      <Text style={styles.label}>Perda de Peso na Primeira Semana &gt;10%:</Text>
      <Picker
        selectedValue={data.perda_peso_primeira_semana ?? 'no'} // Valor padrão "Não"
        onValueChange={(value) => onChange('perda_peso_primeira_semana', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Tendência de Crescimento */}
      <Text style={styles.label}>Tendência de Crescimento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva a tendência de crescimento"
        value={data.tendencia_crescimento}
        onChangeText={(text) => onChange('tendencia_crescimento', text)}
      />

      {/* Habilidades de Desenvolvimento */}
      <Text style={styles.label}>Habilidades de Desenvolvimento:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva as habilidades de desenvolvimento"
        value={data.habilidades_desenvolvimento}
        onChangeText={(text) => onChange('habilidades_desenvolvimento', text)}
        multiline
      />

      {/* Atividade Física (Vezes por Semana) */}
      <Text style={styles.label}>Atividade Física (Vezes por Semana):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 4"
        value={data.atividade_fisica_vezes_semana}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('atividade_fisica_vezes_semana', text);
          }
        }}
        keyboardType="numeric"
      />

      {/* Tempo de Atividade Física */}
      <Text style={styles.label}>Tempo de Atividade Física (minutos):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 60"
        value={data.tempo_atividade_fisica}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('tempo_atividade_fisica', text);
          }
        }}
        keyboardType="numeric"
      />

      {/* Tempo Sedentário */}
      <Text style={styles.label}>Tempo Sedentário (horas):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 8"
        value={data.tempo_sedentario}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            onChange('tempo_sedentario', text);
          }
        }}
        keyboardType="numeric"
      />

      {/* Avaliação de Violência */}
      <Text style={styles.label}>Avaliação de Violência:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva se houve sinais de violência"
        value={data.avaliacao_violencia}
        onChangeText={(text) => onChange('avaliacao_violencia', text)}
        multiline
      />

      {/* Outros Problemas */}
      <Text style={styles.label}>Outros Problemas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva outros problemas observados"
        value={data.outros_problemas}
        onChangeText={(text) => onChange('outros_problemas', text)}
        multiline
      />
    </View>
  );
};

export default NutritionDevelopmentForm;
