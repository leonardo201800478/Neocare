// app/(tabs)/home/HomeScreen.tsx

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { sql } from 'kysely';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
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
    } else {
      setPatients([]); // Limpa a lista caso não esteja mostrando todos ou buscando
    }
  }, [searchQuery, showAllPatients]);

  const loadPatients = async () => {
    setLoading(true);
    try {
      let fetchedPatients: Patient[] = [];

      if (showAllPatients) {
        // Carrega todos os pacientes do Supabase
        const { data: remotePatients, error } = await supabaseConnector.client
          .from('patients')
          .select('*');

        if (error) {
          console.error('Erro ao carregar pacientes do Supabase:', error);
        } else {
          fetchedPatients = remotePatients ?? [];
        }
      } else if (searchQuery.length >= 3) {
        // Busca pacientes com nome ou CPF que contenham os caracteres digitados
        const lowerCaseQuery = searchQuery.toLowerCase();

        // Busca no banco de dados local usando Kysely
        const localPatients = await db
          .selectFrom(PATIENTS_TABLE)
          .selectAll()
          .where((eb) =>
            eb.or([
              eb('name', 'like', `%${lowerCaseQuery}%`),
              eb('cpf', 'like', `%${lowerCaseQuery}%`),
            ])
          )
          .execute();

        // Busca no Supabase
        const { data: remotePatients, error } = await supabaseConnector.client
          .from('patients')
          .select('*')
          .or(`name.ilike.%${lowerCaseQuery}%,cpf.ilike.%${lowerCaseQuery}%`);

        if (error) {
          console.error('Erro ao buscar pacientes do Supabase:', error);
        } else {
          fetchedPatients = [...localPatients, ...(remotePatients ?? [])];
        }
      }

      setPatients(fetchedPatients);
    } catch (error) {
      console.error('Erro ao carregar os pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientPress = (patient: Patient) => {
    setSelectedPatient(patient);
    router.push('/(tabs)/patients/PacienteDetails');
  };

  const renderRow = ({ item }: { item: Patient }) => (
    <TouchableOpacity onPress={() => handlePatientPress(item)}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.columnText}>{item.name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.columnText}>{item.cpf}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>NEOCARE</Text>
          <View style={styles.searchContainer}>
            {/* O ícone de pesquisa dentro do campo de texto */}
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

          {/* Botão para ir para a tela de termo de aceite */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007BFF' }]}
            onPress={() => router.push('/terms/')}>
            <Text style={styles.buttonText}>Termo de Aceite</Text>
          </TouchableOpacity>

          {/* Indicador de carregamento durante a busca */}
          {loading && <ActivityIndicator size="large" color="#005F9E" />}

          {/* Lista de pacientes filtrados */}
          {!loading && patients.length > 0 && (
            <FlatList
              data={patients}
              renderItem={renderRow}
              keyExtractor={(item) => item.cpf ?? item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}

          {/* Mensagem quando não há pacientes encontrados */}
          {!loading && patients.length === 0 && searchQuery.length >= 3 && (
            <Text style={styles.noResultsText}>Nenhum paciente encontrado.</Text>
          )}
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default HomeScreen;
