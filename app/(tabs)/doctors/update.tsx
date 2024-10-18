import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

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
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Atualizando dados...</Text>
        </View>
      )}
      <Text style={styles.header}>Atualizar Dados do Médico</Text>

      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#b0b0b0"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateDoctor} disabled={loading}>
        <FontAwesome name="save" size={20} color="#fff" />
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.replace('/(tabs)/doctors')}>
        <FontAwesome name="arrow-left" size={20} color="#fff" />
        <Text style={styles.buttonText}>Voltar para Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonSecondary: {
    backgroundColor: '#FF5722',
    padding: 15,
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
});

export default UpdateDoctorProfile;
