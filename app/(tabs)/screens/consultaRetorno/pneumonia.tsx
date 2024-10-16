// screens/retorno/pneumonia.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RetornoPneumonia() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>PNEUMONIA</Text>

        <Text style={styles.content}>Depois de dois dias:</Text>

        <Text style={styles.content}>
          Examinar a criança quanto a sinais gerais de perigo. Avaliar a criança para determinar se
          tem tosse ou dificuldade para respirar.
        </Text>

        <Text style={styles.content}>Perguntar:</Text>

        <Text style={styles.bulletPoint}>- A criança está respirando mais lentamente?</Text>
        <Text style={styles.bulletPoint}>- A febre baixou?</Text>
        <Text style={styles.bulletPoint}>- A criança está se alimentando melhor?</Text>

        <Text style={styles.subtitle}>Tratamento:</Text>

        <Text style={styles.content}>
          - Se houver tiragem subcostal ou algum sinal geral de perigo, dar uma dose de um
          antibiótico: Penicilina Procaína ou Cloranfenicol por via intramuscular. A seguir, referir
          URGENTEMENTE ao hospital.
        </Text>
        <Text style={styles.content}>
          - Se a frequência respiratória, a febre e a aceitação da alimentação continuam
          inalteradas, manter ou mudar para outro antibiótico recomendado e orientar a mãe para
          retornar em dois dias ou referir.
        </Text>
        <Text style={styles.content}>
          - Se a respiração estiver mais lenta, a febre estiver baixada ou se estiver se alimentando
          melhor, completar os sete dias de antibiótico.
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
    color: '#FFF', // Cor vermelha para o título
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
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
    marginBottom: 10,
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
