// screens/tratarCrianca/sibilancia.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TratarSibilancia() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tratar a Criança com Sibilância</Text>

        <Text style={styles.instructionsText}>
          - Criança em crise de sibilância: Administre um broncodilatador (B2) por via inalatória.
        </Text>

        {/* Fluxo de tratamento */}
        <View style={styles.table}>
          <Text style={styles.tableText}>Melhora da Sibilância? Ver abaixo.</Text>
          <Text style={styles.tableText}>
            Não melhora: Repetir Nebulização a cada 20 minutos, duas vezes no máximo.
          </Text>
          <Text style={styles.tableText}>Não melhora: referir ao hospital.</Text>
        </View>

        <Text style={styles.instructionsText}>
          Se a criança melhora da sibilância: Manter o tratamento com broncodilatador por 3 a 5
          dias, de 8/8 horas; usar via oral se a via inalatória não for disponível.
        </Text>
        <Text style={styles.instructionsText}>
          Se a criança não melhora da sibilância: Referir ao hospital.
        </Text>

        {/* Tabelas de dosagem */}
        <Text style={styles.sectionTitle}>Uso de Broncodilatadores</Text>
        <View style={styles.table}>
          <Text style={styles.tableHeader}>
            Broncodilatador de ação rápida (B2*): Via Inalatória
          </Text>
          <Text style={styles.tableText}>
            Nebulização - Tempo: 5 a 10 min - Dose: 1 gota cada 3 kg/dose diluída em 3 ml de soro
            fisiológico
          </Text>
          <Text style={styles.tableText}>Dose máxima Recomendada: 10 gotas</Text>
        </View>

        <Text style={styles.sectionTitle}>Broncodilatador oral (salbutamol*)</Text>
        <View style={styles.table}>
          <Text style={styles.tableText}>
            Idade ou Peso - Comprimido de 2 mg - Comprimido de 4 mg - Suspensão de 2 mg em 5 ml
          </Text>
          <Text style={styles.tableText}>2 a 11 meses/&lt;=10kg - 1 - 1/2 - 2,5 ml</Text>
          <Text style={styles.tableText}>1 a 4 anos/10 a 19 kg - 1 - 1/2 - 5,0 ml</Text>
          <Text style={styles.tableText}>
            Quando não dispor de broncodilatador (B2) por via inalatória, usar Adrenalina
            sub-cutânea, solução 1:10000, em dose única de 0.01 ml/kg.
          </Text>
        </View>

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
    marginTop: 20,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 5,
  },
  tableText: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
