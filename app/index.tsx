// app/index.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const Index = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando tempo de exibição da splash screen antes do redirecionamento
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.replace('/auth/'); // Redireciona para a tela de Login após a splash
    }, 3000); // Exibe a splash por 3 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Image source={require('../assets/splash.png')} style={styles.splashImage} />
          <ActivityIndicator size="large" color="#4A90E2" style={styles.loadingIndicator} />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2', // Cor de fundo combinando com a splash screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 200, // Ajuste conforme o tamanho desejado da imagem
    height: 200,
    resizeMode: 'contain', // Contém a imagem, mantendo a proporção
  },
  loadingIndicator: {
    marginTop: 20, // Espaço entre a imagem e o indicador de carregamento
  },
});

export default Index;
