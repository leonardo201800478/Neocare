import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TratarDesidratacaoGrave() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Plano C: Tratar Rapidamente a Desidratação Grave</Text>
        <Text style={styles.content}>
          Acompanhar as setas. Se a resposta for "SIM", ir à lateral. Se for "NÃO", ir para baixo.
        </Text>

        <Text style={styles.sectionTitle}>Começar Aqui:</Text>

        <View style={styles.box}>
          <Text style={styles.question}>
            Pode aplicar imediatamente líquidos por via intravenosa (IV)?
          </Text>
          <Text style={styles.answer}>Sim:</Text>
          <Text style={styles.content}>
            - Começar a dar líquidos imediatamente por via IV se a criança conseguir beber, dar SRO
            por via oral enquanto o gotejador estiver sendo montado. - Reavaliar a criança a cada
            15-30 minutos e ajustar a velocidade conforme necessário. - Também dar SRO (cerca de 5
            ml/kg/hora) logo que a criança conseguir beber: geralmente em 1 a 2 horas. - Transferir
            a criança para solução de manutenção, como SGF 1/2.
          </Text>
          <Text style={styles.answer}>Não:</Text>
          <Text style={styles.content}>
            - Pode aplicar tratamento por via nas proximidades (em até 30 minutos)?
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.question}>Pode aplicar tratamento por via nas proximidades?</Text>
          <Text style={styles.answer}>Sim:</Text>
          <Text style={styles.content}>
            - Referir urgentemente ao hospital para o tratamento IV.
          </Text>
          <Text style={styles.answer}>Não:</Text>
          <Text style={styles.content}>
            - Recebeu treinamento para usar Sonda Nasogástrica (NG) para reidratação?
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.question}>
            Recebeu treinamento para usar Sonda Nasogástrica (NG)?
          </Text>
          <Text style={styles.answer}>Sim:</Text>
          <Text style={styles.content}>
            - Iniciar a reidratação com SRO, por sonda ou pela boca: dar 20 a 30 ml/kg/hora. -
            Reavaliar a criança após 1-2 horas. - Se houver vômitos repetidos ou um aumento do
            distensão abdominal, dar o líquido mais lentamente.
          </Text>
          <Text style={styles.answer}>Não:</Text>
          <Text style={styles.content}>- A criança consegue beber?</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.question}>A criança consegue beber?</Text>
          <Text style={styles.answer}>Sim:</Text>
          <Text style={styles.content}>- Iniciar a reidratação com SRO pela boca.</Text>
          <Text style={styles.answer}>Não:</Text>
          <Text style={styles.content}>
            - Referir urgentemente ao hospital para tratamento IV ou NG.
          </Text>
        </View>

        <Text style={styles.note}>
          Nota: Caso não consiga transferir, observe a criança pelo menos 6 horas após a reidratação
          para se certificar de que não há piora.
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
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#E0F2F1',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  answer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004D40', // Verde mais escuro para as respostas "Sim" e "Não"
    marginTop: 10,
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    color: '#C62828', // Vermelho para notas importantes
    fontStyle: 'italic',
    marginBottom: 20,
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
