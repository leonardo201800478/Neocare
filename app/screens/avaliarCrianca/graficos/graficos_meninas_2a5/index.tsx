import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function GraficosMeninas2a5() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gráfico Meninas 2 a 5 Anos</Text>
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          <Image source={require('~/assets/imagens/graficos/menina2-5.jpg')} style={styles.image} />
          <Image
            source={require('~/assets/imagens/graficos/menina2-5_2.jpg')}
            style={styles.image}
          />
          <Image
            source={require('~/assets/imagens/graficos/menina2-5_3.jpg')}
            style={styles.image}
          />
          <Image
            source={require('~/assets/imagens/graficos/menina2-5_4.jpg')}
            style={styles.image}
          />
        </View>
      </ScrollView>
      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  image: {
    width: 900, // Largura ajustada para permitir a rolagem horizontal
    height: 600,
    margin: 10,
    resizeMode: 'contain', // Para garantir que a imagem não seja cortada
  },
});
