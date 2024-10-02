import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SaudeMae() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Recomendar à Mãe ou ao Acompanhante a Respeito de Sua Própria Saúde
        </Text>

        <Text style={styles.content}>
          - Se a mãe estiver doente, prestar-lhe tratamento ou referi-la para atendimento.
        </Text>
        <Text style={styles.content}>
          - Se tiver algum problema no seio (tais como ingurgitamento, mamilos doloridos, infecção
          no seio), prestar-lhe tratamento ou referi-la para atendimento especializado.
        </Text>
        <Text style={styles.content}>
          - Recomendar-lhe que coma bem para manter a sua própria resistência e saúde.
        </Text>
        <Text style={styles.content}>
          - Verificar a situação de imunização da mãe e, se necessário, aplicar-lhe a vacina DT
          (contra difteria e tétano) e contra rubéola (com a rubéola monovalente ou dupla-viral -
          contra rubéola e sarampo) - Ver calendário básico 2001/03, MS.
        </Text>
        <Text style={styles.content}>- Certificar-se de que ela tenha acesso a:</Text>
        <Text style={styles.listItem}> • Recomendações sobre "Saúde Reprodutiva"</Text>
        <Text style={styles.listItem}> • Recomendações sobre prevenção a DST e AIDS</Text>

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
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 5,
    paddingLeft: 10,
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
