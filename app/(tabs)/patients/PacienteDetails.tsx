// app/attendences/PacienteDetails.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import styles from './styles/PacienteStyles';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';

const PacienteDetails = () => {
  const router = useRouter();
  const { supabaseConnector } = useSystem();
  const { selectedPatient } = usePatient();
  const { selectedDoctor, setSelectedDoctor } = useDoctor();

  const [loading, setLoading] = useState(true);
  const [lastAttendance, setLastAttendance] = useState<any>(null);
  const [lastVaccination, setLastVaccination] = useState<any>(null);

  useEffect(() => {
    if (selectedPatient) {
      fetchDetails(selectedPatient.id);
      fetchDoctorIfNeeded();
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
      router.replace('/(tabs)/home/');
      setLoading(false);
    }
  }, [selectedPatient]);

  const fetchDetails = async (patientId: string) => {
    setLoading(true);
    try {
      // Buscar a última consulta do paciente
      const { data: attendanceData, error: attendanceError } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (attendanceError && attendanceError.code !== 'PGRST116') {
        console.error('Erro ao buscar prontuário:', attendanceError);
        Alert.alert('Erro', 'Erro ao buscar prontuário do paciente.');
      } else {
        setLastAttendance(attendanceData);
      }

      // Buscar a última vacinação do paciente
      const { data: vaccinationData, error: vaccinationError } = await supabaseConnector.client
        .from('vaccinations')
        .select('*')
        .eq('patient_id', patientId)
        .order('administered_at', { ascending: false })
        .limit(1)
        .single();

      if (vaccinationError && vaccinationError.code !== 'PGRST116') {
        console.error('Erro ao buscar vacinações:', vaccinationError);
        Alert.alert('Erro', 'Erro ao buscar vacinações do paciente.');
      } else {
        setLastVaccination(vaccinationData);
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes do paciente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os detalhes do paciente.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorIfNeeded = async () => {
    if (!selectedDoctor) {
      try {
        setLoading(true);
        const { data, error } = await supabaseConnector.client.from('doctors').select('*').single();

        if (error) {
          console.error('Erro ao buscar dados do médico:', error);
          Alert.alert('Erro', 'Não foi possível obter os detalhes do médico.');
        } else {
          setSelectedDoctor(data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do médico:', error);
        Alert.alert('Erro', 'Erro ao buscar os detalhes do médico.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateAttendance = () => {
    if (selectedPatient) {
      router.push({
        pathname: '/attendences/RegisterAttendance',
        params: { patientId: selectedPatient.id },
      });
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
    }
  };

  const handleViewMedicamentsCard = () => {
    if (selectedPatient) {
      router.push(
        `/medications/MedicamentosPaciente/?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'Dados insuficientes para registrar uma vacinação.');
    }
  };

  const handleRegisterVaccination = () => {
    if (selectedPatient) {
      router.push(`/vaccines/?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`);
    } else {
      Alert.alert('Erro', 'Dados insuficientes para registrar uma vacinação.');
    }
  };

  const handleViewVaccinationCard = () => {
    if (selectedPatient) {
      router.push(
        `/vaccines/CardVaccination/?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'Dados insuficientes para visualizar o cartão de vacinação.');
    }
  };

  const handleViewAllergiesCard = () => {
    if (selectedPatient) {
      router.push(
        `/allergies/AllergiesDetails/?patientId=${selectedPatient.id}` as unknown as `${string}:${string}`
      );
    } else {
      Alert.alert('Erro', 'Dados insuficientes para visualizar o cadastro de Alergias.');
    }
  };

  if (loading) {
    return <LoadingOverlay message="Carregando detalhes do paciente..." />;
  }

  if (!selectedPatient) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Paciente não encontrado.</Text>
        <TouchableOpacity style={styles.buttonHome} onPress={() => router.replace('/(tabs)/home/')}>
          <Text style={styles.buttonText}>VOLTAR PARA HOME</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = async () => {
    if (!selectedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

    Alert.alert(
      'Confirmar Deleção',
      'Tem certeza que deseja deletar este paciente e todos os dados relacionados?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            setLoading(true);

            try {
              const patientId = selectedPatient.id;

              // Deletar prontuários
              const { error: attendanceError } = await supabaseConnector.client
                .from('attendances')
                .delete()
                .eq('patient_id', patientId);
              if (attendanceError) {
                throw new Error(`Erro ao deletar prontuários: ${attendanceError.message}`);
              }

              // Deletar vacinas
              const { error: vaccinationError } = await supabaseConnector.client
                .from('vaccinations')
                .delete()
                .eq('patient_id', patientId);
              if (vaccinationError) {
                throw new Error(`Erro ao deletar vacinas: ${vaccinationError.message}`);
              }

              // Deletar alergias
              const { error: allergiesError } = await supabaseConnector.client
                .from('allergies')
                .delete()
                .eq('patient_id', patientId);
              if (allergiesError) {
                throw new Error(`Erro ao deletar alergias: ${allergiesError.message}`);
              }

              // Deletar medicamentos
              const { error: medicationsError } = await supabaseConnector.client
                .from('medications')
                .delete()
                .eq('patient_id', patientId);
              if (medicationsError) {
                throw new Error(`Erro ao deletar medicamentos: ${medicationsError.message}`);
              }

              // Deletar o próprio paciente
              const { error: patientError } = await supabaseConnector.client
                .from('patients')
                .delete()
                .eq('id', patientId);
              if (patientError) {
                throw new Error(`Erro ao deletar paciente: ${patientError.message}`);
              }

              Alert.alert('Sucesso', 'Paciente deletado com sucesso.');
              router.replace('/(tabs)/home/');
            } catch (error) {
              console.error('Erro ao deletar paciente:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao deletar o paciente.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.header}>Detalhes do Paciente</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>Nome: {selectedPatient.name}</Text>
          <Text style={styles.detailItem}>CPF: {selectedPatient.cpf}</Text>
          <Text style={styles.detailItem}>
            Data de Nascimento:{' '}
            {selectedPatient.birth_date
              ? new Date(selectedPatient.birth_date).toLocaleDateString()
              : 'Data não disponível'}
          </Text>
          <Text style={styles.detailItem}>Sexo: {selectedPatient.gender}</Text>
          <Text style={styles.detailItem}>Telefone: {selectedPatient.phone_number}</Text>
          <Text style={styles.detailItem}>CEP: {selectedPatient.zip_code}</Text>
          <Text style={styles.detailItem}>UF: {selectedPatient.uf}</Text>
          <Text style={styles.detailItem}>Cidade: {selectedPatient.city}</Text>
          <Text style={styles.detailItem}>Endereço: {selectedPatient.address}</Text>

          {/* Exibir dados da última consulta */}
          {lastAttendance && (
            <>
              <Text style={styles.sectionTitle}>Última Consulta</Text>
              <Text style={styles.detailItem}>
                Data da última consulta:{' '}
                {new Date(lastAttendance.created_at).toLocaleDateString() ?? 'Não disponível'}
              </Text>
              <Text style={styles.detailItem}>
                Médico responsável: {lastAttendance.doctor_id ?? 'Não disponível'}
              </Text>
              <Text style={styles.detailItem}>
                Alergias: {lastAttendance.allergies ?? 'Não registrado'}
              </Text>
            </>
          )}

          {/* Exibir dados da última vacinação */}
          {lastVaccination && (
            <>
              <Text style={styles.sectionTitle}>Última Vacina</Text>
              <Text style={styles.detailItem}>
                Data da última vacinação:{' '}
                {new Date(lastVaccination.administered_at).toLocaleDateString() ?? 'Não disponível'}
              </Text>
            </>
          )}
        </View>

        {/* Botões para Atendimentos e Vacinações */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonConsulta} onPress={handleCreateAttendance}>
            <Text style={styles.buttonText}>CRIAR ATENDIMENTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonVaccine} onPress={handleRegisterVaccination}>
            <Text style={styles.buttonText}>REGISTRAR VACINAÇÃO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonVaccine} onPress={handleViewVaccinationCard}>
            <Text style={styles.buttonText}>VER CARTÃO DE VACINAS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonAllergy} onPress={handleViewAllergiesCard}>
            <Text style={styles.buttonText}>Alergias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMedicament} onPress={handleViewMedicamentsCard}>
            <Text style={styles.buttonText}>Medicamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
            <Text style={styles.buttonText}>Deletar Paciente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PacienteDetails;
