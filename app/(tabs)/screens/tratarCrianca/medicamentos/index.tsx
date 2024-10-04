// screens/aidpi_neonatal/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Medicamentos() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>Administrar os medicamentos por via oral em casa</Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/viaOral')}>
            <Text style={styles.buttonText}>Antibiótico Oral Recomendado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/antimalaricoOral')}>
            <Text style={styles.buttonText}>Antimalárico Oral</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/analgesico')}>
            <Text style={styles.buttonText}>Analgésico/Antitérmico</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/vitaminaA')}>
            <Text style={styles.buttonText}>Vitamina A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/ferro')}>
            <Text style={styles.buttonText}>Ferro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/mebendazol')}>
            <Text style={styles.buttonText}>Mebendazol</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/polivitaminas')}>
            <Text style={styles.buttonText}>Dar polivitaminas e sais minerais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/hipoglicemia')}>
            <Text style={styles.buttonText}>Tratar a criança para evitar hipoglicemia</Text>
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
    textAlign: 'center',
  },
});
