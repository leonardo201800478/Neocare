// app/medications/index.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles/MedicamentosStyles';

const Index = ({ patientId }: { patientId: string }) => {
  // Garanta que o patientId está sendo recebido como prop
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medicamentos</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({ pathname: '/medications/MedicamentosPaciente', params: { patientId } })
        }>
        <Text style={styles.buttonText}>Ver Medicamentos do Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({ pathname: '/medications/CalculadoraMedicamentos', params: { patientId } })
        }>
        <Text style={styles.buttonText}>Calculadora de Medicamentos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
