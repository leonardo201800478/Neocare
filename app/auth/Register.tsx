import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import styles from '../styles/AuthStyles';

import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector, db } = useSystem();
  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }
    if (password.length < 6 || password.length > 15) {
      Alert.alert('Erro', 'A senha deve conter entre 6 a 15 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    setLoading(true);

    try {
      // Realizando o registro no Supabase
      const { data, error } = await supabaseConnector.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Recuperando o ID do usuário criado
      const userID = data?.user?.id;

      if (userID) {
        // Registrando o novo médico na tabela "doctors"
        const doctorId = uuid(); // Gerando um UUID para o médico

        await db
          .insertInto('doctors')
          .values({
            id: doctorId,
            name_user: name, // Supondo que o nome seja o email; ajustar conforme necessário
            owner_id: userID, // Vinculando ao Supabase auth user ID
            inserted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .execute();

        console.log('Usuário registrado com sucesso na tabela doctors');
        Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
        router.replace('/'); // Voltar para a tela de login
      }
    } catch (error: any) {
      console.error('Erro ao registrar o usuário:', error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Text style={styles.header}>Criar Conta</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={[styles.input, password !== confirmPassword ? styles.errorInput : null]}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('./Login')}>
        <Text style={styles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
