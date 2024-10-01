import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSystem } from '../../powersync/PowerSync';
import { authStyles } from '../styles/AuthStyles';

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
      // Registrar o usuário
      const { data, error } = await supabaseConnector.client.auth.signUp({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      // Confirmar que o usuário foi criado e está autenticado antes de redirecionar
      if (data.user) {
        // Adiciona um pequeno atraso para garantir que a autenticação seja processada
        setTimeout(() => {
          router.replace('/doctors/register');
        }, 1000);
      } else {
        throw new Error('Erro ao registrar o usuário. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro ao registrar o usuário:', error.message);
      Alert.alert('Erro', error.message || 'Ocorreu um erro ao registrar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      {loading && (
        <View style={authStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text style={authStyles.header}>Criar Conta</Text>

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

      {/* Campo de Confirmação de Senha com Ícone */}
      <View style={authStyles.inputWrapper}>
        <Icon name="lock" size={20} color="#999" style={authStyles.icon} />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={authStyles.inputField}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>

      {/* Botão de Cadastro com Ícone */}
      <TouchableOpacity style={authStyles.button} onPress={handleRegister}>
        <Icon name="user-plus" size={20} color="#fff" />
        <Text style={authStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/')} style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
