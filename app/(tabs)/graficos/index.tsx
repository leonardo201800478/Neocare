// screens/aidpi_neonatal/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Graficos() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Gráfico Peso/Idade</Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sectionButtonMenina}
            onPress={() => router.push('/graficos/graficos_meninas_0a2/')}>
            <Text style={styles.buttonText}>Gráficos Meninas 0 a 2 meses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButtonMenino}
            onPress={() => router.push('/graficos/graficos_meninos_0a2/')}>
            <Text style={styles.buttonText}>Gráficos Meninos 0 a 2 meses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButtonMenina}
            onPress={() => router.push('/graficos/graficos_meninas_2a5/')}>
            <Text style={styles.buttonText}>Gráficos Meninas 2 meses a 5 anos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButtonMenino}
            onPress={() => router.push('/graficos/graficos_meninos_2a5/')}>
            <Text style={styles.buttonText}>Gráficos Meninos 2 meses a 5 anos</Text>
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
  sectionButtonMenino: {
    backgroundColor: '#0000FF',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  sectionButtonMenina: {
    backgroundColor: '#FF1493',
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
