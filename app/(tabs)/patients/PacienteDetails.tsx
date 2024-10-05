// app/(tabs)/patients/PacienteDetails.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import LoadingOverlay from '../../../components/LoadingOverlay';
import { Attendance, Vaccination } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import styles from '../../styles/PacienteDetailsStyles';
import { usePatient } from '../../context/PatientContext';
import { useDoctor } from '../../context/DoctorContext';

const PacienteDetails = () => {
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [hasVaccinations, setHasVaccinations] = useState<boolean>(false);

  // Obtendo o paciente e o médico do contexto
  const { selectedPatient } = usePatient();
  const { doctorId } = useDoctor();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!selectedPatient) {
        Alert.alert('Erro', 'Paciente não encontrado.');
        router.replace('/(tabs)/home/');
        setLoading(false);
        return;
      }
      await checkAttendance(selectedPatient.id);
      await checkVaccinations(selectedPatient.id);
    };

    fetchPatientDetails().catch((error) => {
      console.error('Erro ao buscar detalhes do paciente:', error);
      setLoading(false);
    });
  }, [selectedPatient]);

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
    if (selectedPatient?.id) {
      if (attendance) {
        // Se já existe um prontuário, redirecionar para a atualização do prontuário
        router.push(
          `/attendences/UpdateAttendance?patientId=${selectedPatient.id}&attendanceId=${attendance.id}` as unknown as `${string}:${string}`
        );
      } else {
        // Se não existe um prontuário, redirecionar para o registro de um novo prontuário
        router.push(
          `/attendences/RegisterAttendance?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
        );
      }
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
  };

  const handleRegisterVaccination = () => {
    if (selectedPatient?.id) {
      router.push(
        `/vaccines/RegisterVaccination?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
  };

  const handleViewVaccinationCard = () => {
    if (selectedPatient?.id) {
      router.push(`/vaccines/?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`);
    } else {
      Alert.alert('Erro', 'ID do paciente não encontrado.');
    }
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
              if (selectedPatient) {
                await supabaseConnector.client
                  .from('attendances')
                  .delete()
                  .eq('patient_id', selectedPatient.id);
                await supabaseConnector.client
                  .from('vaccinations')
                  .delete()
                  .eq('patient_id', selectedPatient.id);
                const { error: deletePatientError } = await supabaseConnector.client
                  .from('patients')
                  .delete()
                  .eq('cpf', selectedPatient.cpf);

                if (deletePatientError) {
                  console.error('Erro ao excluir paciente do Supabase:', deletePatientError);
                  Alert.alert('Erro', 'Erro ao excluir o paciente do Supabase.');
                } else {
                  await db.deleteFrom('patients').where('cpf', '=', selectedPatient.cpf).execute();
                  Alert.alert('Sucesso', 'Paciente e prontuários excluídos com sucesso.');
                  router.replace('/(tabs)/home/');
                }
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
          <Text style={styles.detailItem}>Nome: {selectedPatient?.name}</Text>
          {/* ... other patient details ... */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePaciente}>
            <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonConsulta} onPress={handleOpenConsulta}>
            <Text style={styles.buttonText}>ABRIR CONSULTA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonConsulta}
            onPress={handleOpenConsulta}
            disabled={!attendance}>
            <Text style={styles.buttonText}>NOVA CONSULTA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonVaccine} onPress={handleRegisterVaccination}>
            <Text style={styles.buttonText}>REGISTRAR VACINA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonVaccine} onPress={handleViewVaccinationCard}>
            <Text style={styles.buttonText}>CADERNETA DE VACINAÇÃO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PacienteDetails;
