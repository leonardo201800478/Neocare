// screens/retorno/diarreiaPersistente.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DiarreiaPersistente() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>DIARRÉIA PERSISTENTE</Text>

        <Text style={styles.subtitle}>Depois de cinco dias:</Text>
        <Text style={styles.content}>
          Avaliar a criança quanto à diarreia. Consultar o quadro <i>AVALIAR E CLASSIFICAR</i>.
        </Text>

        <Text style={styles.subtitle}>Perguntar:</Text>
        <Text style={styles.content}>
          - A criança melhorou?{'\n'}- Quantas vezes por dia está evacuando?{'\n\n'}
          Determinar o peso.
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>
        <Text style={styles.content}>
          <i>* Se a diarreia não tiver terminado</i> (a criança continua com 3 ou mais evacuações
          amolecidas por dia), fazer nova avaliação completa da criança. Dar o tratamento necessário
          e, se apresentar perda de peso, referir ao hospital. Caso a criança não tenha perdido
          peso, marcar retorno em 5 dias.
        </Text>

        <Text style={styles.content}>
          <i>* Se a diarreia tiver melhorado</i> (a criança com evacuação amolecida menos de 3 vezes
          ao dia), recomendar à mãe continuar a seguir as orientações para alimentação habitual para
          a idade da criança. As crianças em convalescência devem receber suplementação de
          polivitaminas (ácido fólico, e vitamina A caso não tenha tomado nos últimos 4 meses) e
          sais minerais (zinco, cobre e magnésio). Completar os 10 dias de tratamento com zinco
          oral.
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
