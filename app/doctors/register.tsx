// app/doctors/register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useSystem } from '../../powersync/PowerSync';

const RegisterDoctor = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const handleRegisterDoctor = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    setLoading(true); // Mostrar o indicador de carregamento durante o processo
    try {
      // Obter ID e email do usuário logado
      const { userID, client } = await supabaseConnector.fetchCredentials();
      const { data: userData, error: userError } = await client.auth.getUser();

      if (userError || !userData.user) {
        throw new Error('Erro ao obter informações do usuário. Faça login novamente.');
      }

      const userEmail = userData.user.email;

      if (!userID || !userEmail) {
        Alert.alert(
          'Erro',
          'Não foi possível obter as informações do usuário. Faça login novamente.'
        );
        return;
      }

      // Verificar se o médico já está registrado
      const { data: existingDoctor, error: fetchError } = await client
        .from('doctors')
        .select('*')
        .eq('id', userID)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(`Erro ao verificar o médico no Supabase: ${fetchError.message}`);
      }

      if (existingDoctor) {
        Alert.alert('Atenção', 'Este médico já está registrado.');
        router.replace('/home/'); // Redireciona para a tela Home se o médico já estiver registrado
        return;
      }

      // Caso não exista, inserir novo médico com nome e email
      const { error } = await client.from('doctors').upsert({
        id: userID,
        name: name.trim(),
        email: userEmail,
      });

      if (error) {
        throw new Error(`Erro ao inserir o médico no Supabase: ${error.message}`);
      }

      Alert.alert('Sucesso', 'Médico registrado com sucesso!');
      router.replace('/home/');
    } catch (error) {
      console.error('Erro ao registrar o médico:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o médico.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Registrando médico...</Text>
        </View>
      )}

      <Text style={styles.header}>Cadastro do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#b0b0b0"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterDoctor} disabled={loading}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/home/')}>
        <Text style={styles.linkText}>Voltar para Home</Text>
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
    backgroundColor: '#151515',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    color: '#fff',
    backgroundColor: '#363636',
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
  linkText: {
    color: '#A700FF',
    fontSize: 16,
    marginTop: 8,
  },
});

export default RegisterDoctor;
