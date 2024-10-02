import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default function ArtemeterMalaria() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Administrar Artemeter Injetável para a Malária Grave</Text>
      <Text style={styles.subtitle}>(Área com alto risco de Malária)</Text>

      <Text style={styles.sectionTitle}>
        Para crianças sendo referidas com malária grave ou doença febril muito grave:
      </Text>
      <Text style={styles.content}>
        - Dar a primeira dose de Artemeter IM, após confirmação através do teste da gota espessa e
        referir URGENTEMENTE a criança ao hospital.
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Idade ou Peso</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Quinina por via intramuscular</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{'< 2 meses (4 kg)'}</Text>
          <Text style={styles.tableCell}>0,1 a 0,2 ml</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>2 a 4 meses (4 a {'<'} 6 kg)</Text>
          <Text style={styles.tableCell}>0,2 a 0,3 ml</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>4 a 11 meses (6 a {'<'} 10 kg)</Text>
          <Text style={styles.tableCell}>0,3 a 0,4 ml</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1 ano (10 a {'<'} 12 kg)</Text>
          <Text style={styles.tableCell}>0,4 a 0,5 ml</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>2 anos (12 a {'<'} 14 kg)</Text>
          <Text style={styles.tableCell}>0,5 a 0,6 ml</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>3 a 4 anos (14 a 19 kg)</Text>
          <Text style={styles.tableCell}>0,6 a 0,8 ml</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Se não for possível referir:</Text>
      <Text style={styles.content}>
        - Usar artemeter por via IM, na dose de 3,2 mg/kg/peso, em dose única no 1º dia. Após 23
        horas, aplicar 1,6 mg/kg/peso a cada 24 horas por 4 dias, totalizando 5 dias de tratamento.
      </Text>
      <Text style={styles.content}>
        - Completar o tratamento com: Clindamicina, 20 mg/kg/dia por 5 dias, dividida em 2 tomadas
        de 12/12 horas via oral, ou Doxiciclina, 3,3 mg/kg/dia dividida em 12/12 horas por 5 dias
        via oral; ou Mefloquina, 15 a 20 mg/kg em dose única Via Oral.
      </Text>
      <Text style={styles.sectionTitle}>Observações:</Text>
      <Text style={styles.content}>
        - Estes medicamentos devem ser administrados ao final do tratamento com derivados de
        Artemisinina.
      </Text>
      <Text style={styles.content}>
        - A Doxiciclina não deve ser administrada a gestantes e menores de 8 anos.
      </Text>
      <Text style={styles.content}>
        - A Mefloquina não deve ser usada em gestante no 1º trimestre.
      </Text>
      <Text style={styles.content}>
        - Orientações sobre outros esquemas de tratamento de Malária grave, ver anexos.
      </Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Fundo verde claro
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#C8E6C9', // Verde claro para linhas
    borderBottomWidth: 1,
    borderColor: '#1B5E20',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#1B5E20',
    fontSize: 16,
    color: '#1B5E20',
  },
  tableHeader: {
    backgroundColor: '#388E3C', // Verde mais escuro para o cabeçalho
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
