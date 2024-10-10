import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDoctor } from '../../context/DoctorContext';
import DoctorsStyles from './styles/DoctorsStyles';

const RegisterDoctor: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { createDoctor } = useDoctor();

  const handleRegisterDoctor = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      await createDoctor({ name, email });
      Alert.alert('Sucesso', 'Médico registrado com sucesso!');
      router.replace('/(tabs)/home');
    } catch (error) {
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

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={DoctorsStyles.input}
        placeholderTextColor="#b0b0b0"
      />

      <TouchableOpacity
        style={DoctorsStyles.button}
        onPress={handleRegisterDoctor}
        disabled={loading}
      >
        <Text style={DoctorsStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
        <Text style={DoctorsStyles.linkText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterDoctor;
