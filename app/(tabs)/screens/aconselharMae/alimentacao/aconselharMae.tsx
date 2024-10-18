// app/screens/ProblemasAlimentacao.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProblemasAlimentacao() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Aconselhar a Mãe ou o Acompanhante Quanto a Problemas de Alimentação
        </Text>

        <Text style={styles.content}>
          Se a criança não estiver sendo alimentada conforme descrito acima, orientar devidamente a
          mãe ou ao acompanhante. Além disso:
        </Text>

        <Text style={styles.sectionTitle}>Dificuldade com a Amamentação:</Text>
        <Text style={styles.content}>
          - Se a mãe declarar ter dificuldade com a amamentação, avaliar a amamentação. Consultar o
          quadro "A Criança de 1 Semana a 2 Meses de Idade". Quando for preciso, mostre à mãe a
          posição e a pega corretas para a amamentação.
        </Text>

        <Text style={styles.sectionTitle}>
          Criança com Menos de 6 Meses e Tomando Outro Tipo de Leite ou Alimento:
        </Text>
        <Text style={styles.content}>
          - Aumentar a confiança da mãe de que ela pode produzir todo o leite que a criança
          necessita.
        </Text>
        <Text style={styles.content}>
          - Sugerir que ela dê o peito com maior frequência e por mais tempo, de dia e à noite, e
          para reduzir gradativamente o tipo de leite ou alimentos. É importante retirar a
          mamadeira.
        </Text>
        <Text style={styles.content}>
          - Como esta troca é importante para a alimentação da criança, peça à mãe que volte em 2
          dias.
        </Text>

        <Text style={styles.sectionTitle}>
          Se For Necessário Continuar a Dar Outro Tipo de Leite:
        </Text>
        <Text style={styles.content}>
          - Amamentar ao peito tanto quanto possível, inclusive à noite.
        </Text>
        <Text style={styles.content}>
          - Certificar-se de que o outro tipo de leite seja apropriado e esteja disponível.
        </Text>
        <Text style={styles.content}>
          - Assegurar-se de que o outro tipo de leite seja preparado higienicamente e corretamente,
          e ministrado em quantidades apropriadas em copinho ou colher.
        </Text>
        <Text style={styles.content}>
          - Oferecer leite preparado no espaço de uma hora. Não usar restos de leite ou outros
          alimentos de uma refeição para outra.
        </Text>

        <Text style={styles.sectionTitle}>Uso de Mamadeira:</Text>
        <Text style={styles.content}>
          - Se a mãe estiver usando mamadeira para alimentar a criança, recomendar que use um copo
          pequeno, colher ou xícara no lugar da mamadeira.
        </Text>
        <Text style={styles.content}>
          - Ensinar a alimentar a criança com a xícara/copo ou colher.
        </Text>

        <Text style={styles.sectionTitle}>Alimentação Ativa:</Text>
        <Text style={styles.content}>- Sentar-se com a criança e incentivá-la a comer.</Text>
        <Text style={styles.content}>
          - Servir à criança uma porção adequada em um prato ou tigela separada.
        </Text>
        <Text style={styles.content}>
          - A criança deve usar sua própria colher para estimulá-la a comer ativamente, assim como
          para desenvolver precocemente sua coordenação motora. A mãe deve ficar junto à criança,
          ajudando-a para que coma o suficiente.
        </Text>

        <Text style={styles.sectionTitle}>Alimentação Durante a Doença:</Text>
        <Text style={styles.content}>
          - Amamentar ao peito com maior frequência e, se possível, por mais tempo.
        </Text>
        <Text style={styles.content}>
          - Usar pequenas porções com maior frequência, evitando monotonia de sabor e textura,
          respeitando a aceitação da criança.
        </Text>
        <Text style={styles.content}>
          - Limpar o nariz obstruído se estiver atrapalhando a alimentação.
        </Text>
        <Text style={styles.content}>
          - Contar que o apetite há de melhorar à medida que a criança se recupera.
        </Text>
        <Text style={styles.content}>
          - Oferecer, no caso de náuseas, alimentos ácidos como iogurte ou coalhada.
        </Text>
        <Text style={styles.content}>
          - Adaptar a consistência para a capacidade de deglutição da criança.
        </Text>

        <Text style={styles.important}>
          Fazer o acompanhamento de qualquer problema alimentar em 5 dias.
        </Text>

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
    backgroundColor: '#E8F5E9', // Fundo em um tom suave de verde
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#C8E6C9', // Fundo verde claro para as seções
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
    color: '#1B5E20',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  important: {
    fontSize: 16,
    color: '#C62828', // Vermelho mais escuro para alertas importantes
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0.9,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});