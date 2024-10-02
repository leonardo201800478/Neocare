import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function AIDPINeonatal() {
  const router = useRouter();

  const data = [
    {
      key: '1',
      title: 'Aliemntação',
      route: '/screens/alimentacao/',
    },
    {
      key: '2',
      title: 'Cuidados',
      route: '/screens/cuidados/',
    },
    {
      key: '3',
      title: 'Gráficos',
      route: '/screens/graficos/',
    },
    {
      key: '4',
      title: 'Medicamentos',
      route: '/screens/medicamentos/',
    },
    {
      key: '5',
      title: 'Planos',
      route: '/screens/planos/',
    },
    {
      key: '6',
      title: 'Procedimentos',
      route: '/screens/procedimentos/',
    },
    {
      key: '7',
      title: 'Tabelas',
      route: '/screens/tabelas/',
    },
    {
      key: '7',
      title: 'Vacinação',
      route: '/screens/vacinacao/',
    },
    {
      key: '7',
      title: 'Vitaminas',
      route: '/screens/vitaminas/',
    },
    // Adicione mais itens conforme necessário
  ];

  const renderButton = ({ item }: { item: { key: string; title: string; route: string } }) => (
    <TouchableOpacity style={styles.button} onPress={() => router.push(item.route as any)}>
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AIDPI NEONATAL</Text>
      <FlatList
        data={data}
        renderItem={renderButton}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Verde claro para o fundo da tela
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20', // Verde escuro para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para os botões
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%', // Largura para espelhar visualmente os botões
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombreamento moderno
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
