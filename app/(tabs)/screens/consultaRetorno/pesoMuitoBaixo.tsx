// screens/retorno/pesoMuitoBaixo.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RetornoPesoMuitoBaixo() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>PESO MUITO BAIXO</Text>

        <Text style={styles.content}>
          Depois de 5 dias:{'\n'}
          Pesar a criança e determinar se está ganhando peso ou não.
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>

        <Text style={styles.content}>
          - Se está ganhando peso, elogiar à mãe e incentivá-la a continuar. Retornar em 14 dias e
          novo controle em 30 dias.
        </Text>
        <Text style={styles.content}>
          - Se mantiver o peso, indagar se as orientações do quadro ACONSELHAR A MÃE OU O
          ACOMPANHANTE, "Ensinar a Mãe a Tratar a Criança com Peso Muito Baixo", estão sendo
          seguidas. Reforçar a orientação. Retornar em 5 dias.
        </Text>

        <Text style={styles.subtitle}>Exceção:</Text>

        <Text style={styles.content}>
          Se julgar que a alimentação não vai melhorar ou se a criança tiver perdido peso, referir a
          criança.
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
