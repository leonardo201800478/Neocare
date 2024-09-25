// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const Index = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace('./auth/Login'); // Redireciona para a tela de Login
    }
  }, [isMounted, router]);

  return null;
};

export default Index;
