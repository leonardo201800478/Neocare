// app/(tabs)/doctors/update.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import DoctorsStyles from './styles/DoctorsStyles';
import { useDoctor } from '../../context/DoctorContext';

const UpdateDoctorProfile: React.FC = () => {
  const { selectedDoctor, createOrUpdateDoctor } = useDoctor();
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDoctor) {
      setName(selectedDoctor.name || '');
    } else {
      Alert.alert('Erro', 'Nenhum médico selecionado. Por favor, registre-se.');
      router.replace('/(tabs)/doctors/register');
    }
  }, [selectedDoctor]);

  const handleUpdateDoctor = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await createOrUpdateDoctor({ auth_user_id: selectedDoctor!.auth_user_id, name });
      Alert.alert('Sucesso', 'Dados do médico atualizados com sucesso!');
      router.replace('/(tabs)/doctors');
    } catch {
      Alert.alert('Erro', 'Erro ao atualizar os dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={DoctorsStyles.container}>
      {loading && (
        <View style={DoctorsStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={DoctorsStyles.loadingText}>Atualizando dados...</Text>
        </View>
      )}
      <Text style={DoctorsStyles.header}>Atualizar Dados do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={DoctorsStyles.input}
        placeholderTextColor="#b0b0b0"
      />

      <TouchableOpacity
        style={DoctorsStyles.button}
        onPress={handleUpdateDoctor}
        disabled={loading}>
        <Text style={DoctorsStyles.buttonText}>Atualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(tabs)/doctors')}>
        <Text style={DoctorsStyles.linkText}>Voltar para Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateDoctorProfile;
