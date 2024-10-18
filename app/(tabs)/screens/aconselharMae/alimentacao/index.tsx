// app/(tabs)/screens/aconselharMae/alimentacao/index.tsx

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

export default function Alimentacao() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Botão de Voltar Estilizado */}


        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Alimentação
        </Animatable.Text>

        {/* Navegando para as subseções */}
        <View style={styles.buttonContainer}>
          <Animatable.View animation="fadeInUp" delay={200}>
            <TouchableOpacity
              style={styles.sectionButton}
              onPress={() => router.push('/screens/aconselharMae/alimentacao/avaliarAlimentacao')}>
              <Ionicons name="nutrition-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Avaliar a Alimentação da Criança</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={400}>
            <TouchableOpacity
              style={styles.sectionButton}
              onPress={() => router.push('/screens/aconselharMae/alimentacao/pesoBaixo')}>
              <Ionicons name="scale-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Ensinar a mãe a tratar o peso baixo em casa</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={600}>
            <TouchableOpacity
              style={styles.sectionButton}
              onPress={() => router.push('/screens/aconselharMae/alimentacao/aconselharMae')}>
              <Ionicons name="people-outline" size={24} color="white" />
              <Text style={styles.buttonText}>
                Aconselhar a Mãe ou o Acompanhante quanto a problemas de alimentação
              </Text>
            </TouchableOpacity>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32', // Verde escuro
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 270,
    marginBottom: 20,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20', // Verde escuro
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
  sectionButton: {
    backgroundColor: '#4CAF50', // Verde claro
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
