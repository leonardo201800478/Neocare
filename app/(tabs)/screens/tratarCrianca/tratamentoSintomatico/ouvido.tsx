// screens/tratarCrianca/secarOuvido.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecarOuvido() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título da página */}
        <Text style={styles.title}>Secar o Ouvido Usando Mechas</Text>

        {/* Instruções sobre secar o ouvido */}
        <View style={styles.contentBox}>
          <Text style={styles.instructionsText}>- Secar o ouvido ao menos 3 vezes por dia.</Text>
          <Text style={styles.instructionsText}>
            - Torcer um pano absorvente, ou um pedaço de algodão formando uma mecha.
          </Text>
          <Text style={styles.instructionsText}>- Colocar a mecha no ouvido da criança.</Text>
          <Text style={styles.instructionsText}>
            - Retirar a mecha quando esta estiver molhada.
          </Text>
          <Text style={styles.instructionsText}>
            - Substitua a mecha por outra limpa e repita esses mesmos passos até que o ouvido esteja
            seco.
          </Text>
        </View>

        {/* Botões Fechar e Voltar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Fundo verde claro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  contentBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para os botões
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
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
