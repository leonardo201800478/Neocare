import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function GraficosMeninos0a2() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gráfico Meninos 0 a 2 Meses</Text>
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          <Image source={require('~/assets/imagens/graficos/menino0-2.jpg')} style={styles.image} />
          <Image
            source={require('~/assets/imagens/graficos/menino0-2_2.jpg')}
            style={styles.image}
          />
          <Image
            source={require('~/assets/imagens/graficos/menino0-2_3.jpg')}
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
