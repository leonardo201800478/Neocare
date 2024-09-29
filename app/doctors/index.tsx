// app/doctors/index.tsx
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import { DOCTORS_TABLE, Doctor } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const DoctorProfile: React.FC = () => {
  const { supabaseConnector, db } = useSystem();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = async () => {
    try {
      setLoading(true);
      const { userID } = await supabaseConnector.fetchCredentials(); // Pegar o ID do usuário autenticado
      const doctorData = await db
        .selectFrom(DOCTORS_TABLE)
        .selectAll()
        .where('user_id', '=', userID)
        .execute();

      if (doctorData.length > 0) {
        setDoctor(doctorData[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do médico:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#A700FF" />;
  }

  return (
    <View style={styles.container}>
      {doctor ? (
        <>
          <Text style={styles.header}>Perfil do Médico</Text>
          <Text style={styles.text}>Nome: {doctor.name}</Text>
          <Text style={styles.text}>Email: {doctor.email}</Text>
          <Text style={styles.text}>
            Data de Criação:{' '}
            {doctor.created_at
              ? new Date(doctor.created_at).toLocaleDateString()
              : 'Data não disponível'}
          </Text>

          {/* Botão para atualizar os dados do médico */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007BFF' }]}
            onPress={() => router.push('/doctors/update')}>
            <Text style={styles.buttonText}>Atualizar Dados</Text>
          </TouchableOpacity>

          {/* Botão para voltar à tela Home */}
          <TouchableOpacity style={styles.button} onPress={() => router.push('/home/')}>
            <Text style={styles.buttonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>Dados do médico não encontrados.</Text>
      )}
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
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    width: '80%',
    padding: 12,
    backgroundColor: '#A700FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default DoctorProfile;
