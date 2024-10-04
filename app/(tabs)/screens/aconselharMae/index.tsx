// screens/aidpi_neonatal/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Aconselhar() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botão de Voltar Estilizado */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Aconselhar a Mãe ou o Acompanhante</Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/aconselharMae/alimentacao/')}>
            <Text style={styles.buttonText}>Alimentação</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/aconselharMae/liquidos/')}>
            <Text style={styles.buttonText}>Líquidos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/aconselharMae/retorno/')}>
            <Text style={styles.buttonText}>Quando Retornar</Text>
          </TouchableOpacity>
        </View>
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
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
