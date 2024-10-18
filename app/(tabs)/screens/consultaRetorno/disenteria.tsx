// screens/retorno/disenteria.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Disenteria() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>DISENTERIA</Text>

        <Text style={styles.subtitle}>Depois de dois dias:</Text>
        <Text style={styles.content}>
          Avaliar a criança quanto à diarreia. Consultar o quadro <i>AVALIAR E CLASSIFICAR</i>.
        </Text>

        <Text style={styles.subtitle}>Perguntar:</Text>
        <Text style={styles.content}>
          - As evacuações diminuíram?{'\n'}- Há menos sangue nas fezes?{'\n'}- A febre baixou?{'\n'}
          - A criança está se alimentando melhor?
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>
        <Text style={styles.content}>
          <i>• Se a criança estiver desidratada</i>, tratar a desidratação.
        </Text>
        <Text style={styles.content}>
          <i>
            • Se o número de evacuações, a quantidade de sangue nas fezes, a febre ou a alimentação
            continuarem iguais ou estiverem pior:
          </i>{' '}
          Iniciar a antibioticoterapia recomendada contra <i>Shigella</i>.
        </Text>
        <Text style={styles.content}>
          <i>• Se a criança estiver pior e já em uso de antibiótico</i>:{'\n'}
          <b>1-</b> Em menores de 1 ano de idade, referir a criança.{'\n'}
          <b>2-</b> Em maiores de 1 ano, em uso de sulfametoxazol + trimetoprim, mudar para
          ceftriaxone.{'\n'}
          <b>3-</b> Em maiores de 1 ano, em uso de ceftriaxone, referir a criança.
        </Text>
        <Text style={styles.content}>
          <i>
            • Se evacuando menos, menos sangue nas fezes, febre mais baixa e alimentando-se melhor
          </i>{' '}
          e, se estiver em uso de antibiótico, continuar a dar o mesmo antibiótico até terminar o
          tratamento.
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
