// app/auth/reset-password.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      alert('Por favor, insira um endereço de email válido.');
      return;
    }
    
    setLoading(true);
    try {
      // Adicionar lógica de recuperação de senha (Substituir com a implementação de envio real)
      console.log('Solicitação de recuperação de senha enviada');
      alert('Email de recuperação enviado! Verifique sua caixa de entrada.');
      router.replace('/auth/');
    } catch (error) {
      console.error('Erro ao enviar recuperação de senha:', error);
      alert('Ocorreu um erro ao enviar a recuperação de senha. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Text style={styles.header}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar Email de Recuperação</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/')} style={styles.linkButton}>
        <Text style={styles.linkText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eef2f3',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    padding: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ResetPasswordPage;
