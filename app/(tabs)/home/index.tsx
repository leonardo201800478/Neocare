// app/(tabs)/home/index.tsx

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const HomeIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a tela HomeScreen
    router.replace('/(tabs)/home/HomeScreen');
  }, [router]);

  return null; // Nenhum conteúdo é renderizado, apenas o redirecionamento é feito
};

export default HomeIndex;