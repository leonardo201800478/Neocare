import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import { uuid } from '../../utils/uuid';

import { ATTENDANCES_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const CadastroProntuario = () => {
  const [loading, setLoading] = useState(false);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();

  const handleCadastro = async () => {
    setLoading(true);
    try {
      const { userID } = await supabaseConnector.fetchCredentials();
      const doctorName = 'Dr. Fulano'; // Aqui você pode definir o nome do médico autenticado

      await db
        .insertInto(ATTENDANCES_TABLE)
        .values({
          id: uuid(),
          peso,
          comprimento: altura,
          doctor_id: userID,
          doctor_name: doctorName,
          patient_id: 'algum-id-paciente', // Este ID deve vir do paciente vinculado
          created_by: userID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute();

      Alert.alert('Sucesso', 'Prontuário cadastrado com sucesso');
      router.replace('/attendences');
    } catch (error) {
      console.error('Erro ao cadastrar prontuário:', error);
      Alert.alert('Erro', 'Erro ao cadastrar prontuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingOverlay message="Cadastrando prontuário..." />}
      <Text style={styles.header}>Cadastrar Prontuário</Text>

      <TextInput
        placeholder="Peso"
        value={peso}
        onChangeText={setPeso}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Altura"
        value={altura}
        onChangeText={setAltura}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Salvar e Concluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#A700FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CadastroProntuario;
