import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TratarDiarreiaEmCasa() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Plano A: Tratar a Diarreia em Casa</Text>

        <Text style={styles.content}>
          Recomendar à mãe ou ao acompanhante sobre as três regras do tratamento domiciliar: Dar
          Líquidos Adicionais, Continuar a Alimentar, Quando Retornar.
        </Text>

        <Text style={styles.sectionTitle}>
          1. Dar Líquidos Adicionais (tanto quanto a criança aceitar):
        </Text>
        <Text style={styles.subSectionTitle}>Recomendar à mãe a:</Text>
        <Text style={styles.content}>
          - Amamentar com maior frequência e por tempo mais longo a cada vez.
        </Text>
        <Text style={styles.content}>
          - Se a criança se alimenta exclusivamente de leite materno, pode-se dar SRO (Solução de
          Reidratação Oral) além do leite materno.
        </Text>
        <Text style={styles.content}>
          - Se a criança não estiver em regime exclusivo de leite materno, dar um ou mais dos
          seguintes líquidos: Solução SRO, líquidos caseiros (tais como caldos, água de arroz, soro
          caseiro) ou água potável.
        </Text>

        <Text style={styles.subSectionTitle}>Importância de Dar SRO em Casa:</Text>
        <Text style={styles.content}>
          - Durante esta visita a criança recebeu o tratamento do Plano B ou do Plano C.
        </Text>
        <Text style={styles.content}>
          - Se a criança não puder retornar a um serviço de saúde e a diarreia piorar.
        </Text>

        <Text style={styles.subSectionTitle}>Ensinar a Mãe a Preparar a Mistura e a Dar SRO:</Text>
        <Text style={styles.content}>
          - Entregar um pacote de SRO à mãe para utilizar em casa, se necessário.
        </Text>
        <Text style={styles.content}>
          - Mostrar à mãe a quantidade de líquidos adicionais e dar em casa além dos líquidos dados
          habitualmente.
        </Text>
        <Text style={styles.content}>
          - Até 1 ano: 50 a 100 ml depois de cada evacuação aquosa.
        </Text>
        <Text style={styles.content}>
          - 1 ano ou mais: 100 a 200 ml depois de cada evacuação aquosa.
        </Text>

        <Text style={styles.sectionTitle}>Recomendar à mãe ou ao acompanhante a:</Text>
        <Text style={styles.content}>
          - Administrar frequentemente pequenos goles de líquidos em xícara.
        </Text>
        <Text style={styles.content}>
          - Se a criança vomitar, aguardar 10 minutos e depois continuar, porém mais lentamente.
        </Text>
        <Text style={styles.content}>
          - Continuar a dar líquidos adicionais até a diarreia parar.
        </Text>

        <Text style={styles.important}>
          2. Continuar a Alimentar {'\n'}3. Quando Retornar: Consultar o Quadro Aconselhar a Mãe ou
          o Acompanhante.
        </Text>

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
    backgroundColor: '#E8F5E9', // Fundo em verde claro
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para títulos de seção
    marginTop: 20,
    marginBottom: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Verde médio para subtítulos
    marginTop: 10,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
  },
  important: {
    fontSize: 16,
    color: '#C62828', // Vermelho para alertas importantes
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
