// screens/tratarCrianca/artemeterInjetavel.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ArtemeterInjetavel() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Administrar Artemeter Injetável para Malária Grave</Text>
        <Text style={styles.subtitle}>(Área com alto risco de Malária)</Text>

        <Text style={styles.instructionsText}>
          PARA CRIANÇAS SENDO REFERIDAS COM MALÁRIA GRAVE OU DOENÇA FEBRIL MUITO GRAVE:
        </Text>
        <Text style={styles.instructionsText}>
          - Dar a primeira dose de Artemeter IM, após confirmação através do teste da gota espessa e
          referir URGENTEMENTE a criança ao hospital.
        </Text>

        {/* Tabela de Dosagens */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>IDADE OU PESO</Text>
            <Text style={styles.tableHeaderText}>QUININA por via intramuscular</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{'<'} 2 meses (4kg)</Text>
            <Text style={styles.tableCell}>0,1 a 0,2 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>2 a 4 meses (4 a {'<'}6kg)</Text>
            <Text style={styles.tableCell}>0,2 a 0,3 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>4 a 11 meses (6 a {'<'}10 kg)</Text>
            <Text style={styles.tableCell}>0,3 a 0,4 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1 ano (10 a {'<'}12 kg)</Text>
            <Text style={styles.tableCell}>0,4 a 0,5 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>2 anos (12 a {'<'}14 kg)</Text>
            <Text style={styles.tableCell}>0,5 a 0,6 ml</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>3 a 4 anos (14 a 19 kg)</Text>
            <Text style={styles.tableCell}>0,6 a 0,8 ml</Text>
          </View>
        </View>

        {/* Informações Adicionais */}
        <Text style={styles.sectionTitle}>Se não for possível referir:</Text>
        <Text style={styles.instructionsText}>
          - Usar Artemeter por via IM, na dose de 3,2 mg/kg/peso, em dose única no 1º dia. Após 23
          horas, aplicar 1,6 mg/kg/peso a cada 24 horas por 4 dias, totalizando 5 dias de
          tratamento.
        </Text>
        <Text style={styles.instructionsText}>
          - Completar o tratamento com: Clindamicina, 20 mg/kg/dia por 5 dias, dividida em 2 tomadas
          de 12/12 horas via oral ou Doxiciclina, 3,3 mg/kg/dia dividida em 12/12 horas por 5 dias
          via oral; ou Mefloquina, 15 a 20 mg/kg em dose única via oral.
        </Text>
        <Text style={styles.instructionsText}>
          - Estes medicamentos devem ser administrados ao final do tratamento com derivados de
          Artemisinina.
        </Text>
        <Text style={styles.instructionsText}>
          - A Doxiciclina não deve ser administrada a gestantes e menores de 8 anos.
        </Text>
        <Text style={styles.instructionsText}>
          - A Mefloquina não deve ser usada em gestantes no 1º trimestre.
        </Text>
        <Text style={styles.instructionsText}>
          - Orientações sobre outros esquemas de tratamento de Malária grave, ver anexos.
        </Text>

        {/* Botão "Voltar" */}
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
    backgroundColor: '#E8F5E9', // Fundo verde claro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro para subtítulo
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginVertical: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#C8E6C9', // Verde claro para o cabeçalho da tabela
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableHeaderText: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1B5E20',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: '#1B5E20',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
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
  },
});
