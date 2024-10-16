import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type MedicationResultProps = {
  result: {
    dosage: string;
    alertas: string[];
  };
};

const MedicationResult: React.FC<MedicationResultProps> = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado da Calculadora</Text>

      {/* Exibindo a dosagem calculada */}
      <Text style={styles.label}>Dosagem Recomendada:</Text>
      <Text style={styles.value}>{result.dosage}</Text>

      {/* Exibindo os alertas de contraindicações */}
      {result.alertas.length > 0 && (
        <>
          <Text style={styles.label}>Alertas de Contraindicação:</Text>
          {result.alertas.map((alerta, index) => (
            <Text key={index} style={styles.alert}>
              - {alerta}
            </Text>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  alert: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});

export default MedicationResult;
