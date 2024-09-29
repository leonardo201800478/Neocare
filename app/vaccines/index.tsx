// app/vaccines/index.tsx
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import { useSystem } from '../../powersync/PowerSync';

const VaccineSchedule = [
  {
    ageGroup: '0 a 2 meses',
    vaccines: ['BCG', 'Hepatite B (Dose 1)', 'Pentavalente (Dose 1)', 'VIP (Dose 1)'],
  },
  {
    ageGroup: '3 meses a 5 anos',
    vaccines: ['Rotavírus', 'Pneumocócica (Dose 1)', 'Pentavalente (Dose 2)', 'VOP (Dose 2)'],
  },
  // Continue a lista seguindo as recomendações do Ministério da Saúde e AIDPI NEONATAL
];

const VaccinesIndex = () => {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();
  const { supabaseConnector } = useSystem();
  const [loading, setLoading] = useState(true);
  interface AdministeredVaccine {
    vaccine_name: string;
    dose_number: number;
    administered_at: string;
    patient_id: string;
  }

  const [administeredVaccines, setAdministeredVaccines] = useState<AdministeredVaccine[]>([]);

  useEffect(() => {
    if (!patientId) {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
      router.replace('/home/');
      return;
    }
    loadVaccinations(patientId as string);
  }, [patientId]);

  const loadVaccinations = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('vaccinations')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        throw error;
      }
      setAdministeredVaccines(data);
    } catch (error) {
      console.error('Erro ao buscar dados de vacinas:', error);
      Alert.alert('Erro', 'Erro ao carregar informações de vacinas.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkVaccine = async (vaccineName: string, doseNumber: number) => {
    setLoading(true);
    try {
      const newVaccineRecord = {
        patient_id: patientId,
        vaccine_name: vaccineName,
        dose_number: doseNumber,
        administered_at: new Date().toISOString(),
      };

      const { error } = await supabaseConnector.client
        .from('vaccinations')
        .insert(newVaccineRecord);

      if (error) {
        throw error;
      }

      Alert.alert('Sucesso', `Vacina ${vaccineName} (Dose ${doseNumber}) registrada com sucesso!`);
      loadVaccinations(patientId as string);
    } catch (error) {
      console.error('Erro ao registrar vacina:', error);
      Alert.alert('Erro', 'Erro ao registrar a vacina.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay message="Carregando vacinas..." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {VaccineSchedule.map((group, index) => (
        <View key={index} style={styles.vaccineGroup}>
          <Text style={styles.groupTitle}>{group.ageGroup}</Text>
          {group.vaccines.map((vaccine, idx) => {
            const dosesTaken = administeredVaccines.filter(
              (v) => v.vaccine_name === vaccine
            ).length;
            return (
              <View key={idx} style={styles.vaccineItem}>
                <Text style={styles.vaccineName}>
                  {vaccine} - Dose {dosesTaken + 1}
                </Text>
                <TouchableOpacity
                  style={styles.markButton}
                  onPress={() => handleMarkVaccine(vaccine, dosesTaken + 1)}>
                  <Text style={styles.buttonText}>Marcar como tomada</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  vaccineGroup: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
  },
  groupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A700FF',
    marginBottom: 10,
  },
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#363636',
    borderRadius: 8,
  },
  vaccineName: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  markButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default VaccinesIndex;
