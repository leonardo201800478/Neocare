// app/index.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

import { useSystem } from '../powersync/PowerSync';

const Index = () => {
  const router = useRouter();
  const { supabaseConnector } = useSystem();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificando se há sessão de usuário para redirecionar automaticamente
    const checkUserSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabaseConnector.client.auth.getSession();
        if (error) {
          console.error('Erro ao obter a sessão do usuário:', error);
        }

        if (session) {
          // Se o usuário estiver logado, redireciona para a página inicial
          router.replace('/(tabs)/home/');
        } else {
          // Se não estiver logado, redireciona para a página de login
          router.replace('/auth/');
        }
      } catch (error) {
        console.error('Erro ao verificar a sessão do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [router, supabaseConnector]);

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
