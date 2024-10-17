// app/(tabs)/patients/PacienteDetails.tsx

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import styles from './styles/PacienteStyles';
import LoadingOverlay from '../../../components/LoadingOverlay';
import { useSystem } from '../../../powersync/PowerSync';
import { useAllergies } from '../../context/AllergiesContext';
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';

const PacienteDetails = () => {
  const router = useRouter();
  const { supabaseConnector } = useSystem();
  const { selectedPatient } = usePatient();
  const { selectedDoctor, setSelectedDoctor } = useDoctor();
  const { fetchAllergiesByPatient } = useAllergies();

  const [loading, setLoading] = useState(true);
  const [lastAttendance, setLastAttendance] = useState<any>(null);
  const [lastVaccination, setLastVaccination] = useState<any>(null);
  const [allergies, setAllergies] = useState<any>(null);

  useEffect(() => {
    if (selectedPatient) {
      fetchDetails(selectedPatient.id);
      fetchDoctorIfNeeded();
      loadAllergies(selectedPatient.id);
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
      router.replace('/(tabs)/home/');
      setLoading(false);
    }
  }, [selectedPatient]);

  const fetchDetails = async (patientId: string) => {
    setLoading(true);
    try {
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

  const loadAllergies = async (patientId: string) => {
    setLoading(true);
    try {
      const patientAllergies = await fetchAllergiesByPatient(patientId);
      if (patientAllergies && patientAllergies.length > 0) {
        setAllergies(patientAllergies[0]);
      } else {
        setAllergies([]);
      }
    } catch (error) {
      console.error('Erro ao buscar alergias:', error);
      Alert.alert('Erro', 'Erro ao carregar alergias do paciente.');
    } finally {
      setLoading(false);
    }
  };

  const renderAllergyItem = (label: string, value: string) => {
    return value === 'yes' ? <Text style={styles.allergyItem}>{label}</Text> : null;
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
        pathname: '/attendences/RegisterAttendanceStep1',
        params: { patientId: selectedPatient.id },
      });
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
    }
  };

  const handleViewAttendance = () => {
    if (selectedPatient) {
      router.push({
        pathname: '/attendences/',
        params: { patientId: selectedPatient.id },
      });
    } else {
      Alert.alert('Erro', 'Paciente não encontrado.');
    }
  };

  // cálculo da idade em dd/mm/aaaa;
  const calculateAge = (birthDateStr: string) => {
    const today = new Date();
    const birthDate = new Date(birthDateStr);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += lastDayOfPrevMonth;
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }
    const formattedAge = `${years} ano(s), ${months} mês(es) e ${days} dia(s)`;
    return formattedAge;
  };

  const handleViewMedicamentsCard = () => {
    if (selectedPatient) {
      router.push({
        pathname: '/medications/', // Caminho da tela de teste
        params: { patientId: selectedPatient.id }, // Passando o patientId como parâmetro
      });
    } else {
      Alert.alert('Erro', 'Dados insuficientes para registrar uma vacinação.');
    }
  };

  const handleRegisterVaccination = () => {
    if (selectedPatient) {
      router.push({
        pathname: '/vaccines/',
        params: { patientId: selectedPatient.id },
      });
    } else {
      Alert.alert('Erro', 'Dados insuficientes para registrar uma vacinação.');
    }
  };

  const handleViewVaccinationCard = () => {
    if (selectedPatient) {
      router.push({
        pathname: '/vaccines/CardVaccination',
        params: { patientId: selectedPatient.id },
      });
    } else {
      Alert.alert('Erro', 'Dados insuficientes para visualizar o cartão de vacinação.');
    }
  };

  const handleViewAllergiesCard = () => {
    if (selectedPatient) {
      router.push({
        pathname: '/allergies/AllergiesDetails',
        params: { patientId: selectedPatient.id },
      });
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
          <MaterialCommunityIcons name="home" size={24} color="#fff" />
          <Text style={styles.buttonText}>HOME</Text>
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Detalhes do Paciente</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>Nome: {selectedPatient.name}</Text>
          <Text style={styles.detailItem}>CPF: {selectedPatient.cpf}</Text>
          <Text style={styles.detailItem}>
            Idade:{' '}
            {selectedPatient.birth_date
              ? calculateAge(selectedPatient.birth_date)
              : 'Não disponível'}
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
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Última Consulta</Text>
                <Text style={styles.detailItem}>
                  Data da última consulta:{' '}
                  {lastAttendance
                    ? new Date(lastAttendance.created_at).toLocaleDateString()
                    : 'Não disponível'}
                </Text>
                <Text style={styles.detailItem}>
                  Médico responsável: {selectedDoctor?.name || 'Não disponível'}
                </Text>
              </View>
            </>
          )}

          {/* Exibe a data da última atualização */}
          {allergies?.updated_at && (
            <Text style={styles.updateText}>
              Última atualização: {format(new Date(allergies.updated_at), 'dd/MM/yyyy')}
            </Text>
          )}

          {/* Verifica se o paciente possui alergias cadastradas */}
          {allergies ? (
            <View style={styles.allergiesContainer}>
              <Text style={styles.sectionTitle}>Alergias</Text>
              {renderAllergyItem('Leite e derivados', allergies.allergy_milk)}
              {renderAllergyItem('Ovos', allergies.allergy_eggs)}
              {renderAllergyItem('Carne bovina', allergies.allergy_beef)}
              {renderAllergyItem('Peixe', allergies.allergy_fish)}
              {renderAllergyItem('Crustáceos', allergies.allergy_shellfish)}
              {renderAllergyItem('Gato', allergies.allergy_cat)}
              {renderAllergyItem('Cachorro', allergies.allergy_dog)}
              {renderAllergyItem('Abelha', allergies.allergy_bee)}
              {renderAllergyItem('Formiga', allergies.allergy_ant)}
              {renderAllergyItem('Animais peçonhentos', allergies.allergy_venomous_animals)}
              {renderAllergyItem('Insetos', allergies.allergy_insects)}
              {renderAllergyItem('Dipirona', allergies.allergy_dipyrone)}
              {renderAllergyItem('Aspirina', allergies.allergy_aspirin)}
              {renderAllergyItem('Diclofenaco', allergies.allergy_diclofenac)}
              {renderAllergyItem('Paracetamol', allergies.allergy_paracetamol)}
              {renderAllergyItem('Penicilina', allergies.allergy_penicillin)}
              {renderAllergyItem('Magnésio bisulfato', allergies.allergy_magnesium_bisulphate)}
              {renderAllergyItem('Rivaroxabana', allergies.allergy_rivaroxaban)}
              {renderAllergyItem('Losartana', allergies.allergy_losartan_potassium)}
              {renderAllergyItem('Metformina', allergies.allergy_metformin)}
              {renderAllergyItem(
                'Butilbrometo de escopolamina',
                allergies.allergy_butylscopolamine
              )}
              {renderAllergyItem('Cefalosporina', allergies.allergy_cephalosporin)}
              {renderAllergyItem('Salbutamol', allergies.allergy_salbutamol)}
              {renderAllergyItem('Ácido fólico', allergies.allergy_acido_folico)}
              {renderAllergyItem('Isotretinoína', allergies.allergy_isotretinoina)}
            </View>
          ) : (
            <Text style={styles.noAllergiesText}>
              Nenhuma alergia cadastrada para este paciente.
            </Text>
          )}

          {/* Exibir dados da última vacinação */}
          {lastVaccination && (
            <>
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Última Vacina</Text>
                <Text style={styles.detailItem}>
                  Data da última vacinação:{' '}
                  {lastVaccination
                    ? new Date(lastVaccination.administered_at).toLocaleDateString()
                    : 'Não disponível'}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Botões para Atendimentos e Vacinações */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleCreateAttendance}>
            <MaterialCommunityIcons name="stethoscope" size={24} color="#fff" />
            <Text style={styles.buttonText}>CADASTRAR PRONTUÁRIO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleViewAttendance}>
            <MaterialCommunityIcons name="stethoscope" size={24} color="#fff" />
            <Text style={styles.buttonText}>PRONTUÁRIO</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonTertiary]}
            onPress={handleRegisterVaccination}>
            <MaterialCommunityIcons name="needle" size={24} color="#fff" />
            <Text style={styles.buttonText}>REGISTRAR VACINA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonTertiary]}
            onPress={handleViewVaccinationCard}>
            <MaterialCommunityIcons name="card-account-details" size={24} color="#fff" />
            <Text style={styles.buttonText}>CARTÃO DE VACINAS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonTertiary]}
            onPress={handleViewAllergiesCard}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#fff" />
            <Text style={styles.buttonText}>ALERGIAS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleViewMedicamentsCard}>
            <MaterialCommunityIcons name="pill" size={24} color="#fff" />
            <Text style={styles.buttonText}>MEDICAMENTOS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerFinal}>
          <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={handleDelete}>
            <MaterialCommunityIcons name="delete-forever" size={24} color="#fff" />
            <Text style={styles.buttonText}>DELETAR PACIENTE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PacienteDetails;
