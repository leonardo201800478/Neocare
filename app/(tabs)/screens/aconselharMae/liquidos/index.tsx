import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AumentarLiquidos() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Recomendar à Mãe ou ao Acompanhante que Aumente a Quantidade de Líquidos Durante a Doença
        </Text>

        <Text style={styles.sectionTitle}>Para Qualquer Criança Doente:</Text>
        <Text style={styles.content}>
          - Amamentar ao peito com maior frequência e sempre por períodos mais longos, de dia e de
          noite.
        </Text>
        <Text style={styles.content}>
          - Aumentar a quantidade de líquidos. Por exemplo: dar sopas, água de arroz, bebidas à base
          de iogurte ou água potável.
        </Text>

        <Text style={styles.sectionTitle}>Para a Criança com Diarreia:</Text>
        <Text style={styles.content}>
          - Administração de líquidos adicionais pode salvar a vida da criança. Dar líquidos segundo
          indicado no Plano A ou no Plano B tal como aparece no quadro TRATAR A CRIANÇA.
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
