import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Ferro() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Título Principal */}
        <Text style={styles.title}>DAR FERRO</Text>

        {/* Instruções */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            - Dar uma dose por dia, durante 14 dias, no intervalo das refeições acompanhado de suco
            de frutas cítricas, se houver disponibilidade.
          </Text>
          <Text style={styles.instructionText}>
            - Informar à mãe que as fezes irão ficar escuras.
          </Text>
        </View>

        {/* Tabela de Informações */}
        <View style={styles.table}>
          {/* Cabeçalho da Tabela */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.headerText}>IDADE OU PESO</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.headerText}>
                SULTAFO FERROSO{'\n'}dose: 1ml = 25mg de ferro elementar{'\n'}3mg/kg/dia
              </Text>
            </View>
          </View>

          {/* Linhas de Dados */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>2 a 3 meses (4 a &lt;6 kg)</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>15 gotas ou 0,7 ml/dia</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>4 a 11 meses (6 a &lt;10 kg)</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>20 gotas ou 1,0 ml/dia</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>1 a 2 anos (10 a &lt;14 kg)</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>30 gotas ou 1,5 ml/dia</Text>
            </View>
          </View>
          <View style={[styles.tableRow, styles.alternateRow]}>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>3 a 4 anos (14 a 19 kg)</Text>
            </View>
            <View style={[styles.tableCell, styles.fixedWidth]}>
              <Text style={styles.tableText}>40 gotas ou 2,0 ml/dia</Text>
            </View>
          </View>
        </View>

        {/* Nota */}
        <Text style={styles.note}>
          Nota: o Ministério da Saúde, através do Programa Nacional de Suplementação de Ferro,
          recomenda a suplementação medicamentosa de sulfato ferroso para todas as crianças de 6 a
          18 meses de idade (Ferro profilático).
        </Text>
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
  alternateRow: {
    backgroundColor: '#CCCCCC',
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
  note: {
    fontSize: 14,
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
});
