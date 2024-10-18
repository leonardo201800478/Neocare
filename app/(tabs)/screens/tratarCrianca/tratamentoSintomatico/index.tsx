// screens/aidpi_neonatal/indice.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Indice() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Links para as subseções */}
        <View style={styles.linkContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/tratarCrianca/tratamentoSintomatico/sibilancia')}>
            <Text style={styles.linkText}>Tratar a criança com sibilância</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/tratarCrianca/tratamentoSintomatico/ouvido')}>
            <Text style={styles.linkText}>Secar o ouvido usando mechas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/tratarCrianca/tratamentoSintomatico/tosse')}>
            <Text style={styles.linkText}>Aliviar a tosse com medidas caseiras</Text>
          </TouchableOpacity>
        </View>

        {/* Botão "Voltar" */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF', // Cor de fundo vermelha
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 513,
    height: 268,
  },
  linkContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  linkButton: {
    backgroundColor: '#4CAF50', // Verde escuro para botões
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#2E7D32', // Verde escuro para o botão "Voltar"
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
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
