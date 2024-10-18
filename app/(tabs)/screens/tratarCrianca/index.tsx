// screens/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
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
            <Text style={styles.buttonText}>Administrar os Medicamentos Orais em Casa</Text>
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
              Administrar os Tratamentos Exclusivamente na Unidade de Saúde
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/liquidosDiarreia/')}>
            <Text style={styles.buttonText}>Dar Líquidos Adicionais para Combater a Diarreia</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Voltar */}
        <Animatable.View animation="fadeInUp" delay={800}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Fundo verde claro para manter consistência
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20', // Verde escuro para o título
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionButton: {
    backgroundColor: '#4CAF50', // Verde escuro para os botões de seção
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#2E7D32', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
