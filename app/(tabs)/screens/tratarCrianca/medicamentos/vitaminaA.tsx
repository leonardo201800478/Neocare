import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VitaminaA() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Título Principal */}
        <Text style={styles.title}>VITAMINA A</Text>
        <Text style={styles.subtitle}>
          Dar uma dose na Unidade de saúde, se a criança não recebeu nos últimos 6 meses.
        </Text>

        {/* Tabela de Informações */}
        <View style={styles.table}>
          {/* Cabeçalho da Tabela */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.headerText}>IDADE</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.headerText}>Cápsulas</Text>
            </View>
          </View>

          {/* Linhas de Dados */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>6 a 11 meses</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>100.000 UI</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>1 a 4 anos</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>200.000 UI</Text>
            </View>
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
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'normal',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
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
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#CCCCCC',
  },
  tableCell: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedWidth: {
    width: 200,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableText: {
    textAlign: 'center',
  },
});
