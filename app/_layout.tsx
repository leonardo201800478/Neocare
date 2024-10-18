import { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AllergiesProvider } from './context/AllergiesContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { NutritionProvider } from './context/AttendanceNutritionContext';
import { AttendanceSymptomProvider } from './context/AttendanceSymptomContext';
import { AttendanceVitalProvider } from './context/AttendanceVitalContext';
import { DoctorProvider } from './context/DoctorContext';
import { MedicalRecordsProvider } from './context/MedicalRecordsContext';
import { MedicamentsProvider } from './context/MedicamentsContext';
import { PatientProvider } from './context/PatientContext';
import { VaccinationProvider } from './context/VaccinationContext';
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
      <PatientProvider>
        <AttendanceProvider>
          <AttendanceVitalProvider>
            <AttendanceSymptomProvider>
              <NutritionProvider>
                <VaccinationProvider>
                  <AllergiesProvider>
                    <MedicamentsProvider>
                      <MedicalRecordsProvider>
                        <Slot />
                      </MedicalRecordsProvider>
                    </MedicamentsProvider>
                  </AllergiesProvider>
                </VaccinationProvider>
              </NutritionProvider>
            </AttendanceSymptomProvider>
          </AttendanceVitalProvider>
        </AttendanceProvider>
      </PatientProvider>
    </DoctorProvider>
  );
};

export default Layout;
