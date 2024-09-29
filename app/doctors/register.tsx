// app/doctors/register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

import { DOCTORS_TABLE } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const RegisterDoctor = () => {
  const [name, setName] = useState('');
  const { supabaseConnector, db } = useSystem();
  const router = useRouter();

  const handleRegisterDoctor = async () => {
    if (!name) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    try {
      // Pegando as credenciais do usuário autenticado
      const { userID, client } = await supabaseConnector.fetchCredentials();
      const { data, error } = await client.auth.getUser();

      if (error || !data.user) {
        throw new Error('Não foi possível obter o usuário autenticado.');
      }

      const userEmail = data.user.email;

      // Verificar diretamente no Supabase se o médico já está registrado
      const { data: existingDoctor, error: fetchError } = await client
        .from(DOCTORS_TABLE)
        .select('id')
        .eq('email', userEmail)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(`Erro ao verificar o médico no Supabase: ${fetchError.message}`);
      }

      if (existingDoctor) {
        Alert.alert('Atenção', 'Este médico já está registrado.');
        router.replace('/home/HomeScreen'); // Redireciona para a tela Home se o médico já estiver registrado
        return;
      }

      // Inserindo o novo médico na tabela "doctors" no Supabase
      const { error: insertError } = await client.from(DOCTORS_TABLE).insert({
        id: userID, // Utilizando o mesmo ID do usuário autenticado
        name, // Nome inserido pelo médico
        email: userEmail, // Email do usuário autenticado
        created_at: new Date().toISOString(), // Data de criação
      });

      if (insertError) {
        throw new Error(`Erro ao inserir o médico no Supabase: ${insertError.message}`);
      }

      Alert.alert('Sucesso', 'Médico registrado com sucesso!');
      router.replace('/home/HomeScreen'); // Redireciona para a tela Home após o registro
    } catch (error) {
      console.error('Erro ao registrar o médico:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o médico.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterDoctor}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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

export default RegisterDoctor;
