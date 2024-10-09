import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalgesicoAntitermico() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Analgésico / Antitérmico</Text>

        <Text style={styles.content}>
          Dar Analgésico / Antitérmico para febre alta (≥ 38,0ºC), Dor de ouvido ou Garganta
        </Text>

        {/* Tabela de Medicamentos com Rolagem Horizontal e Vertical */}
        <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.table}>
            {/* Cabeçalhos */}
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text style={styles.tableHeaderText}>PESO kg</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text style={styles.tableHeaderText}>
                  PARACETAMOL{'\n'}200 mg/ml 1 gota/kg/dose{'\n'}de 6/6 horas, se necessário
                </Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text style={styles.tableHeaderText}>
                  DIPIRONA{'\n'}500 mg/ml 1 gota/2kg/dose{'\n'}de 6/6 horas, se necessário
                </Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text style={styles.tableHeaderText}>
                  IBUPROFENO{'\n'}50 mg/ml* 2 gotas/2kg/dose{'\n'}de 8/8 horas, se necessário
                </Text>
              </View>
            </View>

            {/* Linhas de Dados */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>4 a 7</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>4 a 7 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2 a 4 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>8 a 14 gotas</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>8 - 11</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>8 a 11 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>4 a 6 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>16 a 22 gotas</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>12 - 15</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>12 a 15 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>6 a 8 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>24 a 30 gotas</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>16 - 19</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>16 a 19 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>8 a 10 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>32 a 38 gotas</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>20 - 24</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>20 a 24 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>10 a 12 gotas</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>40 gotas</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Text style={styles.note}>
          *O Ibuprofeno só deve ser usado em maiores de 6 meses e excluído o diagnóstico de dengue,
          nas crianças alérgicas a dipirona e paracetamol. Dose máxima em crianças: 200mg/dose.
        </Text>
      </ScrollView>
      {/* Botão "Voltar" no Final da Página */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/screens/tratarCrianca/medicamentos/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Fundo em verde claro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#1B5E20',
    backgroundColor: '#F1F8E9',
  },
  tableHeaderRow: {
    backgroundColor: '#C8E6C9',
  },
  tableCell: {
    width: 150, // Largura fixa para garantir alinhamento consistente
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#C8E6C9', // Cor de fundo para o cabeçalho
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para cabeçalhos das tabelas
    textAlign: 'center',
  },
  tableText: {
    color: '#1B5E20',
    fontSize: 16,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
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
