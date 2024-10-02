import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AconselharMae() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Aconselhar a Mãe ou o Acompanhante</Text>

      <Text style={styles.sectionTitle}>Avaliar a Alimentação da Criança:</Text>
      <Text style={styles.content}>
        Fazer perguntas sobre qual é a alimentação habitual da criança e, em particular, qual a
        alimentação durante esta doença:
      </Text>
      <Text style={styles.content}>
        * Você amamenta sua criança ao peito? Quantas vezes durante o dia? Também amamenta à noite?
      </Text>
      <Text style={styles.content}>
        * A criança ingere algum outro alimento ou consome outro líquido? Quais? Quantas vezes por
        dia? Como prepara?
      </Text>
      <Text style={styles.content}>
        * O que usa para alimentar? Qual o tamanho das porções? Quem dá de comer e como?
      </Text>
      <Text style={styles.content}>
        * Durante esta doença, houve mudança na alimentação da criança? Se houve, qual?
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Até 6 meses de idade</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>De 6 a 7 meses</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>De 8 a 11 meses</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>1 ano</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>2 anos ou mais</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            - Amamentar ao peito tantas vezes quanto a criança quiser de dia e de noite, pelo menos
            oito vezes em cada 24 horas.{'\n'}- Não dar nenhuma outra comida ou líquidos.{'\n'}-
            Limpar a cavidade oral da criança com a ponta de uma fralda umedecida em água, uma vez
            ao dia, preferencialmente à noite.
          </Text>
          <Text style={styles.tableCell}>
            - Continuar dando o peito.{'\n'}- Acrescentar: alimentos complementares, frutas,
            cereais, leguminosas, verduras e gema de ovo, carne e vísceras.{'\n'}- Dar essas
            alimentos iniciando uma a 2 vezes por dia até completar 3 vezes e 5 vezes ao dia se não
            estiver mamando (2 papas salgadas, 2 papas de frutas e um mingau de cereal).{'\n'}- Não
            iniciar a alimentação complementar deve ser espessa (papa ou purê) e ser oferecida de
            colher.
          </Text>
          <Text style={styles.tableCell}>
            - Continuar dando o peito.{'\n'}- Dar da mesma comida servida à família, porém com
            consistência pastosa.{'\n'}- Garantir que receba: cereais, leguminosas, carnes, ovos,
            peixe, vísceras, frutas e verduras.
          </Text>
          <Text style={styles.tableCell}>
            - Continuar dando o peito.{'\n'}- Dar 5 refeições ao dia, sendo 3 refeições da mesma
            comida servida à família.{'\n'}- 2 lanches nutritivos entre as refeições: frutas da
            estação, tubérculos cozidos, pães, leite e derivados.
          </Text>
          <Text style={styles.tableCell}>
            - Dar cinco refeições ao dia, sendo 3 refeições da mesma comida servida à família e 2
            lanches nutritivos entre as refeições.{'\n'}- Evitar oferecer guloseimas entre as
            refeições ou em substituição a elas.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>No Caso de Doença:</Text>
      <Text style={styles.content}>- Ofereça mais o peito se estiver mamando.</Text>
      <Text style={styles.content}>- Faça as comidas preferidas e dê mais vezes ao dia.</Text>
      <Text style={styles.content}>- Aumente pelo menos uma refeição até o final da doença.</Text>
      <Text style={styles.content}>
        - Limpe o nariz, se estiver entupido ou escorrendo, dificultando a alimentação.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // Verde claro para o fundo da tela
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para seções
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#1B5E20',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#C8E6C9', // Verde claro para linhas
    borderBottomWidth: 1,
    borderColor: '#1B5E20',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#1B5E20',
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'left',
  },
  tableHeader: {
    backgroundColor: '#388E3C', // Verde mais escuro para o cabeçalho
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: '90%',
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
