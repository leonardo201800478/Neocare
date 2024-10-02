// screens/aidpi_neonatal/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';

export default function Graficos() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de Voltar Estilizado */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Gráficos</Text>

      {/* Navegando para as subseções */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/screens/aidpiNeonatal/graficos/graficos_meninas_0a2/')}>
          <Text style={styles.buttonText}>Alimentação</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/screens/aidpiNeonatal/graficos/graficos_meninas_2a5/')}>
          <Text style={styles.buttonText}>Cuidados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/screens/aidpiNeonatal/graficos/graficos_meninos_0a2/')}>
          <Text style={styles.buttonText}>Gráficos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/screens/aidpiNeonatal/graficos/graficos_meninos_2a5/')}>
          <Text style={styles.buttonText}>Medicamentos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
  },
  sectionButton: {
    backgroundColor: '#2196F3',
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
