// screens/aidpi_neonatal/alimentacao/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Alimentacao() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alimentação</Text>

      {/* Botão para Aconselhar Alimentação */}
      <Button
        title="Aconselhar Alimentação"
        onPress={() => router.push('/screens/aidpiNeonatal/alimentacao/aconselharAlimentacao/')}
      />

      {/* Botão para Avaliar Alimentação */}
      <Button
        title="Avaliar Alimentação"
        onPress={() => router.push('/screens/aidpiNeonatal/alimentacao/avaliarAlimentacao/')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
