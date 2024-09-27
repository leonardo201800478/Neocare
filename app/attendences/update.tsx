import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import LoadingOverlay from '../../components/LoadingOverlay';
import { ATTENDANCES_TABLE } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const AtualizarProntuario = () => {
  const { id } = useLocalSearchParams(); // Obtendo o ID do prontuário da URL
  const router = useRouter();
  const { db } = useSystem();
  const [loading, setLoading] = useState(false);
  const [prontuario, setProntuario] = useState<any>(null);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  useEffect(() => {
    if (id) {
      loadProntuario(); // Carrega os dados do prontuário
    }
  }, [id]);

  const loadProntuario = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const result = await db
        .selectFrom(ATTENDANCES_TABLE)
        .selectAll()
        .where('id', '=', id)
        .execute();

      if (result.length > 0) {
        setProntuario(result[0]);
        setPeso(result[0].peso ?? '');
        setAltura(result[0].comprimento ?? '');
      } else {
        Alert.alert('Erro', 'Prontuário não encontrado.');
        router.replace('/attendences/');
      }
    } catch (error) {
      console.error('Erro ao carregar prontuário:', error);
      Alert.alert('Erro', 'Erro ao carregar prontuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleAtualizar = async () => {
    if (!prontuario) {
      Alert.alert('Erro', 'Prontuário não carregado.');
      return;
    }

    setLoading(true);
    try {
      await db
        .updateTable(ATTENDANCES_TABLE)
        .set({
          peso,
          comprimento: altura,
          updated_at: new Date().toISOString(),
        })
        .where('id', '=', prontuario.id)
        .execute();

      Alert.alert('Sucesso', 'Prontuário atualizado com sucesso');
      router.replace(`/attendences/`);
    } catch (error) {
      console.error('Erro ao atualizar prontuário:', error);
      Alert.alert('Erro', 'Erro ao atualizar prontuário.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay message="Atualizando prontuário..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atualizar Prontuário</Text>

      <TextInput
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Altura (cm)"
        value={altura}
        onChangeText={setAltura}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
        <Text style={styles.buttonText}>Salvar e Concluir</Text>
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
  input: {
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
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
});

export default AtualizarProntuario;
