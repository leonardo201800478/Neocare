// app/home/HomeScreen.tsx

import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PATIENTS_TABLE, Patient } from '../../../powersync/AppSchema';
import { useSystem } from '../../../powersync/PowerSync';
import styles from '../../styles/HomeScreenStyles';

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { db, supabaseConnector } = useSystem();
  const router = useRouter();

  useEffect(() => {
    loadPatients();
  }, []);

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

  const filteredPatients =
    searchQuery.length >= 3
      ? patients.filter(
          (patient: Patient) =>
            (patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
            (patient.cpf?.includes(searchQuery) ?? false)
        )
      : [];

  const renderRow = ({ item }: { item: Patient }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/(tabs)/patients/PacienteDetails',
          params: { patient: encodeURIComponent(JSON.stringify(item)) },
        });
      }}>
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
        <TextInput
          placeholder="Pesquisar por nome ou CPF"
          style={styles.input}
          value={searchQuery}
          onChangeText={(query) => {
            setSearchQuery(query);
          }}
        />

        {/* Botão para ir para a tela de cadastro de paciente */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/(tabs)/patients/')}>
          <Text style={styles.buttonText}>Cadastrar Novo Paciente</Text>
        </TouchableOpacity>

        {/* Botão para ir para a tela de Perfil */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/(tabs)/doctors/')}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>

        {/* Botão para ir para a tela de AIDPI */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/(tabs)/screens/')}>
          <Text style={styles.buttonText}>AIDPI</Text>
        </TouchableOpacity>

        {/* Botão para ir para a tela de Atualização de Perfil */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/(tabs)/doctors/update')}>
          <Text style={styles.buttonText}>Atualizar Perfil</Text>
        </TouchableOpacity>

        {/* Botão para ir para a tela de registro de médicos */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={() => router.push('/(tabs)/doctors/register')}>
          <Text style={styles.buttonText}>Cadastrar Médico</Text>
        </TouchableOpacity>

        {/* Mostra um indicador de loading durante a pesquisa */}
        {loading && <ActivityIndicator size="large" color="#005F9E" />}

        {/* Lista de pacientes filtrados */}
        {!loading && filteredPatients.length > 0 && (
          <FlatList
            data={filteredPatients}
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
