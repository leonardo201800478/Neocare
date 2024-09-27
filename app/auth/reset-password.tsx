import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    // Adicionar lógica de recuperação de senha
    console.log('Solicitação de recuperação de senha enviada');
    router.replace('/auth/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar Email de Recuperação</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/')}>
        <Text style={styles.linkText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#A700FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#A700FF',
    fontSize: 16,
    marginTop: 8,
  },
});

export default ResetPasswordPage;
