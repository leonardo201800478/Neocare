import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { authStyles } from '../styles/AuthStyles';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira um endereço de email válido.');
      return;
    }

    setLoading(true);
    try {
      // Simulação de recuperação de senha - Integração com Supabase ou outro serviço aqui
      console.log('Solicitação de recuperação de senha enviada');
      Alert.alert('Sucesso', 'Email de recuperação enviado! Verifique sua caixa de entrada.');
      router.replace('/auth/');
    } catch (error) {
      console.error('Erro ao enviar recuperação de senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a recuperação de senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animatable.View animation="fadeIn" duration={800} style={authStyles.container}>
      {loading && (
        <View style={authStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={authStyles.loadingText}>Enviando...</Text>
        </View>
      )}

      <Text style={authStyles.header}>Recuperar Senha</Text>

      {/* Campo de Email com Ícone */}
      <View style={authStyles.inputWrapper}>
        <Icon name="envelope" size={20} color="#A8E6CF" style={authStyles.icon} />
        <TextInput
          placeholder="Digite seu Email"
          value={email}
          onChangeText={setEmail}
          style={authStyles.inputField}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A8E6CF"
        />
      </View>

      {/* Botão de Enviar com Ícone */}
      <TouchableOpacity style={authStyles.button} onPress={handleResetPassword}>
        <Icon name="send" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={authStyles.buttonText}>
          Enviar Email de Recuperação
        </Animatable.Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => router.replace('/auth/')} style={authStyles.linkButton}>
        <Text style={authStyles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ResetPasswordPage;
