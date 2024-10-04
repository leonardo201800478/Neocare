import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AntimalaricoOral() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título Principal */}
        <Text style={styles.title}>ANTIMALÁRICO ORAL</Text>
        <Text style={styles.content}>
          - Seguir as instruções abaixo para todos os medicamentos orais a serem administrados em
          casa{'\n'}- Seguir, também, as instruções dadas na tabela de dosagem para cada um dos
          medicamentos.
        </Text>

        {/* Tabela para P. FALCIPARUM e P. VIVAX */}
        <ScrollView horizontal style={styles.tableScroll}>
          <View style={styles.table}>
            {/* Cabeçalho da Tabela */}
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>GRUPOS ETÁRIOS</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>P. FALCIPARUM</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>P. VIVAX</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>DOSES</Text>
              </View>
            </View>

            {/* Linhas de Dados */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>MEFLOQUINA</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>
                  Dose única no 1º dia: 15 a 20 mg/kg/dia em 2 tomadas de 12/12 horas
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>CLOROQUINA - Dar durante 3 dias</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>PRIMAQUINA - Dar durante 7 dias</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>Menor de 6 meses</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>Cálculo em mg/kg</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
            </View>

            {/* Outras Linhas de Dados */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>6 a 11 meses</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/4 Comp.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
            </View>

            {/* Continuação */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 a 2 anos</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/2 Comp.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
            </View>

            {/* Demais Idades */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>3 a 4 anos</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 Comp.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>5 a 6 anos</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 e 1/4 Comp.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>15 anos ou +</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>4 Comp.</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>3</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>-</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Notas da Seção */}
        <Text style={styles.note}>
          * Caso haja reaparecido a sintomatologia e teste positivo para P. vivax com tempo inferior
          a 60 dias, aplicar o mesmo esquema, porém a dose de primaquina deve ser dada por 14 dias.
          {'\n'}
          OBS.: Triturar até pulverizar o comprimido na dose indicada, dissolvendo em 1/2 colher de
          chá de água potável ou fervida e resfriada. Agitar e dar a dose da mistura como no quadro
          indicado acima.
        </Text>

        <Text style={styles.note}>
          A cloroquina e a primaquina deverão ser ingeridas preferencialmente nas refeições.{'\n'}
          Não administrar primaquina para gestantes e crianças até 6 meses de idade. Se surgir
          icterícia, suspender primaquina.
        </Text>

        {/* Segunda Tabela */}
        <ScrollView horizontal style={styles.tableScroll}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={styles.tableCell2}>
                <Text style={styles.tableHeaderText}>MALÁRIA MISTA (P. falciparum e P. vivax)</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell2}>
                <Text style={styles.tableText}>
                  Se a Malária for causada por P. vivax associado ao P. falciparum, usar esquema de
                  tratamento para P. falciparum associando Meﬂoquina com Primaquina por 7 dias.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Terceira Tabela */}
        <ScrollView horizontal style={styles.tableScroll}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>Esquema de 1º escolha</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>Quinina</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>Doxiciclina</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableHeaderText}>Primaquina</Text>
              </View>
            </View>

            {/* Dados de Doses */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>ADULTO</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>Dose: 25 mg/dia em 2 tomadas de 12/12 hs</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>Comprimidos (base 100 mg) 3,3 mg/kg/dia</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>Comprimidos (base 5 mg) 0,5 a 0,75 mg/kg/dia</Text>
              </View>
            </View>

            {/* Idade 8 a 11 anos */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>8 a 11 anos</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 e 1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1</Text>
              </View>
            </View>

            {/* Idade 12 a 14 anos */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>12 a 14 anos</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2 e 1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>1 e 1/2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2</Text>
              </View>
            </View>

            {/* Idade 15 anos ou + */}
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>15 anos ou +</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>4</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>2</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableText}>3</Text>
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
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
  },
  tableScroll: {
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
    width: 200, // Largura fixa para garantir alinhamento consistente
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#1B5E20',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  tableCell2: {
    width: 330, // Largura fixa para garantir alinhamento consistente
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
