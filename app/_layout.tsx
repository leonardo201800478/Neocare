// app/_layout.tsx

import { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { DoctorProvider } from './context/DoctorContext';
import { useSystem } from '../powersync/PowerSync';

const Layout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();
  const { supabaseConnector } = useSystem();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseConnector.client.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, [supabaseConnector]);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!session && !inAuthGroup) {
      router.replace('/auth/');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)/home/');
    }
  }, [session, segments, router, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <DoctorProvider>
      <Slot />
    </DoctorProvider>
  );
};

export default Layout;
