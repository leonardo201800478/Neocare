// screens/aidpi_neonatal/medicamentos.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Medicamentos() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Administrar os Medicamentos por Via Oral em Casa</Text>

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
            <Text style={styles.buttonText}>Dar Polivitaminas e Sais Minerais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionButton}
            onPress={() => router.push('/screens/tratarCrianca/medicamentos/hipoglicemia')}>
            <Text style={styles.buttonText}>Tratar a Criança para Evitar Hipoglicemia</Text>
          </TouchableOpacity>
        </View>

        {/* Botão "Voltar" no Final da Página */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/screens/tratarCrianca/')}>
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
    backgroundColor: '#E8F5E9', // Fundo verde claro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20', // Verde escuro
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
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
