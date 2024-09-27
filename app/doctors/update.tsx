import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { DOCTORS_TABLE, Database } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const UpdateDoctorProfile: React.FC = () => {
  const { supabaseConnector } = useSystem();
  const [doctor, setDoctor] = useState<Database[typeof DOCTORS_TABLE] | null>(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = async () => {
    const { userID } = await supabaseConnector.fetchCredentials(); // Pegar o ID do usuário autenticado
    const doctorData = await db
      .selectFrom(DOCTORS_TABLE)
      .selectAll()
      .where('owner_id', '=', userID)
      .execute();

    if (doctorData.length > 0) {
      setDoctor(doctorData[0]);
      setNewName(doctorData[0].name ?? ''); // Inicializa o campo com o nome atual
    }
  };

  const handleUpdate = async () => {
    if (!newName) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }

    const { userID } = await supabaseConnector.fetchCredentials();

    await db
      .updateTable(DOCTORS_TABLE)
      .set({
        name: newName,
      })
      .where('owner_id', '=', userID)
      .execute();

    Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
    router.push('/doctors/'); // Volta para a página principal de perfil do médico
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

      <TouchableOpacity style={styles.button} onPress={() => router.push('/doctors/')}>
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
