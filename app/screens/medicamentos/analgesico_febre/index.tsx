import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AnalgesicoFebre() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analgésico / Antitérmico para Febre Alta</Text>
      <Text style={styles.subtitle}>(&gt; 38,5°C) ou Dor de Ouvido</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Idade ou Peso</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Paracetamol gts (200 mg/ml)</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Dipirona gts (500 mg/ml)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>2 a 11 meses (6 - 9 kg)</Text>
          <Text style={styles.tableCell}>6 a 9</Text>
          <Text style={styles.tableCell}>3 a 5</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1 a 2 anos (10 - 14 kg)</Text>
          <Text style={styles.tableCell}>10 a 14</Text>
          <Text style={styles.tableCell}>5 a 7</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>3 a 4 anos (15 - 19 kg)</Text>
          <Text style={styles.tableCell}>15 a 19</Text>
          <Text style={styles.tableCell}>8 a 10</Text>
        </View>
      </View>

      <Text style={styles.note}>
        Dar paracetamol ou dipirona de seis em seis horas, se tiver febre alta ou dor.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
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
    fontSize: 24,
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
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#388E3C', // Verde mais escuro para o cabeçalho
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
