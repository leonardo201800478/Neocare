// app/(tabs)/home/HomeScreen.tsx

import { Ionicons } from '@expo/vector-icons'; // Importando o ícone de pesquisa
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PATIENTS_TABLE, Patient } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import { usePatient } from '../../context/PatientContext';
import styles from '../../styles/HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAllPatients, setShowAllPatients] = useState<boolean>(false);
  const { db, supabaseConnector } = useSystem();
  const router = useRouter();
  const { setSelectedPatient } = usePatient();

  useEffect(() => {
    if (showAllPatients || searchQuery.length >= 3) {
      loadPatients();
    }
  }, [searchQuery, showAllPatients]);

  const loadPatients = async () => {
    setLoading(true);
    try {
      // Carrega pacientes do banco de dados local
      const localPatients = await db.selectFrom(PATIENTS_TABLE).selectAll().execute();

      // Carrega pacientes do Supabase
      const { data: remotePatients, error } = await supabaseConnector.client
        .from('patients')
        .select('*');

      if (error) {
        console.error('Erro ao carregar pacientes do Supabase:', error);
      }

      // Combina os resultados do banco de dados local e do Supabase
      const allPatients = [...localPatients, ...(remotePatients ?? [])];

      // Remove duplicatas (considerando o campo "cpf" como identificador único)
      const uniquePatients = allPatients.reduce((acc, current) => {
        if (!acc.find((patient: Patient) => patient.cpf === current.cpf)) {
          acc.push(current);
        }
        return acc;
      }, [] as Patient[]);

      setPatients(uniquePatients);
    } catch (error) {
      console.error('Erro ao carregar os pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientPress = (patient: Patient) => {
    // Armazena o paciente selecionado no contexto e redireciona para a tela de detalhes do paciente
    setSelectedPatient(patient);
    router.push('/(tabs)/patients/PacienteDetails');
  };

  const renderRow = ({ item }: { item: Patient }) => (
    <TouchableOpacity onPress={() => handlePatientPress(item)}>
      <View style={styles.row}>
        <Text style={{ flex: 1 }}>{item.name}</Text>
        <Text style={{ flex: 1 }}>{item.cpf}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>NEOCARE</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquisar por nome ou CPF"
            style={[styles.input, styles.searchInput]}
            value={searchQuery}
            onChangeText={(query) => {
              setSearchQuery(query);
              setShowAllPatients(false); // Reseta a flag ao buscar um termo específico
            }}
          />
        </View>

        {/* Botão para listar todos os pacientes */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#28A745', marginVertical: 10 }]}
          onPress={() => {
            setShowAllPatients(true);
            setSearchQuery(''); // Reseta a consulta de pesquisa
          }}>
          <Text style={styles.buttonText}>Listar Todos os Pacientes</Text>
        </TouchableOpacity>

        {/* Botão para ir para a tela de cadastro de paciente */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/(tabs)/patients/')}>
          <Text style={styles.buttonText}>Cadastrar Novo Paciente</Text>
        </TouchableOpacity>

        {/* Mostra um indicador de loading durante a pesquisa */}
        {loading && <ActivityIndicator size="large" color="#005F9E" />}

        {/* Lista de pacientes filtrados */}
        {!loading && (showAllPatients || searchQuery.length >= 3) && (
          <FlatList
            data={patients}
            renderItem={renderRow}
            keyExtractor={(item) => item.cpf ?? item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
