//APP/PATIENTS/INDEX.TSX

import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const PatientIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulando carregamento antes de redirecionar para a tela de cadastro de pacientes
    setTimeout(() => {
      router.replace('/(tabs)/patients/CadastroPaciente'); // Redireciona para a tela CadastroPaciente
    }, 20); // Simulação de atraso de 2 segundos
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Carregando...</Text>
    </View>
  );
};

export default PatientIndex;
