import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Hipoglicemia() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Título Principal */}
        <Text style={styles.title}>HIPOGLICEMIA</Text>

        {/* Instruções de Tratamento */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            <Text style={{ fontWeight: 'bold' }}>- Tratar a criança para evitar Hipoglicemia</Text>
            {'\n'}
            Se a criança consegue mamar no peito:{'\n'}- Pedir à mãe que amamente a criança no
            peito.{'\n'}
            Se a criança não consegue mamar no peito, mas consegue engolir:{'\n'}- Dar leite materno
            extraído ou, na impossibilidade, outro leite.{'\n'}- Se não houver nenhum destes
            disponíveis, dar água açucarada.{'\n'}- Dar 30 - 50 ml de leite ou água açucarada antes
            da criança partir.{'\n'}
            Para preparar água açucarada:{'\n'}- Dissolver 4 colheres de chá rasas de açúcar (20
            gramas) em uma xícara com 200 ml de água potável.{'\n'}
            Se a criança não consegue engolir:{'\n'}- Dar 50 ml de leite ou água açucarada através
            de conta-gotas ou sonda nasogástrica.{'\n'}- Se há possibilidade de usar a via venosa,
            faça um flush de glicose (5 a 10 ml/kg de soro glicosado a 10%).
          </Text>
        </View>

        {/* Botão "Voltar" no Final da Página */}
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#F9F9F9',
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
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
