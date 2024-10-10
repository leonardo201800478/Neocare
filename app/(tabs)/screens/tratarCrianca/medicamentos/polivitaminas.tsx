import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Polivitaminas() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Título Principal */}
        <Text style={styles.title}>POLIVITAMINAS</Text>

        {/* ScrollView Horizontal para a Tabela */}
        <ScrollView horizontal style={styles.horizontalScroll}>
          <View style={styles.table}>
            {/* Cabeçalho da Tabela */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableCellFull}>
                <Text style={styles.headerText}>Ingestão Diária Recomendada (IDR)</Text>
              </View>
            </View>
            {/* Sub-Cabeçalho */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell} />
              <View style={[styles.tableCell, styles.colSpan]}>
                <Text style={styles.headerText}>Criança (Idade em anos)</Text>
              </View>
            </View>
            {/* Linhas da Tabela */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>Nutrientes</Text>
              </View>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>Unidade</Text>
              </View>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>0 - 0,5</Text>
              </View>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>0,5 - 1</Text>
              </View>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>1 - 3</Text>
              </View>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>4 - 6</Text>
              </View>
              <View style={[styles.tableCell, styles.fixedWidth]}>
                <Text style={styles.headerText}>7 - 10</Text>
              </View>
            </View>

            {/* Linhas de Dados */}
            {[
              { nutrient: 'Vit A', unit: 'mcg', values: [375, 375, 400, 500, 700] },
              { nutrient: 'Ac. fólico', unit: '', values: [25, 35, 50, 75, 100] },
              { nutrient: 'Zinco', unit: '', values: [5, 5, 10, 10, 10] },
              {
                nutrient: 'Cobre',
                unit: '',
                values: ['0,4 - 0,6', '0,6 - 0,7', '0,7 - 1,0', '1,0 - 1,5', '1,0 - 2,0'],
              },
              { nutrient: 'Magnésio', unit: '', values: [40, 60, 80, 120, 170] },
            ].map((item, index) => (
              <View
                key={index}
                style={[styles.tableRow, index % 2 === 0 ? styles.alternateRow : null]}>
                <View style={[styles.tableCell, styles.fixedWidth]}>
                  <Text style={styles.tableText}>{item.nutrient}</Text>
                </View>
                <View style={[styles.tableCell, styles.fixedWidth]}>
                  <Text style={styles.tableText}>{item.unit}</Text>
                </View>
                {item.values.map((value, i) => (
                  <View key={i} style={[styles.tableCell, styles.fixedWidth]}>
                    <Text style={styles.tableText}>{value}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Observação */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Usar na convalescença da diarréia persistente duas ingestões diárias recomendadas de
            polivitaminas e sais minerais durante 2 semanas.
          </Text>
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
  closeButton: {
    marginBottom: 20,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  horizontalScroll: {
    marginBottom: 20,
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
  tableCellFull: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedWidth: {
    width: 100,
  },
  colSpan: {
    flex: 6,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableText: {
    textAlign: 'center',
  },
  alternateRow: {
    backgroundColor: '#F0F0F0',
  },
  noteContainer: {
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  noteText: {
    fontSize: 14,
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
