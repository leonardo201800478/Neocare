import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

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
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Registrando médico...</Text>
        </View>
      )}
      <Text style={styles.header}>Cadastro do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#b0b0b0"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisterDoctor} disabled={loading}>
        <FontAwesome name="user-plus" size={20} color="#fff" />
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/terms/')}>
        <FontAwesome name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e8f5e9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderColor: '#2E7D32',
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
});

export default RegisterDoctor;
