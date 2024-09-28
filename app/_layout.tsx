// app/_layout.tsx
import { Session } from '@supabase/supabase-js'; // Import the Session type
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useSystem } from '../powersync/PowerSync';

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
      router.replace('/auth/'); // Redireciona para a tela de login se não houver sessão
    } else if (session && inAuthGroup) {
      router.replace('/home/'); // Redireciona para a tela Home se já estiver logado
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

export default Layout;
