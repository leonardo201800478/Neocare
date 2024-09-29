// app/attendances/ConsultaDetails.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const ConsultaDetails = () => {
  const { id } = useLocalSearchParams(); // Pegando o ID do paciente da URL
  const { db, supabaseConnector } = useSystem();
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchPatientData(id);
    } else {
      Alert.alert('Erro', 'ID do paciente inválido ou não fornecido.');
      router.replace('/home/');
    }
  }, [id]);

  const fetchPatientData = async (id: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar dados do paciente:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do paciente.');
      } else {
        setPatientData(data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do paciente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do paciente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
        <Text>Carregando detalhes da consulta...</Text>
      </View>
    );
  }

  if (!patientData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Erro: Paciente não encontrado!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consulta do Paciente</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Nome: {patientData.name}</Text>
        <Text style={styles.detailItem}>CPF: {patientData.cpf}</Text>
        {/* Outros dados podem ser exibidos aqui */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home/')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailItem: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A700FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConsultaDetails;
