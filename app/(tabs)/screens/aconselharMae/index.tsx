// screens/aidpi_neonatal/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Aconselhar() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Aconselhar a Mãe ou o Acompanhante
        </Animatable.Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <Animatable.View animation="fadeInUp" delay={200}>
            <TouchableOpacity
              style={styles.sectionButton}
              onPress={() => router.push('/screens/aconselharMae/alimentacao/')}>
              <Ionicons name="nutrition-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Alimentação</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={400}>
            <TouchableOpacity
              style={styles.sectionButton}
              onPress={() => router.push('/screens/aconselharMae/liquidos/')}>
              <Ionicons name="water-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Líquidos</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={600}>
            <TouchableOpacity
              style={styles.sectionButton}
              onPress={() => router.push('/screens/aconselharMae/retorno/')}>
              <Ionicons name="calendar-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Quando Retornar</Text>
            </TouchableOpacity>
          </Animatable.View>

          {/* Botão de Voltar */}
          <Animatable.View animation="fadeInUp" delay={800}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#E8F5E9', // Fundo em verde claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20', // Verde escuro para o título
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 40,
  },
  buttonContainer: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  sectionButton: {
    backgroundColor: '#4CAF50', // Verde escuro para os botões
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32', // Verde escuro para o botão de voltar
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});
