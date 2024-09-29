// app/register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useSystem } from '../../powersync/PowerSync';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
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
      const { data, error } = await supabaseConnector.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      router.replace('/doctors/register'); // Redirecionando para a tela de cadastro de médico
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

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar Senha"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={[styles.input, password !== confirmPassword ? styles.errorInput : null]}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/')}>
        <Text style={styles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 20,
    backgroundColor: '#eef2f3',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    padding: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#6200ee',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default Register;
