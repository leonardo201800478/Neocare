import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles/MedicamentosStyles';

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medicamentos</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/medications/MedicamentosPaciente')}>
        <Text style={styles.buttonText}>Ver Medicamentos do Paciente</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/medications/CalculadoraMedicamentos')}>
        <Text style={styles.buttonText}>Calculadora de Medicamentos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
