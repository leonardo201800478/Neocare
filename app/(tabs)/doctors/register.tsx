// app/(tabs)/doctors/register.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import DoctorsStyles from './styles/DoctorsStyles';
import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';

const RegisterDoctor: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { supabaseConnector } = useSystem();
  const { createOrUpdateDoctor } = useDoctor();

  const handleRegisterDoctor = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome completo.');
      return;
    }

    setLoading(true);

    try {
      const { client } = await supabaseConnector.fetchCredentials();
      const { data, error } = await client.auth.getUser();

      if (error || !data?.user) {
        throw new Error('Usuário não autenticado ou erro ao obter ID do usuário.');
      }

      const userId = data.user.id;
      const email = data.user.email;

      await createOrUpdateDoctor({ auth_user_id: userId, email, name });

      Alert.alert('Sucesso', 'Nome do médico registrado com sucesso!');
      router.replace('/terms/');
    } catch (error) {
      console.error('Erro ao registrar o médico:', error);
      Alert.alert('Erro', 'Erro ao registrar o médico. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={DoctorsStyles.container}>
      {loading && (
        <View style={DoctorsStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={DoctorsStyles.loadingText}>Registrando médico...</Text>
        </View>
      )}
      <Text style={DoctorsStyles.header}>Cadastro do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={DoctorsStyles.input}
        placeholderTextColor="#b0b0b0"
      />

      <TouchableOpacity
        style={DoctorsStyles.button}
        onPress={handleRegisterDoctor}
        disabled={loading}>
        <Text style={DoctorsStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/terms/')}>
        <Text style={DoctorsStyles.linkText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterDoctor;
