import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#388E3C', // Verde escuro para o cabeçalho
        },
        headerTintColor: '#fff', // Cor do texto do cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: 'Analgésico para Febre Alta',
      }}
    />
  );
}
