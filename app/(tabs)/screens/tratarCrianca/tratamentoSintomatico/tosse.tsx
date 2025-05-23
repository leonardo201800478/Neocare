// screens/tratarCrianca/aliviarTosse.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AliviarTosse() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Aliviar a Tosse com Medidas Caseiras</Text>

        <View style={styles.contentBox}>
          <Text style={styles.instructionsText}>Aumentar a oferta de líquidos:</Text>
          <Text style={styles.instructionsText}>
            - Para menores de 6 meses de idade, em regime exclusivo de aleitamento materno, oferecer
            o peito mais vezes.
          </Text>
          <Text style={styles.instructionsText}>
            - Mel de abelha ou outras medidas culturalmente aceitas.
          </Text>
          <Text style={styles.instructionsText}>Remédios nocivos a desencorajar:</Text>
          <Text style={styles.instructionsText}>
            - Antinflamatórios, sedativos da tosse, expectorantes.
          </Text>
        </View>

        {/* Botão "Voltar" */}
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Fundo verde claro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  contentBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});
