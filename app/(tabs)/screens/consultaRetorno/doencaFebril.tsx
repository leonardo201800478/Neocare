// screens/retorno/doencaFebril.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DoencaFebril() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>DOENÇA FEBRIL (ÁREA SEM RISCO DE MALÁRIA)</Text>

        <Text style={styles.content}>
          Se depois de 2 dias a febre persistir, fazer uma reavaliação completa da criança.
          Consultar o quadro AVALIAR E CLASSIFICAR e determinar se há outra causa para a febre.
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>
        <Text style={styles.content}>
          Se a criança apresentar qualquer outra causa para a febre, tratar.
        </Text>

        <Text style={styles.content}>
          Se a febre persiste há mais de 7 dias, referir para avaliação.
        </Text>

        {/* Botão "Voltar" */}
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
    backgroundColor: '#FFFFFF', // Fundo branco
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Cor vermelha
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Texto preto
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#000000', // Texto preto
    textAlign: 'justify',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
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
