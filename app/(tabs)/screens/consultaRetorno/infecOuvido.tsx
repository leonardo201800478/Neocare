// screens/retorno/infeccaoOuvido.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfeccaoOuvido() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>POSSÍVEL INFECÇÃO AGUDA DO OUVIDO</Text>

        <Text style={styles.subtitle}>Depois de 2 dias:</Text>
        <Text style={styles.content}>
          Reavaliar o problema no ouvido. Consultar o quadro <i>AVALIAR E CLASSIFICAR</i>. Medir a
          temperatura da criança.
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>
        <Text style={styles.content}>
          Se a dor de ouvido persiste: caso o quadro tenha ficado inalterado ou apresenta piora,
          iniciar antibioticoterapia. Marcar retorno em 5 dias.{'\n'}
          Caso tenha apresentado melhora da dor, manter a conduta.
        </Text>

        <Text style={styles.sectionTitle}>INFECÇÃO NO OUVIDO</Text>

        <Text style={styles.subtitle}>Depois de 5 dias:</Text>
        <Text style={styles.content}>
          Reavaliar o problema do ouvido. Consultar o quadro <i>AVALIAR E CLASSIFICAR</i>.
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>
        <Text style={styles.content}>
          - Se houver{' '}
          <strong>
            tumefação dolorosa ao toque atrás da orelha ou febre alta (38,5ºC ou mais)
          </strong>
          , referir URGENTEMENTE ao hospital.
        </Text>
        <Text style={styles.content}>
          - <strong>Infecção aguda do ouvido</strong>: se a dor de ouvido ou secreção purulenta
          persistirem, em uso de Amoxicilina: aumentar a dose de Amoxicilina para 80mg/kg/dia de 8/8
          horas e retornar em 48 horas para controle. Continuar secando o ouvido com mechas se for o
          caso. No 2º retorno, se persistir sem melhora, trocar o antibiótico para cloranfenicol
          (50mg/kg/dia VO de 6/6 horas) e marcar retorno em 5 dias. Se o quadro continuar inalterado
          ou piorar, referir.
        </Text>
        <Text style={styles.content}>
          - <strong>Infecção crônica do ouvido</strong>: assegurar que a mãe esteja secando
          corretamente o ouvido com mechas. Referir para serviço especializado se possível.
        </Text>
        <Text style={styles.content}>
          - Se não houver dor de ouvido nem secreção, elogiar a mãe pelo tratamento cuidadoso
          dispensado e terminar o tratamento.
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro para títulos de seção
    textAlign: 'center',
    marginVertical: 20,
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
