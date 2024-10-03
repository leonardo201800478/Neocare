import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AntimalaricoOral() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Antimalárico Oral</Text>

      <Text style={styles.sectionTitle}>Instruções Gerais:</Text>
      <Text style={styles.content}>
        - Seguir as instruções abaixo para todos os medicamentos orais a serem administrados em
        casa.{'\n'}- Seguir, também, as instruções dadas na tabela de dosagem para cada um dos
        medicamentos.
      </Text>

      <Text style={styles.sectionTitle}>Tratamento para P. falciparum:</Text>
      <Text style={styles.content}>
        - Mefloquina: Dose única no 1º dia.{'\n'}- Primaquina: Dose única no 2º dia.
      </Text>

      <Text style={styles.sectionTitle}>Tratamento para P. vivax:</Text>
      <Text style={styles.content}>
        - Cloroquina: Administrar durante 3 dias.{'\n'}- Primaquina: Administrar durante 7 dias.
      </Text>

      <Text style={styles.sectionTitle}>Grupos Etários e Dosagens:</Text>
      <Text style={styles.content}>
        - Menor de 6 meses: Calcular a dose de Mefloquina (15 a 20 mg/kg de peso).{'\n'}- 6 a 11
        meses, 1 a 2 anos, 3 a 4 anos, 5 a 6 anos, 7 a 8 anos, 9 a 10 anos, 11 a 12 anos, 13 a 14
        anos, 15 anos ou mais: Há diferentes quantidades de comprimidos, variando conforme o
        medicamento e a fase do tratamento. (Ver tabela específica para detalhes).
      </Text>

      <Text style={styles.sectionTitle}>Observações Importantes:</Text>
      <Text style={styles.content}>
        - Caso haja reaparecimento da sintomatologia e teste positivo para P. vivax com tempo
        inferior a 60 dias, aplicar o mesmo esquema, porém a dose de primaquina deve ser dada por 14
        dias.{'\n'}- Triturar até pulverizar o comprimido na dose indicada, dissolvendo em 1/2
        colher de chá de água potável ou fervida e resfriada. Agitar e dar a dose de mistura como no
        quadro indicado.{'\n'}- A cloroquina e a primaquina deverão ser ingeridas preferencialmente
        nas refeições.{'\n'}- Não administrar primaquina para gestantes e crianças até 6 meses de
        idade.{'\n'}- Ver esquema de prevenção e recaída de malária.
      </Text>

      <Text style={styles.sectionTitle}>Malária Mista (P. falciparum e P. vivax):</Text>
      <Text style={styles.content}>
        Se a malária for causada por P. vivax associado ao P. falciparum, usar o esquema de
        tratamento para P. falciparum associando Mefloquina com Primaquina por 7 dias.
      </Text>

      <Text style={styles.sectionTitle}>Esquema de Tratamento Recomendado:</Text>
      <Text style={styles.content}>
        Esquema de 1ª escolha recomendado para tratamento das infecções por P. falciparum com
        Quinina em 3 dias + Doxiciclina em 5 dias e Primaquina no 6º dia, para ser usado em maiores
        de 8 anos de idade.
      </Text>

      {/* Table for Mixed Malaria Treatment */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Grupos Etários</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Quinina (3 dias)</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Doxiciclina (5 dias)</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Primaquina (6º dia)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>8 a 11 anos</Text>
          <Text style={styles.tableCell}>1 e 1/2 comp.</Text>
          <Text style={styles.tableCell}>1 comp.</Text>
          <Text style={styles.tableCell}>1 comp.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>12 a 14 anos</Text>
          <Text style={styles.tableCell}>2 e 1/2 comp.</Text>
          <Text style={styles.tableCell}>1 e 1/2 comp.</Text>
          <Text style={styles.tableCell}>2 comp.</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>15 anos ou mais</Text>
          <Text style={styles.tableCell}>4 comp.</Text>
          <Text style={styles.tableCell}>2 comp.</Text>
          <Text style={styles.tableCell}>3 comp.</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Tratamento Misto - Plasmodium vivax + Plasmodium falciparum:
      </Text>
      <Text style={styles.content}>
        Esquema recomendado para tratamento das infecções mistas por Plasmodium vivax + Plasmodium
        falciparum com Mefloquina em dose única e Primaquina em 7 dias.
      </Text>

      {/* Table for Treatment of Mixed Infections */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>Grupos Etários</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>1º Dia - Mefloquina</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>
            2º e 7º Dias - Primaquina Adulto
          </Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>
            2º e 7º Dias - Primaquina Infantil
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{'< 6 meses'}</Text>
          <Text style={styles.tableCell}>*</Text>
          <Text style={styles.tableCell}>-</Text>
          <Text style={styles.tableCell}>-</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>6 a 11 meses</Text>
          <Text style={styles.tableCell}>1/4 comp.</Text>
          <Text style={styles.tableCell}>-</Text>
          <Text style={styles.tableCell}>1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>1 a 2 anos</Text>
          <Text style={styles.tableCell}>1/2 comp.</Text>
          <Text style={styles.tableCell}>-</Text>
          <Text style={styles.tableCell}>1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>3 a 4 anos</Text>
          <Text style={styles.tableCell}>1 comp.</Text>
          <Text style={styles.tableCell}>1/2</Text>
          <Text style={styles.tableCell}>2</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>5 a 6 anos</Text>
          <Text style={styles.tableCell}>1 e 1/2 comp.</Text>
          <Text style={styles.tableCell}>1/2</Text>
          <Text style={styles.tableCell}>2</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>7 a 8 anos</Text>
          <Text style={styles.tableCell}>1 e 1/2 comp.</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>9 a 10 anos</Text>
          <Text style={styles.tableCell}>2 comp.</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>11 a 12 anos</Text>
          <Text style={styles.tableCell}>2 e 1/2 comp.</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>1 e 1/2</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>13 a 14 anos</Text>
          <Text style={styles.tableCell}>3 comp.</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>1 e 1/2</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>15 anos ou mais</Text>
          <Text style={styles.tableCell}>4 comp.</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>-</Text>
        </View>
      </View>

      <Text style={styles.note}>
        * Calcular 15 a 20 mg/kg de peso. A dose diária de mefloquina pode ser dividida em duas
        tomadas com intervalos de até 12 horas. Não usar primaquina em gestantes e menores de 6
        meses.
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
    color: '#1B5E20', // Verde escuro
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
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#388E3C', // Verde mais escuro para o cabeçalho
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 16,
    color: '#1B5E20',
    textAlign: 'justify',
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
