import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AconselharMae() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Aconselhar a Mãe ou o Acompanhante</Text>

        <Text style={styles.sectionTitle}>Até 6 meses de idade:</Text>
        <Text style={styles.content}>
          - Amamentar ao peito tantas vezes quanto a criança quiser de dia e de noite, pelo menos
          oito vezes em cada 24 horas.
        </Text>
        <Text style={styles.content}>- Não dar nenhuma outra comida ou líquidos.</Text>
        <Text style={styles.content}>
          - Limpar a cavidade oral da criança com a ponta de uma fralda umedecida em água, uma vez
          ao dia, preferencialmente à noite.
        </Text>

        <Text style={styles.sectionTitle}>De 6 a 7 meses:</Text>
        <Text style={styles.content}>- Continuar dando o peito.</Text>
        <Text style={styles.content}>
          - Acrescentar: alimentos complementares, frutas, cereais, legumes, verduras e gema de ovo.
          Carne e vísceras.
        </Text>
        <Text style={styles.content}>
          - Dar esses alimentos iniciando uma a duas vezes por dia até completar três vezes ou mais
          se estiver mamando.
        </Text>
        <Text style={styles.content}>
          - No início, a alimentação complementar deve ser espessa (papa ou purê) e ser oferecida de
          colher.
        </Text>
        <Text style={styles.content}>
          - Observar os cuidados de higiene no preparo e oferta dos alimentos.
        </Text>
        <Text style={styles.content}>- Oferecer água à criança nos intervalos das refeições.</Text>

        <Text style={styles.sectionTitle}>De 8 a 11 meses:</Text>
        <Text style={styles.content}>- Continuar dando o peito.</Text>
        <Text style={styles.content}>
          - Dar da mesma comida servida à família, porém com consistência pastosa.
        </Text>
        <Text style={styles.content}>
          - Garantir que receba cereais, leguminosas, carne, ovos, peixe, vísceras, frutas e
          verduras.
        </Text>
        <Text style={styles.content}>- Proporcionar à criança a alimentação supervisionada.</Text>
        <Text style={styles.content}>
          - Escovar os dentes com escova macia após as refeições, sem pasta de dente, com água.
        </Text>

        <Text style={styles.sectionTitle}>1 ano:</Text>
        <Text style={styles.content}>- Continuar dando o peito.</Text>
        <Text style={styles.content}>
          - Dar cinco refeições ao dia, sendo três refeições da mesma comida servida à família.
        </Text>
        <Text style={styles.content}>
          - Dois lanches nutritivos entre as refeições, tais como tubérculos cozidos, pães, leite ou
          derivados.
        </Text>
        <Text style={styles.content}>
          - Dar alimentos ricos em vitamina A e ferro, como vísceras, verduras, frutas
          amarelo-alaranjadas.
        </Text>
        <Text style={styles.content}>
          - Garantir que receba cereais, leguminosas, carnes, ovos, peixe e verduras.
        </Text>

        <Text style={styles.sectionTitle}>2 anos ou mais:</Text>
        <Text style={styles.content}>
          - Dar cinco refeições ao dia, sendo três refeições da mesma comida servida à família.
        </Text>
        <Text style={styles.content}>
          - Evitar oferecer guloseimas, refrigerantes e produtos industrializados como substituição
          à refeição.
        </Text>

        <Text style={styles.sectionTitle}>No Caso de Doença:</Text>
        <Text style={styles.content}>- Ofereça mais o peito se estiver mamando.</Text>
        <Text style={styles.content}>- Aumente pelo menos uma refeição até o final da doença.</Text>
        <Text style={styles.content}>- Faça as comidas preferidas e dê mais vezes ao dia.</Text>
        <Text style={styles.content}>
          - Limpe o nariz se estiver entupido ou escorrendo, dificultando a alimentação.
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
