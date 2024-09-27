// app/_layout.tsx
import { Session } from '@supabase/supabase-js'; // Import the Session type
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

<<<<<<< HEAD
import { useSystem } from '../powersync/PowerSync';
=======
import { useSystem } from '~/powersync/PowerSync';
>>>>>>> 183f846fe8588ec1ea96a15ef666119c2aee64dc

const Layout = () => {
  const [session, setSession] = useState<Session | null>(null); // Estado para a sessão do usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const router = useRouter();
  const segments = useSegments();
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    // Verifica o estado da sessão de autenticação
    const {
      data: { subscription },
    } = supabaseConnector.client.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setLoading(false); // Finaliza o estado de carregamento quando a sessão é definida
    });

    return () => subscription?.unsubscribe();
  }, [supabaseConnector]);

  useEffect(() => {
    if (loading) return; // Garante que não haja navegação durante o carregamento

    const inAuthGroup = segments[0] === 'auth';

    if (!session && !inAuthGroup) {
<<<<<<< HEAD
      router.replace('/auth/'); // Redireciona para a tela de login se não houver sessão
    } else if (session && inAuthGroup) {
      router.replace('/home/'); // Redireciona para a tela Home se já estiver logado
=======
      router.replace('/auth/Login'); // Redireciona para a tela de login se não houver sessão
    } else if (session && inAuthGroup) {
      router.replace('/home/HomeScreen'); // Redireciona para a tela Home se já estiver logado
>>>>>>> 183f846fe8588ec1ea96a15ef666119c2aee64dc
    }
  }, [session, segments, router, loading]);

  // Exibe um indicador de carregamento enquanto o layout está inicializando
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />; // Garante que o Slot está sempre presente para renderizar as rotas
};

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> 183f846fe8588ec1ea96a15ef666119c2aee64dc
