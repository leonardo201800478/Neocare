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
<<<<<<< HEAD
      router.replace('/auth/'); // Redireciona para a tela de Login
=======
      router.replace('/auth/Login'); // Redireciona para a tela de Login
>>>>>>> 183f846fe8588ec1ea96a15ef666119c2aee64dc
    }
  }, [isMounted, router]);

  return null;
};

<<<<<<< HEAD
export default Index;
=======
export default Index;
>>>>>>> 183f846fe8588ec1ea96a15ef666119c2aee64dc
