import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AntibioticosRecomendados() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Administre as primeiras doses de antibióticos por VIA INTRAMUSCULAR
      </Text>
      <Text style={styles.text}>
        As crianças menores de 2 meses com POSSÍVEL INFECÇÃO BACTERIANA GRAVE podem infectar-se com
        uma variedade mais ampla de bactérias que uma criança de dois meses de idade (GENTAMICINA +
        PROCAÍNA).
      </Text>

      <Text style={styles.subtitle}>Dê a primeira dose dos antibióticos por VIA INTRAMUSCULAR</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>PESO (kg)</Text>
          <Text style={styles.tableHeaderText}>GENTAMICINA (2,5 mg/kg/dose)</Text>
          <Text style={styles.tableHeaderText}>PENICILINA G PROCAÍNA (50.000 UI/kg/dose)</Text>
        </View>
        {[
          { peso: 1, gentamicina: '0,25 ml', penicilina: '0,13 ml' },
          { peso: 2, gentamicina: '0,50 ml', penicilina: '0,25 ml' },
          { peso: 3, gentamicina: '0,75 ml', penicilina: '0,40 ml' },
          { peso: 4, gentamicina: '1,00 ml', penicilina: '0,50 ml' },
          { peso: 5, gentamicina: '1,25 ml', penicilina: '0,60 ml' },
        ].map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.peso}</Text>
            <Text style={styles.tableCell}>{item.gentamicina}</Text>
            <Text style={styles.tableCell}>{item.penicilina}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.text}>
        Gentamicina: 5 mg/kg/dia administrado de 24 em 24 horas (eficácia, comodidade, custos e
        menos efeitos colaterais - Barclay ML et al., Clin Pharmacokinet; 36(2): 89-98, 1999.
      </Text>

      <Text style={styles.text}>
        Na impossibilidade de utilização de antibiótico por via intramuscular, usar Via Oral.
      </Text>

      {/* Botão para Via Intramuscular */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/medicamentos/')}>
        <Text style={styles.buttonText}>Ver Via Intramuscular</Text>
      </TouchableOpacity>

      {/* Botão para Via Oral */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/medicamentos/')}>
        <Text style={styles.buttonText}>Ver Via Oral</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 15,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#1B5E20',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#A5D6A7',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1B5E20',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#1B5E20',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
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
