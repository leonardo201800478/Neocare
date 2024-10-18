// app/screens/TratarPesoMuitoBaixo.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TratarPesoMuitoBaixo() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Tratar o Peso Muito Baixo
        </Animatable.Text>

        <Text style={styles.content}>
          "Sua criança está com o peso muito baixo. Ela vai se fortalecer com dietas especiais."
        </Text>

        {/* Dietas */}
        <View style={styles.table}>
          <Text style={styles.tableTitle}>
            <Ionicons name="nutrition-outline" size={20} color="#4A148C" /> DIETA 1
          </Text>
          <Text style={styles.tableContent}>
            2 colheres de sopa de leite em pó integral ou 200 ml de leite fluido
          </Text>
          <Text style={styles.tableContent}>2 colheres de sopa de abóbora cozida</Text>
          <Text style={styles.tableContent}>1 colher de chá de óleo</Text>
          <Text style={styles.tableContent}>1 colher de sopa de açúcar</Text>
          <Text style={styles.tableContent}>
            Acrescente água fervida até completar 1 copo (200 ml)
          </Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableTitle}>
            <Ionicons name="nutrition-outline" size={20} color="#4A148C" /> DIETA 2
          </Text>
          <Text style={styles.tableContent}>4 colheres de sopa de arroz cozido</Text>
          <Text style={styles.tableContent}>2 colheres de chá de óleo</Text>
          <Text style={styles.tableContent}>1 colher de sopa de açúcar</Text>
          <Text style={styles.tableContent}>
            Acrescente água fervida até completar 1 copo (200 ml)
          </Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableTitle}>
            <Ionicons name="nutrition-outline" size={20} color="#4A148C" /> DIETA 3
          </Text>
          <Text style={styles.tableContent}>4 colheres de sopa de arroz cozido</Text>
          <Text style={styles.tableContent}>1 colher de sopa de óleo</Text>
          <Text style={styles.tableContent}>1 colher de sopa de carne moída</Text>
          <Text style={styles.tableContent}>
            Acrescente água fervida até completar 1 copo (200 ml)
          </Text>
        </View>

        <View style={styles.table}>
          <Text style={styles.tableTitle}>
            <Ionicons name="nutrition-outline" size={20} color="#4A148C" /> DIETA 4
          </Text>
          <Text style={styles.tableContent}>4 colheres de sopa de arroz cozido</Text>
          <Text style={styles.tableContent}>
            4 colheres de sopa cheia de massa de feijão peneirado
          </Text>
          <Text style={styles.tableContent}>1 colher de sopa de óleo</Text>
          <Text style={styles.tableContent}>
            Acrescente caldo de feijão até completar 1 copo (200 ml)
          </Text>
        </View>

        <Text style={styles.note}>
          OBS.: O arroz pode ser substituído por fubá, utilizando metade da quantidade do arroz
          (veja tabela de dietas acima) e cozinhando por 3 a 4 minutos.
        </Text>

        <Text style={styles.content}>
          Faça estas dietas até o próximo retorno variando as refeições no mesmo dia ou de um dia
          para o outro, para a criança não enjoar da comida. Ofereça 6 vezes ao dia, garantindo que
          a criança coma:
        </Text>

        <View style={styles.table}>
          <Text style={styles.tableContent}>3-5 kg: 1/2 de copo (200 ml) cada vez</Text>
          <Text style={styles.tableContent}>6-10 kg: 2/3 de copo (200 ml) cada vez</Text>
          <Text style={styles.tableContent}>11-14 kg: 1 copo (200 ml) cada vez</Text>
        </View>

        <Text style={styles.note}>
          Dê o peito entre as refeições, sempre que a criança quiser. Um copo de 200 ml (tipo
          requeijão e extrato de tomate).
        </Text>

        <Text style={styles.important}>Voltar imediatamente se a criança recusar a comida.</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Fundo suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Roxo escuro
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 10,
    backgroundColor: '#C8E6C9', // Fundo em roxo claro
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  tableContent: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    color: '#D81B60', // Vermelho para avisos importantes
    fontStyle: 'italic',
    marginBottom: 10,
  },
  important: {
    fontSize: 16,
    color: '#C62828', // Vermelho escuro para alertas
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
