import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSystem } from '../../powersync/PowerSync';
import { useDoctor } from '../context/DoctorContext';
import { authStyles } from '../styles/AuthStyles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const { setSelectedDoctor } = useDoctor();
  const router = useRouter();

  const onSignInPress = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Email e senha são obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabaseConnector.client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      const userId = data.user?.id;
      if (!userId) throw new Error('Erro ao obter ID do usuário.');

      const { data: doctorData, error: doctorError } = await supabaseConnector.client
        .from('doctors')
        .select('*')
        .eq('auth_user_id', userId)
        .single();
      if (doctorError || !doctorData) {
        Alert.alert('Erro', 'Médico não encontrado. Registrar-se.');
        router.push('/auth/Register');
        return;
      }

      setSelectedDoctor(doctorData);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Erro no login', error.message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animatable.View animation="fadeIn" duration={800} style={authStyles.container}>
      {loading && (
        <View style={authStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#A8E6CF" />
          <Text style={authStyles.loadingText}>Carregando...</Text>
        </View>
      )}

      <Text style={authStyles.header}>Neo Care</Text>
      <Text style={authStyles.subHeader}>Faça login para continuar</Text>

      <View style={authStyles.inputWrapper}>
        <Icon name="envelope" size={20} color="#A8E6CF" style={authStyles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={authStyles.inputField}
          placeholderTextColor="#A8E6CF"
        />
      </View>

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

      <TouchableOpacity onPress={onSignInPress} style={authStyles.button}>
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={authStyles.buttonText}>
          Entrar
        </Animatable.Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/Register')} style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Criar uma conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/auth/reset-password')}
        style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Login;
