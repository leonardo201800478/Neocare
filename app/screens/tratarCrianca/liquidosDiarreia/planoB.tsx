import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TratarDesidratacao() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Plano B: Tratar a Desidratação com SRO</Text>
        <Text style={styles.content}>
          As crianças com desidratação deverão permanecer no serviço de saúde até a reidratação completa. Durante um período de 4 horas administrar, no serviço de saúde, a quantidade recomendada de SRO.
        </Text>
        <Text style={styles.sectionTitle}>
          Determinar a quantidade de SRO a ser administrada durante as primeiras 4 horas:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Idade</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Peso</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>SRO (ml)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Até 4 meses</Text>
            <Text style={styles.tableCell}>&lt; 6 kg</Text>
            <Text style={styles.tableCell}>200 - 400 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>4 a 11 meses</Text>
            <Text style={styles.tableCell}>6 - &lt; 10 kg</Text>
            <Text style={styles.tableCell}>400 - 700 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>12 meses a 2 anos</Text>
            <Text style={styles.tableCell}>10 - &lt; 12 kg</Text>
            <Text style={styles.tableCell}>700 - 900 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>2 a 5 anos</Text>
            <Text style={styles.tableCell}>12 - 19 kg</Text>
            <Text style={styles.tableCell}>900 - 1400 ml</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Fundo em verde claro
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
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
    color: '#2E7D32', // Verde escuro para títulos de seção
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#1B5E20',
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
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
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
