import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { PATIENTS_TABLE, Patient } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import { usePatient } from '../../context/PatientContext';

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
    <Animatable.View animation="fadeInUp" duration={800}>
      <TouchableOpacity onPress={() => handlePatientPress(item)}>
        <View style={styles.card}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.cpf}>{item.cpf}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
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

        {loading && <ActivityIndicator size="large" color="#005F9E" />}
        {!loading && patients.length > 0 && (
          <FlatList
            data={patients}
            renderItem={renderRow}
            keyExtractor={(item) => item.cpf ?? item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
        {!loading && patients.length === 0 && searchQuery.length >= 3 && (
          <Text style={styles.noResultsText}>Nenhum paciente encontrado.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 3,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cpf: {
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  noResultsText: {
    color: '#777',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
