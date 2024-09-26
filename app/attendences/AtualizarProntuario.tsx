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

import { ATTENDANCES_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const AtualizarProntuario = () => {
  const { cpf } = useLocalSearchParams();
  const router = useRouter();
  const { db } = useSystem();
  const [loading, setLoading] = useState(false);
  const [prontuario, setProntuario] = useState<any>(null);
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    loadProntuario();
  }, []);

  const loadProntuario = async () => {
    if (!cpf) return;
    setLoading(true);
    try {
      const result = await db
        .selectFrom(ATTENDANCES_TABLE)
        .selectAll()
        .where('patient_id', '=', cpf)
        .execute();
      if (result.length > 0) {
        setProntuario(result[0]);
        setPeso(result[0].peso);
        setAltura(result[0].comprimento);
        setObservacoes(result[0].observacoes);
      }
    } catch (error) {
      console.error('Erro ao carregar prontuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAtualizar = async () => {
    setLoading(true);
    try {
      await db
        .update(ATTENDANCES_TABLE)
        .set({
          peso,
          comprimento: altura,
          updated_at: new Date().toISOString(),
          observacoes,
        })
        .where('id', '=', prontuario.id)
        .execute();

      Alert.alert('Sucesso', 'Prontuário atualizado com sucesso');
      router.replace(`/attendences`);
    } catch (error) {
      console.error('Erro ao atualizar prontuário:', error);
      Alert.alert('Erro', 'Erro ao atualizar prontuário');
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
        placeholder="Peso"
        value={peso}
        onChangeText={setPeso}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Altura"
        value={altura}
        onChangeText={setAltura}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
        style={styles.input}
        multiline
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
