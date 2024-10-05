// app/(tabs)/patients/PacienteDetails.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import LoadingOverlay from '../../../components/LoadingOverlay';
import { Patient, Attendance, Vaccination } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import styles from '../../styles/PacienteDetailsStyles';

const PacienteDetails = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams();
  const parsedPatient: Patient | null = patient
    ? JSON.parse(decodeURIComponent(patient as string))
    : null;

  const { db, supabaseConnector } = useSystem();
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [hasVaccinations, setHasVaccinations] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!parsedPatient) {
        Alert.alert('Erro', 'Paciente não encontrado.');
        router.replace('/(tabs)/home/');
        setLoading(false);
        return;
      }
      await checkAttendance(parsedPatient.id);
      await checkVaccinations(parsedPatient.id);
    };

    fetchPatientDetails().catch((error) => {
      console.error('Erro ao buscar detalhes do paciente:', error);
      setLoading(false);
    });
  }, []);

  const checkAttendance = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar prontuário:', error);
        Alert.alert('Erro', 'Erro ao buscar prontuário do paciente.');
      } else {
        setAttendance(data || null);
      }
    } catch (error) {
      console.error('Erro ao buscar prontuário:', error);
      Alert.alert('Erro', 'Erro ao buscar prontuário do paciente.');
    } finally {
      setLoading(false);
    }
  };

  const checkVaccinations = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('vaccinations')
        .select('*')
        .eq('patient_id', patientId);

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar vacinas:', error);
        Alert.alert('Erro', 'Erro ao buscar vacinas do paciente.');
      } else {
        setHasVaccinations(!!(data && data.length > 0));
      }
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error);
      Alert.alert('Erro', 'Erro ao buscar vacinas do paciente.');
    }
  };

  const handleOpenConsulta = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    if (parsedPatient?.id) {
      if (attendance) {
        // Se já existe um prontuário, redirecionar para a atualização do prontuário
        router.push(
          `/attendences/UpdateAttendance?patient=${encodedPatient}&attendanceId=${attendance.id}` as unknown as `${string}:${string}`
        );
      } else {
        // Se não existe um prontuário, redirecionar para o registro de um novo prontuário
        router.push(
          `/attendences/RegisterAttendance?patientId=${parsedPatient.id}` as unknown as `${string}:${string}`
        );
      }
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
  };

  const handleRegisterVaccination = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    router.push(
      `/vaccines/RegisterVaccination?patient=${encodedPatient}` as unknown as `${string}:${string}`
    );
  };

  const handleViewVaccinationCard = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    router.push(`/vaccines/?patient=${encodedPatient}` as unknown as `${string}:${string}`);
  };

  const handleDeletePaciente = async () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este paciente e todos os prontuários associados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // Deletar todos os dados relacionados
              await supabaseConnector.client
                .from('attendances')
                .delete()
                .eq('patient_id', parsedPatient!.id);
              await supabaseConnector.client
                .from('vaccinations')
                .delete()
                .eq('patient_id', parsedPatient!.id);
              const { error: deletePatientError } = await supabaseConnector.client
                .from('patients')
                .delete()
                .eq('cpf', parsedPatient!.cpf);

              if (deletePatientError) {
                console.error('Erro ao excluir paciente do Supabase:', deletePatientError);
                Alert.alert('Erro', 'Erro ao excluir o paciente do Supabase.');
              } else {
                await db.deleteFrom('patients').where('cpf', '=', parsedPatient!.cpf).execute();
                Alert.alert('Sucesso', 'Paciente e prontuários excluídos com sucesso.');
                router.replace('/(tabs)/home/');
              }
            } catch (error) {
              console.error('Erro ao excluir paciente:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao excluir o paciente.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <LoadingOverlay message="Carregando..." />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.header}>Detalhes do Paciente</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>Nome: {parsedPatient?.name}</Text>
          {/* ... other patient details ... */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePaciente}>
            <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonConsulta}
            onPress={handleOpenConsulta}
            disabled={!!attendance}
          >
            <Text style={styles.buttonText}>ABRIR CONSULTA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonConsulta}
            onPress={handleOpenConsulta}
            disabled={!attendance}
          >
            <Text style={styles.buttonText}>NOVA CONSULTA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonVaccine}
            onPress={handleRegisterVaccination}
            disabled={hasVaccinations}
          >
            <Text style={styles.buttonText}>REGISTRAR VACINA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonVaccine}
            onPress={handleViewVaccinationCard}
            disabled={!hasVaccinations}
          >
            <Text style={styles.buttonText}>CADERNETA DE VACINAÇÃO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PacienteDetails;
