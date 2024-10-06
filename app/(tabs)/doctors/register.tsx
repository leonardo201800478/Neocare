// app/doctors/register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';
import DoctorsStyles from '../../styles/DoctorsStyles';

const RegisterDoctor: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { supabaseConnector } = useSystem();
  const { setSelectedDoctor } = useDoctor(); // Usando o contexto do médico para definir o médico selecionado
  const router = useRouter();

  const handleRegisterDoctor = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    setLoading(true);
    try {
      const { client } = supabaseConnector;
      const { data: userData, error: userError } = await client.auth.getUser();

      if (userError || !userData.user) {
        throw new Error('Erro ao obter informações do usuário. Faça login novamente.');
      }

      const userEmail = userData.user.email;
      const userId = userData.user.id;

      if (!userId || !userEmail) {
        Alert.alert(
          'Erro',
          'Não foi possível obter as informações do usuário. Faça login novamente.'
        );
        return;
      }

      // Verificar se o médico já existe para o auth_user_id
      const { data: existingDoctor, error: fetchError } = await client
        .from('doctors')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw new Error(`Erro ao verificar o médico no Supabase: ${fetchError.message}`);
      }

      let doctorData;
      if (existingDoctor) {
        // Atualizar o nome do médico existente
        const { data, error } = await client
          .from('doctors')
          .update({ name: name.trim() })
          .eq('auth_user_id', userId)
          .select('*')
          .single();

        if (error) {
          throw new Error(`Erro ao atualizar o médico no Supabase: ${error.message}`);
        }
        doctorData = data;
      } else {
        // Inserir novo médico com nome e email e associar ao auth_user_id
        const { data, error } = await client
          .from('doctors')
          .insert({
            auth_user_id: userId,
            name: name.trim(),
            email: userEmail,
          })
          .select('*')
          .single();

        if (error) {
          throw new Error(`Erro ao inserir o médico no Supabase: ${error.message}`);
        }
        doctorData = data;
      }

      setSelectedDoctor(doctorData); // Atualiza o contexto do médico com os dados do registro/atualização
      Alert.alert('Sucesso', 'Médico registrado/atualizado com sucesso!');
      router.replace('/(tabs)/home/'); // Redireciona para a tela Home após o registro
    } catch (error) {
      console.error('Erro ao registrar o médico:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o médico.');
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
        <Text style={DoctorsStyles.buttonText}>Cadastrar/Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/home/')}>
        <Text style={DoctorsStyles.linkText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterDoctor;
