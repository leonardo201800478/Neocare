// app/auth/Login.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import styles from '../styles/AuthStyles';

import { useSystem } from '~/powersync/PowerSync';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const onSignInPress = async () => {
    setLoading(true);
    try {
      // Use the PowerSync specific login method
      await supabaseConnector.login(email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      <Text style={styles.header}>Neo Care - Login</Text>
      <TextInput
        placeholder="john@doe.com"
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
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/Register')}>
        <Text style={styles.linkText}>Criar novo usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/ForgotPassword')}>
        <Text style={styles.linkText}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
