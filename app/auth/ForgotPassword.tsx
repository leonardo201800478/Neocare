// app/auth/ForgotPassword.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';

import styles from '../styles/AuthStyles';

import { useSystem } from '~/powersync/PowerSync';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handlePasswordReset = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    try {
      const { error } = await supabaseConnector.client.auth.resetPasswordForEmail(email);
      if (error) {
        Alert.alert('Erro', 'Email não encontrado');
      } else {
        Alert.alert('Sucesso', 'Email de recuperação enviado');
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha no envio do email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recuperar Senha</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('./Login')}>
        <Text style={styles.linkText}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
