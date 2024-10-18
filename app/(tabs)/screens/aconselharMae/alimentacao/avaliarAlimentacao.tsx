// app/screens/AconselharMae.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AconselharMae() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Aconselhar a Mãe ou o Acompanhante
        </Animatable.Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="nutrition-outline" size={20} color="#2E7D32" /> Até 6 meses de idade:
          </Text>
          <Text style={styles.content}>
            - Amamentar ao peito tantas vezes quanto a criança quiser de dia e de noite, pelo menos
            oito vezes em cada 24 horas.
          </Text>
          <Text style={styles.content}>- Não dar nenhuma outra comida ou líquidos.</Text>
          <Text style={styles.content}>
            - Limpar a cavidade oral da criança com a ponta de uma fralda umedecida em água, uma vez
            ao dia, preferencialmente à noite.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="restaurant-outline" size={20} color="#2E7D32" /> De 6 a 7 meses:
          </Text>
          <Text style={styles.content}>- Continuar dando o peito.</Text>
          <Text style={styles.content}>
            - Acrescentar: alimentos complementares, frutas, cereais, legumes, verduras e gema de
            ovo. Carne e vísceras.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="calendar-outline" size={20} color="#2E7D32" /> De 8 a 11 meses:
          </Text>
          <Text style={styles.content}>- Continuar dando o peito.</Text>
          <Text style={styles.content}>
            - Dar da mesma comida servida à família, porém com consistência pastosa.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="calendar-outline" size={20} color="#2E7D32" /> 1 ano:
          </Text>
          <Text style={styles.content}>- Continuar dando o peito.</Text>
          <Text style={styles.content}>
            - Dar cinco refeições ao dia, sendo três refeições da mesma comida servida à família.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="calendar-outline" size={20} color="#2E7D32" /> 2 anos ou mais:
          </Text>
          <Text style={styles.content}>
            - Dar cinco refeições ao dia, sendo três refeições da mesma comida servida à família.
          </Text>
          <Text style={styles.content}>
            - Evitar oferecer guloseimas, refrigerantes e produtos industrializados como
            substituição à refeição.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="medkit-outline" size={20} color="#2E7D32" /> No Caso de Doença:
          </Text>
          <Text style={styles.content}>- Ofereça mais o peito se estiver mamando.</Text>
          <Text style={styles.content}>
            - Aumente pelo menos uma refeição até o final da doença.
          </Text>
        </View>

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
  section: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#C8E6C9', // Fundo verde claro para seções
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para os títulos de seção
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    color: '#1B5E20', // Verde escuro
    textAlign: 'justify',
    marginBottom: 10,
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
    opacity: 0.9,
    marginBottom: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
