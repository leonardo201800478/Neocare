import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSystem } from '../../powersync/PowerSync';
import { authStyles } from '../styles/AuthStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const onSignInPress = async () => {
    // Verificação dos tipos de email e senha
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert('Erro', 'Email e senha devem ser strings válidas e não podem estar vazios.');
      return;
    }

    setLoading(true);
    try {
      console.log('Tentando logar com:', { email, password });

      // Tentativa de login
      await supabaseConnector.login(email, password);
      console.log('Login bem-sucedido');
      router.replace('/home/'); // Redireciona para a tela Home
    } catch (error: any) {
      console.error('Erro ao tentar realizar login:', error);
      Alert.alert(
        'Erro ao tentar realizar login',
        error.message || 'Ocorreu um erro desconhecido.'
      );
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
    <View style={authStyles.container}>
      {loading && (
        <View style={authStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00f" />
          <Text style={authStyles.loadingText}>Carregando...</Text>
        </View>
      )}

      {/* Cabeçalho do Login */}
      <Text style={authStyles.header}>Bem-vindo ao Neo Care</Text>
      <Text style={authStyles.subHeader}>Faça login para continuar</Text>

      {/* Campo de Email com Ícone */}
      <View style={authStyles.inputWrapper}>
        <Icon name="envelope" size={20} color="#999" style={authStyles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={authStyles.inputField}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      {/* Campo de Senha com Ícone */}
      <View style={authStyles.inputWrapper}>
        <Icon name="lock" size={20} color="#999" style={authStyles.icon} />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={authStyles.inputField}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>

      {/* Botão de Login com Ícone */}
      <TouchableOpacity onPress={onSignInPress} style={[authStyles.button, styles.buttonWithIcon]}>
        <Icon name="sign-in" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={authStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão de Criar Conta */}
      <TouchableOpacity onPress={onSignUpPress} style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Criar uma conta</Text>
      </TouchableOpacity>

      {/* Botão de Recuperação de Senha */}
      <TouchableOpacity onPress={onForgotPasswordPress} style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default Login;
