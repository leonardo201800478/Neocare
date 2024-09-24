import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import styles from '../styles/HomeScreenStyles';

import { PATIENTS_TABLE, Database } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Database[typeof PATIENTS_TABLE][]>([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [noResults, setNoResults] = useState(false); // No results state
  const { db } = useSystem();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    const result = await db.selectFrom(PATIENTS_TABLE).selectAll().execute();
    setPatients(result);
    setLoading(false);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.nome_patients?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (patient.cpf_patients?.toString().includes(searchQuery) ?? false)
  );

  useEffect(() => {
    setNoResults(filteredPatients.length === 0 && searchQuery.length > 0); // Show "No results" message when search returns no results
  }, [filteredPatients]);

  // app/HomeScreen.tsx
// app/HomeScreen.tsx
const renderRow = ({ item }: { item: Database[typeof PATIENTS_TABLE] }) => (
  <TouchableOpacity
    onPress={() => {
      if (item.cpf_patients) {
        // Usando o formato correto de rota dinâmica
        router.push(`/patient/${item.cpf_patients}`);
      } else {
        Alert.alert('Erro', 'CPF do paciente não encontrado.');
      }
    }}>

      
    <View style={styles.row}>
      <Text style={{ flex: 1 }}>{item.nome_patients}</Text>
      <Text style={{ flex: 1 }}>{item.cpf_patients}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>NEOCARE</Text>
        <TextInput
          placeholder="Pesquisar por nome ou CPF"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Botão para iniciar pesquisa de pacientes */}
        <TouchableOpacity style={styles.button} onPress={loadPatients}>
          <Text style={styles.buttonText}>Iniciar Pesquisa de Paciente</Text>
        </TouchableOpacity>

        {/* Botão para ir para a tela de cadastro de paciente */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/patient/CadastroPaciente')}>
          <Text style={styles.buttonText}>Cadastrar Novo Paciente</Text>
        </TouchableOpacity>

        {/* Mostra um indicador de loading durante a pesquisa */}
        {loading && <ActivityIndicator size="large" color="#005F9E" />}

        {/* Mensagem de "Paciente não encontrado" */}
        {noResults && <Text style={styles.noResultsText}>Paciente não encontrado.</Text>}

        {/* Lista de pacientes filtrados */}
        {!loading && !noResults && filteredPatients.length > 0 && (
          <FlatList
            data={filteredPatients}
            renderItem={renderRow}
            keyExtractor={(item) => item.cpf_patients?.toString() ?? item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
