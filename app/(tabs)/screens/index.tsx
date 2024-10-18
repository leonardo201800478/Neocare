// app/screens/index.tsx
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
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          AIDPI Neonatal - NEOCARE
        </Animatable.Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/')}>
            <Ionicons name="medkit-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Tratar a Criança</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/consultaRetorno/')}>
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Consulta de Retorno</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/aconselharMae/')}>
            <Ionicons name="heart-circle-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Aconselhar a Mãe</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
  },
  sectionButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0.9,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
