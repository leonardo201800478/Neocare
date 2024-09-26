import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import styles from '../styles/PacienteDetailsStyles';

import { useSystem } from '~/powersync/PowerSync';

const PacienteDetails = () => {
  const { cpf } = useLocalSearchParams(); // Pegando o parâmetro dinâmico da URL usando useLocalSearchParams
  const { db } = useSystem();
  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (cpf && typeof cpf === 'string') {
      loadPaciente(cpf);
    } else {
      Alert.alert('Erro', 'CPF inválido ou não fornecido.');
      router.replace('./home');
    }
  }, [cpf]);

  const loadPaciente = async (cpf: string) => {
    setLoading(true);
    try {
      const result = await db
        .selectFrom('patients')
        .selectAll()
        .where('cpf_patients', '=', cpf)
        .execute();
      setPaciente(result[0]);
    } catch (error) {
      console.error('Erro ao carregar paciente:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePaciente = async () => {
    if (paciente) {
      Alert.alert('Confirmar', 'Deseja realmente deletar o paciente?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              await db.deleteFrom('patients').where('id', '=', paciente.id).execute();
              Alert.alert('Sucesso', 'Paciente deletado com sucesso');
              router.replace('./home');
            } catch (error) {
              console.error('Erro ao deletar paciente:', error);
              Alert.alert('Erro', 'Não foi possível deletar o paciente.');
            }
          },
          style: 'destructive',
        },
      ]);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do paciente...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Paciente não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      <Text>Nome: {paciente.nome_patients}</Text>
      <Text>CPF: {paciente.cpf_patients}</Text>
      <Text>Data de Nascimento: {paciente.data_nasc_patients}</Text>
      <Text>CEP: {paciente.cep_patients}</Text>
      <Text>UF: {paciente.uf_patients}</Text>
      <Text>Cidade: {paciente.cidade_patients}</Text>
      <Text>Endereço: {paciente.endereco_patients}</Text>
      <Text>Telefone: {paciente.fone_patients}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonDelete} onPress={deletePaciente}>
          <Text style={styles.buttonText}>Deletar Paciente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBack} onPress={() => router.replace('./home')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PacienteDetails;
