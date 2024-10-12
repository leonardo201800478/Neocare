// app/auth/index.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSystem } from '../../powersync/PowerSync';
import { useDoctor } from '../context/DoctorContext';
import { authStyles } from '../styles/AuthStyles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const { setSelectedDoctor } = useDoctor(); // Corrigido para definir o médico selecionado no contexto
  const router = useRouter();

  const onSignInPress = async () => {
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

      // Tentativa de login no Supabase
      const { data, error } = await supabaseConnector.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Buscando o ID do usuário após o login
      const userId = data.user?.id;

      if (!userId) {
        throw new Error('Erro ao obter ID do usuário.');
      }

      console.log('ID do usuário autenticado:', userId); // Log para verificar o userId

      // Buscar o registro do médico usando o campo auth_user_id
      const { data: doctorData, error: doctorError } = await supabaseConnector.client
        .from('doctors')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (doctorError) {
        console.error('Erro ao buscar dados do médico:', doctorError.message); // Log detalhado do erro
        throw new Error('Erro ao buscar dados do médico.');
      }

      if (!doctorData) {
        // Médico não encontrado, redirecionar para registro de médico
        Alert.alert('Erro', 'Dados do médico não encontrados. Você precisa registrar seus dados.', [
          {
            text: 'Registrar',
            onPress: () => router.push('/auth/register'),
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ]);
        return;
      }

      setSelectedDoctor(doctorData); // Definindo o médico no contexto
      console.log('Login bem-sucedido');
      router.replace('/(tabs)/home'); // Redireciona para a tela Home
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
      <Text style={authStyles.header}>Neo Care</Text>
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
        <Icon name="lock" size={30} color="#999" style={authStyles.icon} />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={authStyles.inputField}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>

      {/* Botão de Login */}
      <TouchableOpacity onPress={onSignInPress} style={authStyles.button}>
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

export default Login;