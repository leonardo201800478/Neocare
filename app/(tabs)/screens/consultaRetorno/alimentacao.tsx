// screens/retorno/alimentacao.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProblemaDeAlimentacao() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>PROBLEMA DE ALIMENTAÇÃO</Text>

        <Text style={styles.content}>
          Depois de 5 dias:{'\n'}
          Reavaliar a alimentação. Consultar as perguntas da parte superior do quadro ACONSELHAR À
          MÃE OU O ACOMPANHANTE. Perguntar sobre quaisquer problemas de alimentação constatados na
          primeira consulta.
        </Text>

        <Text style={styles.content}>
          - Orientar à mãe com respeito a quaisquer problemas de alimentação novos ou persistentes.
          Se foi aconselhado fazer mudanças de alimentação importantes, recomendar à mãe para voltar
          à consulta de retorno em 5 dias.
        </Text>

        <Text style={styles.content}>
          Nota: Criança menor de 6 meses de idade, com qualquer problema de alimentação deverá
          retornar em 2 dias.
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
