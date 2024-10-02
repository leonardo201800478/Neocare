// screens/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo à Tela Inicial</Text>

      {/* Navegando para a Tela AIDPI Neonatal */}
      <Button title="Ir para AIDPI Neonatal" onPress={() => router.push('/screens/aidpiNeonatal/')} />

      {/* Outros Botões podem ser adicionados aqui para outras seções */}
    </View>
  );
}
