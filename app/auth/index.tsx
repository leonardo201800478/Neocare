// app/index.tsx (Login)
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSystem } from '../../powersync/PowerSync';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const onSignInPress = async () => {
    setLoading(true);
    try {
      await supabaseConnector.login(email, password);
      router.replace('/home/'); // Redireciona para a tela Home
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para redirecionar para a tela de cadastro
  const onSignUpPress = () => {
    router.push('/auth/register');
  };

  // Função para redirecionar para a tela de redefinição de senha
  const onForgotPasswordPress = () => {
    router.push('/auth/reset-password'); // Supondo que exista uma tela para redefinir senha em `/reset-password`
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            elevation: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            gap: 10,
          }}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', fontSize: 20 }}>Loading...</Text>
        </View>
      )}

      <Text style={styles.header}>Neo Care</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="john@doe.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão para Criar Conta */}
      <TouchableOpacity onPress={onSignUpPress} style={[styles.linkButton, { marginTop: 20 }]}>
        <Text style={styles.linkText}>Criar uma conta</Text>
      </TouchableOpacity>

      {/* Botão para Redefinir Senha */}
      <TouchableOpacity onPress={onForgotPasswordPress} style={styles.linkButton}>
        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 100,
    color: '#151515',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#A700FF',
    borderRadius: 4,
    padding: 10,
    color: '#151515',
    backgroundColor: '#363636',
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#A700FF',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#151515',
  },
  linkButton: {
    marginVertical: 5,
    alignItems: 'center',
  },
  linkText: {
    color: '#151515',
    fontSize: 16,
  },
});

export default Login;
