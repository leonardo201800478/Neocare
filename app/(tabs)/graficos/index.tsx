// app/(tabs)/screens/graficos/index.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Graficos() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Gráfico Peso/Idade</Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.sectionButton, styles.sectionButtonMenina]}
            onPress={() => router.push('/graficos/graficos_meninas_0a2/')}>
            <Text style={styles.buttonText}>Gráficos Meninas 0 a 2 meses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sectionButton, styles.sectionButtonMenino]}
            onPress={() => router.push('/graficos/graficos_meninos_0a2/')}>
            <Text style={styles.buttonText}>Gráficos Meninos 0 a 2 meses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sectionButton, styles.sectionButtonMenina]}
            onPress={() => router.push('/graficos/graficos_meninas_2a5/')}>
            <Text style={styles.buttonText}>Gráficos Meninas 2 meses a 5 anos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sectionButton, styles.sectionButtonMenino]}
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
    backgroundColor: '#ffffff',
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 40,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    minWidth: '48%',
  },
  sectionButtonMenina: {
    backgroundColor: '#FF69B4',
  },
  sectionButtonMenino: {
    backgroundColor: '#00B0FF',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
