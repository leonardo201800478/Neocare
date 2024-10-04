import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function QuandoRetornar() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Quando Retornar</Text>

        <Text style={styles.sectionTitle}>Consulta de Retorno</Text>
        <Text style={styles.content}>
          Recomendar à mãe a retornar para reavaliação dos problemas da criança no prazo mais breve
          a seguir:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Condição da Criança</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Regressar em</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Pneumonia, Disenteria</Text>
            <Text style={styles.tableCell}>2 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              Problemas de amamentação/alimentação (menor de 2 meses)
            </Text>
            <Text style={styles.tableCell}>2 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Problemas de amamentação (menor de 6 meses)</Text>
            <Text style={styles.tableCell}>2 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Doença febril, se a febre persistir</Text>
            <Text style={styles.tableCell}>2 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Possível infecção aguda do ouvido</Text>
            <Text style={styles.tableCell}>2 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              Malária, provável malária, ou malária pouco provável
            </Text>
            <Text style={styles.tableCell}>3 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Diarreia persistente</Text>
            <Text style={styles.tableCell}>3 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Peso baixo para idade</Text>
            <Text style={styles.tableCell}>14 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Anemia</Text>
            <Text style={styles.tableCell}>14 dias</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Peso baixo ou ganho insuficiente</Text>
            <Text style={styles.tableCell}>30 dias</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quando Retornar Imediatamente</Text>
        <Text style={styles.content}>
          Recomendar à mãe para retornar imediatamente se a criança apresentar qualquer um dos
          sinais abaixo:
        </Text>
        <Text style={styles.listItem}>• Não consegue beber nem mamar no peito</Text>
        <Text style={styles.listItem}>• Piora do estado geral</Text>
        <Text style={styles.listItem}>• Aparecimento ou piora da febre</Text>
        <Text style={styles.listItem}>• Sangue nas fezes</Text>
        <Text style={styles.listItem}>• Dificuldade para beber</Text>

        <Text style={styles.sectionTitle}>Próxima Consulta da Criança Saudável</Text>
        <Text style={styles.content}>
          Recomendar à mãe sobre quando retornar para a próxima vacina segundo o calendário de
          vacinação e do acompanhamento do Crescimento e Desenvolvimento.
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
    color: '#1B5E20',
  },
  listItem: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 5,
    paddingLeft: 10,
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
