// app/(tabs)/vaccines/index.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import LoadingOverlay from '../../../components/LoadingOverlay';
import { Vaccination, Patient } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import styles from '../../styles/VaccinationStyles';

const VaccinesIndex = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams(); // Recebe o registro do paciente selecionado
  const parsedPatient: Patient | null = patient
    ? JSON.parse(decodeURIComponent(patient as string))
    : null;

  const { supabaseConnector } = useSystem();
  const [loading, setLoading] = useState(true);
  const [vaccines, setVaccines] = useState<Vaccination[]>([]);

  useEffect(() => {
    const fetchVaccinations = async () => {
      if (!parsedPatient) {
        Alert.alert('Erro', 'Paciente não encontrado.');
        router.replace('/(tabs)/home/');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabaseConnector.client
          .from('vaccinations')
          .select('*')
          .eq('patient_id', parsedPatient.id);

        if (error) {
          console.error('Erro ao buscar vacinas:', error);
        } else {
          setVaccines(data || []);
        }
      } catch (error) {
        console.error('Erro ao buscar vacinas:', error);
        Alert.alert('Erro', 'Erro ao buscar vacinas do paciente.');
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinations().catch((error) => {
      console.error('Erro ao buscar vacinas:', error);
      setLoading(false);
    });
  }, []);

  const handleRegisterVaccination = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    router.push(
      `/vaccines/RegisterVaccination?patient=${encodedPatient}&doctorId=${parsedPatient!.created_by}` as unknown as `${string}:${string}`
    );
  };

  const handleUpdateVaccination = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    if (vaccines.length > 0) {
      router.push(
        `/vaccines/UpdateVaccine?patient=${encodedPatient}&vaccineId=${vaccines[0].id}` as unknown as `${string}:${string}`
      );
    }
  };

  if (loading) {
    return <LoadingOverlay message="Carregando vacinas..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vacinas do Paciente</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegisterVaccination}>
          <Text style={styles.buttonText}>CADASTRAR VACINAS</Text>
        </TouchableOpacity>
        {vaccines.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={handleUpdateVaccination}>
            <Text style={styles.buttonText}>ATUALIZAR VACINAS</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VaccinesIndex;
