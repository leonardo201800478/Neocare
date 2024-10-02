import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ViaOral() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Antibiótico por Via Oral</Text>

      <Text style={styles.sectionTitle}>Para Infecção Bacteriana Local:</Text>
      <Text style={styles.content}>
        - Antibiótico de primeira linha: Cefalexina{'\n'}- Antibiótico de segunda linha:
        Amoxicilina. Se não tiver disponível, usar Eritromicina.
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Idade ou Peso</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Cefalexina</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Amoxicilina</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Eritromicina</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            Nascimento {'<'} 1 mês ({'<'} 3 kg)
          </Text>
          <Text style={styles.tableCell}>1,0 ml</Text>
          <Text style={styles.tableCell}>1,0 ml</Text>
          <Text style={styles.tableCell}>1,0 ml</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1 a 2 meses (3 a 4 kg)</Text>
          <Text style={styles.tableCell}>1,25 ml</Text>
          <Text style={styles.tableCell}>1,25 ml</Text>
          <Text style={styles.tableCell}>1,25 ml</Text>
        </View>
      </View>

      <Text style={styles.note}>
        Cefalexina: 50 mg/kg/dia - Dar de 6/6 horas durante 7 dias.{'\n'}
        Amoxicilina: 50 mg/kg/dia - Dar de 8/8 horas durante 7 dias.{'\n'}
        Eritromicina: 50 mg/kg/dia - Dar de 6/6 horas durante 7 dias.
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
    backgroundColor: '#E8F5E9', // Verde claro para o fundo da tela
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para seções
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
