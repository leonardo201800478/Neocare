// screens/aidpi_neonatal/consultaRetorno.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConsultaRetorno() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Consulta de Retorno</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/pneumonia')}>
            <Text style={styles.linkText}>Pneumonia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/diarreia')}>
            <Text style={styles.linkText}>Diarreia Persistente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/disenteria')}>
            <Text style={styles.linkText}>Disenteria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/malaria')}>
            <Text style={styles.linkText}>Malária, Provável Malária ou Malária Pouco Provável</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/doencaFebril')}>
            <Text style={styles.linkText}>Doença Febril (área sem Risco de Malária)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/infecOuvido')}>
            <Text style={styles.linkText}>Infecção de Ouvido</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/alimentacao')}>
            <Text style={styles.linkText}>Problema de Alimentação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/pesoBaixo')}>
            <Text style={styles.linkText}>Peso Baixo ou Ganho Insuficiente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/pesoMuitoBaixo')}>
            <Text style={styles.linkText}>Peso Muito Baixo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push('/screens/consultaRetorno/anemia')}>
            <Text style={styles.linkText}>Anemia</Text>
          </TouchableOpacity>
        </View>

        {/* Botão "Voltar" */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF', // Fundo vermelho
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  image: {
    width: 513,
    height: 268,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: '#4CAF50', // Verde escuro para botões
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#2E7D32', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
