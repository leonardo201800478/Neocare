// app/(tabs)/patients/PacienteDetails.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import LoadingOverlay from '../../../components/LoadingOverlay'; // Importando o componente de loading
import { Patient, Attendance, Vaccination } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import styles from '../../styles/PacienteDetailsStyles';

const PacienteDetails = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams(); // Recebe o registro do paciente selecionado
  const parsedPatient: Patient | null = patient
    ? JSON.parse(decodeURIComponent(patient as string))
    : null;

  const { db, supabaseConnector } = useSystem();
  const [loading, setLoading] = useState(true); // Inicia como `true` para mostrar o loading inicialmente
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [vaccines, setVaccines] = useState<Vaccination[]>([]);

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
  }, []); // Removida a dependência parsedPatient para evitar ciclos de renderização.

  // Função para verificar se o paciente já tem um prontuário registrado
  const checkAttendance = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .order('updated_at', { ascending: false }) // Pega o prontuário mais recente
        .limit(1)
        .single();

      if (error) {
        console.error('Erro ao buscar prontuário:', error);
      } else {
        setAttendance(data);
      }
    } catch (error) {
      console.error('Erro ao buscar prontuário:', error);
      Alert.alert('Erro', 'Erro ao buscar prontuário do paciente.');
    } finally {
      setLoading(false); // Garante que o estado `loading` seja definido para `false` independentemente do resultado
    }
  };

  // Função para buscar as vacinas do paciente
  const checkVaccinations = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('vaccinations')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        console.error('Erro ao buscar vacinas:', error);
      } else {
        setVaccines(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error);
      Alert.alert('Erro', 'Erro ao buscar vacinas do paciente.');
    }
  };

  // Função para formatar a data no formato dd/mm/aaaa
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para formatar o número de telefone no formato (código país) (DDD) 00000-0000
  const formatPhoneNumber = (phoneNumber: string) => {
    const regex = /^(\+\d{1,3})(\d{2})(\d{4,5})(\d{4})$/;
    const match = phoneNumber.match(regex);
    if (match) {
      return `${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phoneNumber; // Retorna o número como está se o formato não corresponder
  };

  // Função para formatar o CPF no formato 000.000.000-00
  const formatCPF = (cpf: string) => {
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const match = cpf.match(regex);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cpf; // Retorna o CPF como está se o formato não corresponder
  };

  // Função para formatar o CEP no formato 00.000-000
  const formatCEP = (cep: string) => {
    const regex = /^(\d{2})(\d{3})(\d{3})$/;
    const match = cep.match(regex);
    if (match) {
      return `${match[1]}.${match[2]}-${match[3]}`;
    }
    return cep; // Retorna o CEP como está se o formato não corresponder
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
              // Deletando o prontuário do Supabase
              const { error: deleteAttendanceError } = await supabaseConnector.client
                .from('attendances')
                .delete()
                .eq('patient_id', parsedPatient!.id);

              if (deleteAttendanceError) {
                console.error('Erro ao excluir prontuário do Supabase:', deleteAttendanceError);
                Alert.alert('Erro', 'Erro ao excluir o prontuário do paciente.');
              } else {
                // Deletando as vacinas do paciente do Supabase
                const { error: deleteVaccinesError } = await supabaseConnector.client
                  .from('vaccinations')
                  .delete()
                  .eq('patient_id', parsedPatient!.id);

                if (deleteVaccinesError) {
                  console.error('Erro ao excluir vacinas do Supabase:', deleteVaccinesError);
                  Alert.alert('Erro', 'Erro ao excluir as vacinas do paciente.');
                } else {
                  // Deletando o paciente do Supabase
                  const { error: deletePatientError } = await supabaseConnector.client
                    .from('patients')
                    .delete()
                    .eq('cpf', parsedPatient!.cpf);

                  if (deletePatientError) {
                    console.error('Erro ao excluir paciente do Supabase:', deletePatientError);
                    Alert.alert('Erro', 'Erro ao excluir o paciente do Supabase.');
                  } else {
                    // Deletando o paciente do banco de dados local
                    await db.deleteFrom('patients').where('cpf', '=', parsedPatient!.cpf).execute();
                    Alert.alert('Sucesso', 'Paciente e prontuários excluídos com sucesso.');
                    router.replace('/(tabs)/home/');
                  }
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

  // Botão para registrar uma vacina
  const handleRegisterVaccination = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    router.push(
      `/vaccines/RegisterVaccination?patient=${encodedPatient}` as unknown as `${string}:${string}`
    );
  };

  // Botão para exibir a caderneta de vacinação
  const handleViewVaccinationCard = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    router.push(`/vaccines/?patient=${encodedPatient}` as unknown as `${string}:${string}`);
  };

  const handleOpenConsulta = () => {
    const encodedPatient = encodeURIComponent(JSON.stringify(parsedPatient));
    if (attendance) {
      // Se já existe um prontuário, redirecionar para a atualização do prontuário
      router.push(
        `/attendences/UpdateAttendance?patient=${encodedPatient}&attendanceId=${attendance.id}` as unknown as `${string}:${string}`
      );
    } else {
      // Se não existe um prontuário, redirecionar para o registro de um novo prontuário
      router.push(
        `/attendences/RegisterAttendance?patient=${encodedPatient}&doctorId=${parsedPatient!.created_by}` as unknown as `${string}:${string}`
      );
    }
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
          <Text style={styles.detailItem}>
            CPF: {parsedPatient?.cpf ? formatCPF(parsedPatient.cpf) : 'CPF não disponível'}
          </Text>
          <Text style={styles.detailItem}>
            Data de Nascimento:{' '}
            {parsedPatient?.birth_date
              ? formatDate(parsedPatient.birth_date)
              : 'Data não disponível'}
          </Text>
          <Text style={styles.detailItem}>Sexo: {parsedPatient?.gender}</Text>
          <Text style={styles.detailItem}>
            Telefone:{' '}
            {parsedPatient?.phone_number
              ? formatPhoneNumber(parsedPatient.phone_number)
              : 'Telefone não disponível'}
          </Text>
          <Text style={styles.detailItem}>
            CEP:{' '}
            {parsedPatient?.zip_code ? formatCEP(parsedPatient.zip_code) : 'CEP não disponível'}
          </Text>
          <Text style={styles.detailItem}>UF: {parsedPatient?.uf}</Text>
          <Text style={styles.detailItem}>Cidade: {parsedPatient?.city}</Text>
          <Text style={styles.detailItem}>Endereço: {parsedPatient?.address}</Text>
          {attendance && (
            <>
              <View style={styles.vaccinesContainer}>
                <Text style={styles.detailItem}>
                  Data da Última Consulta:{' '}
                  {attendance.updated_at
                    ? formatDate(attendance.updated_at)
                    : 'Data não disponível'}
                </Text>
                <Text style={styles.detailItem}>
                  Médico da Última Consulta: {attendance.doctor_name ?? 'Nome não disponível'}
                </Text>
              </View>
            </>
          )}
          {vaccines.length > 0 && (
            <View style={styles.vaccinesContainer}>
              <Text style={styles.subHeader}>Vacinas:</Text>
              {vaccines.map((vaccine) => (
                <Text key={vaccine.id} style={styles.detailItem}>
                  {vaccine.vaccine_name} - Dose {vaccine.dose_number} - Aplicada em:{' '}
                  {vaccine.administered_at
                    ? formatDate(vaccine.administered_at)
                    : 'Data não disponível'}
                </Text>
              ))}
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePaciente}>
            <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonConsulta} onPress={handleOpenConsulta}>
            <Text style={styles.buttonText}>{attendance ? 'NOVA CONSULTA' : 'ABRIR CONSULTA'}</Text>
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
