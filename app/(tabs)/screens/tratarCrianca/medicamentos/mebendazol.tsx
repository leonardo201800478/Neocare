import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Mebendazol() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Título Principal */}
        <Text style={styles.title}>DAR ANTI-HELMÍNTICO</Text>

        {/* Instruções */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Dar anti-helmíntico para a criança classificada como ANEMIA, se não tiver recebido
            nenhuma dose nos últimos seis meses.
          </Text>
        </View>

        {/* Tabela de Informações */}
        <View style={styles.table}>
          {/* Cabeçalho da Tabela */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.headerText}>IDADE</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.headerText}>MEBENDAZOL</Text>
            </View>
          </View>

          {/* Linhas de Dados (vazias, pois o HTML original não contém informações) */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText} />
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText} />
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText} />
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText} />
            </View>
          </View>
        </View>
        {/* Botão "Voltar" no Final da Página */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/screens/tratarCrianca/medicamentos/')}>
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
  instructionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
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
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
