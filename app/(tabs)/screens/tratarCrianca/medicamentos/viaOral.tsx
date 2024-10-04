import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AntibioticoOralRecomendado() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título Principal */}
        <Text style={styles.title}>ANTIBIÓTICO ORAL RECOMENDADO</Text>

        {/* Seção para Pneumonia e Infecção Aguda do Ouvido */}
        <Text style={styles.sectionTitle}>- PARA PNEUMONIA, INFECÇÃO AGUDA DO OUVIDO</Text>
        <Text style={styles.content}>
          Antibiótico de primeira linha: Amoxicilina{'\n'}
          Antibiótico de segunda linha: Trimetoprim + Sulfametoxazol ou Eritromicina
        </Text>

        {/* Tabela para Pneumonia e Infecção Aguda do Ouvido */}
        <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.table}>
            {/* Cabeçalho da Tabela */}
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>IDADE ou PESO</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>COMPRIMIDO{'\n'}250 mg</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>SUSPENSÃO{'\n'}250 mg por 5 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  COMPRIMIDO{'\n'}80mg trimetoprim + 400mg sulfametoxazol
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  SUSPENSÃO{'\n'}40mg trimetoprim + 200mg sulfametoxazol por 5,0 ml
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  ERITROMICINA{'\n'}40mg/kg/dia{'\n'}Dar de 6/6 horas durante 7 dias
                </Text>
              </View>
            </View>

            {/* Linhas de Dados */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2 a 11 meses (4 a &lt; 10 kg)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2,5 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5,0 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2,5 ml</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 a 4 anos (10 a 19 kg)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5,0 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>7,5 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5,0 ml</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Notas da Seção */}
        <Text style={styles.note}>
          * Para infecção do ouvido, usar por 10 dias e não menos de 70 mg/kg Amoxicilina{'\n'}
          Nota: nos casos de Doença grave ou doença muito grave e não ser possível referir,
          administrar tratamento por via intramuscular.{'\n'}
          OBS.: Nos casos de PNEUMONIA que não há indicação de hospitalização e a criança não
          aceitar o antibiótico oral ou não apresentar melhora do quadro, pode ser usada Penicilina
          Procaína IM, na dose de 50.000 UI/kg/dia (ver Quadro de Antibióticos IM)
        </Text>

        {/* Seção para Disenteria */}
        <Text style={styles.sectionTitle}>- PARA DISENTERIA</Text>
        <Text style={styles.content}>
          Dar um antibiótico recomendado em sua região contra Shigella durante 5 dias.{'\n'}
          Antibiótico de primeira linha contra Shigella: Ác. Nalidíxico{'\n'}
          Antibiótico de segunda linha: Trimetoprim + Sulfametoxazol
        </Text>

        {/* Tabela para Disenteria */}
        <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.table}>
            {/* Cabeçalho da Tabela */}
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>IDADE ou PESO</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>COMPRIMIDO{'\n'}250 mg</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>SUSPENSÃO{'\n'}250 mg por 5 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  COMPRIMIDO{'\n'}80mg trimetoprim + 400mg sulfametoxazol
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  SUSPENSÃO{'\n'}40mg trimetoprim + 200mg sulfametoxazol por 5,0 ml
                </Text>
              </View>
            </View>

            {/* Linhas de Dados */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2 a 4 meses (4 a &lt; 6 kg)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/4</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1,25 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>N/A</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>N/A</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5 a 11 meses (6 a &lt; 10 kg)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2,5 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5,0 ml</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 a 4 anos (10 a 19 kg)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5,0 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>7,5 ml</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Seção para Cólera */}
        <Text style={styles.sectionTitle}>- PARA CÓLERA</Text>
        <Text style={styles.content}>
          Dar um antibiótico recomendado em sua região contra Cólera, durante 3 dias, se a criança
          tiver 2 anos ou mais.{'\n'}
          Antibiótico de primeira linha contra o cólera: Eritromicina ou Furazolidona{'\n'}
          Antibiótico de segunda linha contra o cólera: Trimetoprim + Sulfametoxazol
        </Text>

        {/* Tabela para Cólera */}
        <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
          <View style={styles.table}>
            {/* Cabeçalho da Tabela */}
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>IDADE ou PESO</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  TRIMETOPRIM + SULFAMETOXAZOL{'\n'}Dar de 12/12 hs durante 3 dias
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  ERITROMICINA{'\n'}40 mg/kg/dia{'\n'}Dar de 6/6 hs durante 7 dias
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>
                  FURAZOLIDONA{'\n'}7 mg/kg/dia{'\n'}Dar de 6/6 hs durante 3 dias
                </Text>
              </View>
            </View>

            {/* Linhas de Dados */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2 a 4 anos (12 - 19kg)</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>N/A</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5,0 ml</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/4</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Botão "Voltar" no Final da Página */}
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
    color: '#2E7D32', // Verde escuro para subtítulos
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
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
    width: 150, // Largura fixa para garantir o alinhamento consistente
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
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
