// app/index.tsx

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
} from 'react-native';

import { useSystem } from '../powersync/PowerSync'; // Aqui está sua instância do supabaseConnector

export default function Terms() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false); // Estado para controlar o aceite dos termos
  const { supabaseConnector } = useSystem(); // Acessa o conector Supabase

  const handleAccept = async () => {
    if (!accepted) {
      Alert.alert('Erro', 'Você precisa aceitar os termos para continuar.');
      return;
    }

    const {
      data: { user },
    } = await supabaseConnector.client.auth.getUser(); // Acessa o usuário autenticado
    if (user) {
      // Certifique-se de estar utilizando o cliente do Supabase para a consulta
      const { error } = await supabaseConnector.client
        .from('doctors') // Usa a tabela 'doctors'
        .update({ terms_accepted: '1' }) // Define '1' para indicar que os termos foram aceitos
        .eq('auth_user_id', user.id); // Atualiza o campo com base no auth_user_id

      if (error) {
        Alert.alert('Erro', 'Não foi possível atualizar o status de aceite dos termos.');
      } else {
        // Redireciona o usuário para a tela principal
        router.push('/(tabs)/home/');
      }
    } else {
      Alert.alert('Erro', 'Usuário não autenticado.');
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

        {/* Botão de Aceitar */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.acceptButton, !accepted && styles.disabledButton]}
            onPress={handleAccept}>
            <Text style={styles.buttonText}>Aceitar e Continuar</Text>
          </TouchableOpacity>
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
    backgroundColor: '#bdbdbd', // Desativa o botão se os termos não forem aceitos
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
