// screens/retorno/anemia.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Anemia() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>ANEMIA</Text>

        <Text style={styles.content}>
          Depois de 14 dias:{'\n'}- Perguntar se a criança está tomando o sulfato ferroso como foi
          indicado.{'\n'}- Se estiver tomando:{'\n'}- Dar mais sulfato ferroso e orientar a mãe a
          retornar em 14 dias para receber mais sulfato ferroso.{'\n'}- Manter o sulfato ferroso
          durante 2 meses com reavaliação a cada 13 dias.{'\n'}- Se não estiver tomando sulfato
          ferroso (geralmente porque a criança apresenta desconforto abdominal ou diarreia):{'\n'}-
          Reduzir a dose do sulfato ferroso pela metade.{'\n'}- Recomendar à mãe a retornar em 14
          dias para receber mais sulfato ferroso.{'\n'}- Manter o sulfato ferroso durante 4 meses,
          com reavaliações a cada 30 dias.{'\n'}- Reforçar a orientação sobre alimentos ricos em
          ferro.{'\n'}- Se a criança ainda tiver palidez palmar depois de 2 meses, referir a
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
