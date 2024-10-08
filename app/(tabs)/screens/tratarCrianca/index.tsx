// screens/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeAidpi() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>AIDPI Neonatal - NEOCARE</Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/')}>
            <Text style={styles.buttonText}>Administrar os Medicamentos orais em Casa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/tratamentoSintomatico/')}>
            <Text style={styles.buttonText}>Utilizar Tratamento Sintomático</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/tratamentoUS/')}>
            <Text style={styles.buttonText}>
              Administrar os Tratamentos Exclusivamente na unidade de saúde
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/liquidosDiarreia/')}>
            <Text style={styles.buttonText}>Dar Líquidos Adicionais para combater a Diarreia</Text>
          </TouchableOpacity>
        </View>
        {/* Botão "Voltar" no Final da Página */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  buttonContainer: {
    width: '100%',
  },
  sectionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginStart: 4,
    marginEnd: 4,
  },
});
