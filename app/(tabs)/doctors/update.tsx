// app/(tabs)/doctors/update.tsx

import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';
import { useDoctor } from '../../context/DoctorContext';
import DoctorsStyles from '../../styles/DoctorsStyles';

const UpdateDoctorProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { db } = useSystem(); // Utilizando o banco de dados do PowerSync (Kysely)
  const { selectedDoctor, setSelectedDoctor } = useDoctor(); // Obtendo o médico selecionado do contexto
  const router = useRouter();

  useEffect(() => {
    if (selectedDoctor) {
      console.log('Médico selecionado encontrado no contexto:', selectedDoctor);
      setName(selectedDoctor.name || '');
    } else {
      console.log(
        'Nenhum médico selecionado encontrado no contexto, tentando carregar do banco de dados...'
      );
      loadDoctorData();
    }
  }, []);

  // Função para carregar os dados do médico utilizando o banco de dados do PowerSync
  const loadDoctorData = async () => {
    setLoading(true);
    try {
      console.log('Carregando dados do médico do banco de dados local...');
      // Obtendo as informações do médico a partir do banco local
      const doctor = await db.selectFrom('doctors').selectAll().executeTakeFirst();

      if (!doctor) {
        console.error('Nenhum médico encontrado no banco de dados.');
        throw new Error('Nenhum médico encontrado. Por favor, registre-se.');
      }

      console.log('Dados do médico carregados:', doctor);
      setSelectedDoctor(doctor); // Atualiza o contexto do médico
      setName(doctor.name || ''); // Inicializa o campo de nome
    } catch (error) {
      console.error('Erro ao carregar os dados do médico:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do médico. Faça login novamente.');
      router.replace('/(tabs)/doctors/register'); // Redireciona para o registro se não encontrar o médico
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o nome do médico
  const handleUpdateDoctor = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }

    setLoading(true);
    try {
      if (!selectedDoctor) {
        console.error('Médico não encontrado no contexto. Não é possível atualizar.');
        throw new Error('Médico não encontrado no contexto. Faça login novamente.');
      }

      console.log('Iniciando atualização do nome do médico no banco de dados local...');

      // Atualizando o nome do médico no banco de dados local (Kysely/PowerSync)
      const updatedRows = await db
        .updateTable('doctors')
        .set({ name: name.trim() })
        .where('id', '=', selectedDoctor.id)
        .executeTakeFirstOrThrow(); // Modificado para lançar um erro se a atualização falhar

      if (updatedRows.numUpdatedRows > 0) {
        console.log('Dados do médico atualizados localmente:', updatedRows);
        // Atualiza o contexto com os dados modificados
        setSelectedDoctor({ ...selectedDoctor, name: name.trim() });
        Alert.alert('Sucesso', 'Dados do médico atualizados com sucesso!');
        router.replace('/(tabs)/doctors/'); // Redireciona para a tela do perfil do médico após a atualização
      } else {
        console.error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
        throw new Error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o médico:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o médico.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={DoctorsStyles.container}>
      {loading && (
        <View style={DoctorsStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={DoctorsStyles.loadingText}>Carregando dados...</Text>
        </View>
      )}
      <Text style={DoctorsStyles.header}>Atualizar Dados do Médico</Text>
      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={DoctorsStyles.input}
        placeholderTextColor="#b0b0b0"
      />
      <TouchableOpacity
        style={DoctorsStyles.button}
        onPress={handleUpdateDoctor}
        disabled={loading}>
        <Text style={DoctorsStyles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/(tabs)/doctors/')}>
        <Text style={DoctorsStyles.linkText}>Voltar para Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateDoctorProfile;
