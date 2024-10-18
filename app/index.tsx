import CheckBox from '@react-native-community/checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  SafeAreaView,
  ActivityIndicator, // Para mostrar indicador de carregamento
} from 'react-native';

import { useSystem } from '../powersync/PowerSync';

export default function Terms() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const { supabaseConnector } = useSystem();

  const handleAccept = async () => {
    if (!accepted) {
      Alert.alert('Erro', 'Você precisa aceitar os termos para continuar.');
      return;
    }

    setLoading(true); // Ativando o estado de carregamento

    try {
      const {
        data: { user },
        error: userError,
      } = await supabaseConnector.client.auth.getUser();

      if (userError || !user) {
        throw new Error('Usuário não autenticado ou erro ao buscar dados do usuário.');
      }

      const { error } = await supabaseConnector.client
        .from('doctors')
        .update({ terms_accepted: '1' })
        .eq('auth_user_id', user.id);

      if (error) {
        throw new Error('Não foi possível atualizar o status de aceite dos termos.');
      }

      // Redireciona o usuário para a tela principal após a atualização bem-sucedida
      router.push('/(tabs)/home/');
    } catch (error: any) {
      // Tratar erro e exibir mensagem apropriada
      Alert.alert('Erro', error.message || 'Erro desconhecido ao aceitar os termos.');
    } finally {
      setLoading(false); // Desativando o estado de carregamento
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          Termos de Consentimento e Aceite para o Uso de Dados em Neocare
        </Text>

        {/* Checkbox para aceitar os termos */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={accepted}
            onValueChange={(newValue) => setAccepted(newValue)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Eu li e aceito os Termos de Consentimento</Text>
        </View>

        {/* Indicador de carregamento e botão */}
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <TouchableOpacity
              style={[styles.acceptButton, !accepted && styles.disabledButton]}
              onPress={handleAccept}
              disabled={!accepted || loading} // Desabilitar o botão se não aceitar os termos ou estiver carregando
            >
              <Text style={styles.buttonText}>Aceitar e Continuar</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
