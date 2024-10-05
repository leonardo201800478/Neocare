// app/doctors/update.tsx

import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';

const UpdateDoctorProfile: React.FC = () => {
  const { supabaseConnector } = useSystem();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [newName, setNewName] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = async () => {
    try {
      const { userID, client } = await supabaseConnector.fetchCredentials();

      if (!userID) {
        throw new Error('Usuário não autenticado ou credenciais inválidas.');
      }

      // Buscar os dados do médico no Supabase utilizando o userID
      const { data, error } = await client.from('doctors').select('*').eq('id', userID).single();

      if (error) {
        throw new Error(`Erro ao buscar dados do médico: ${error.message}`);
      }

      if (data) {
        setDoctor(data);
        setNewName(data.name ?? ''); // Inicializa o campo com o nome atual
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do médico:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do médico.');
    }
  };

  const handleUpdate = async () => {
    if (!newName.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }

    try {
      const { userID, client } = await supabaseConnector.fetchCredentials();

      if (!userID) {
        throw new Error('Usuário não autenticado ou credenciais inválidas.');
      }

      // Atualizar o nome do médico no Supabase
      const { error } = await client.from('doctors').update({ name: newName }).eq('id', userID);

      if (error) {
        throw new Error(`Erro ao atualizar os dados do médico: ${error.message}`);
      }

      Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
      router.push('/(tabs)/doctors/'); // Volta para a página principal de perfil do médico
    } catch (error) {
      console.error('Erro ao atualizar os dados do médico:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados do médico.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atualizar Dados do Médico</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo Nome"
        value={newName}
        onChangeText={setNewName}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/doctors/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: '#A700FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UpdateDoctorProfile;
