import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
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
      const { data, error } = await supabaseConnector.client.auth.signUp({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        setTimeout(() => {
          router.replace('/(tabs)/doctors/register');
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

  const isPasswordMatching = password === confirmPassword;

  return (
    <Animatable.View animation="fadeIn" duration={800} style={authStyles.container}>
      {loading && (
        <View style={authStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Text style={authStyles.header}>Criar Conta</Text>

      {/* Campo de Email com Ícone */}
      <View style={authStyles.inputWrapper}>
        <Icon name="envelope" size={20} color="#A8E6CF" style={authStyles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={authStyles.inputField}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A8E6CF"
        />
      </View>

      {/* Campo de Senha com Ícone */}
      <View style={authStyles.inputWrapper}>
        <Icon name="lock" size={30} color="#A8E6CF" style={authStyles.icon} />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          style={authStyles.inputField}
          secureTextEntry
          placeholderTextColor="#A8E6CF"
        />
      </View>

      {/* Campo de Confirmação de Senha com Ícone - Alteração de fundo */}
      <View
        style={[
          authStyles.inputWrapper,
          {
            backgroundColor: confirmPassword
              ? isPasswordMatching
                ? 'rgba(0, 255, 0, 0.3)' // Verde claro transparente para coincidência
                : 'rgba(255, 0, 0, 0.3)' // Vermelho claro transparente para erro
              : 'rgba(255, 255, 255, 0.2)', // Transparência padrão
          },
        ]}>
        <Icon name="lock" size={30} color="#A8E6CF" style={authStyles.icon} />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={authStyles.inputField}
          secureTextEntry
          placeholderTextColor="#A8E6CF"
        />
      </View>

      {/* Botão de Cadastro com Ícone */}
      <TouchableOpacity style={authStyles.button} onPress={handleRegister}>
        <Icon name="user-plus" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={authStyles.buttonText}>
          Cadastrar
        </Animatable.Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => router.replace('/auth/')} style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Register;
