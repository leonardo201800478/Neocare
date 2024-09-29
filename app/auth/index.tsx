// app/index.tsx (Login)
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
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

  const onSignUpPress = () => {
    router.push('/auth/register');
  };

  const onForgotPasswordPress = () => {
    router.push('/auth/reset-password');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00f" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}

      <Text style={styles.header}>Neo Care</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignUpPress} style={styles.linkButton}>
        <Text style={styles.linkText}>Criar uma conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onForgotPasswordPress} style={styles.linkButton}>
        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
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
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
    fontWeight: 'bold',
  },
  inputField: {
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
  linkButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
