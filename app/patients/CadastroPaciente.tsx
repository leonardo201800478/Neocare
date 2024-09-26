import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import CEPInput from '../../components/CEPInput';
import { isCPFValid } from '../../components/CPFValidator';
import {
  formatDateForDatabase,
  formatCPF,
  removeCPFMask,
  removeCEPFormat,
} from '../../utils/formatUtils';
import { calcularIdade } from '../../utils/idadeCalculator';
import { uuid } from '../../utils/uuid';
import styles from '../styles/CadastroPacienteStyles';

import { PATIENTS_TABLE } from '~/powersync/AppSchema';
import { useSystem } from '~/powersync/PowerSync';

const CadastroPaciente = () => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('Masculino');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();

  const handleCadastro = async () => {
    setLoading(true);
    if (!nome || !cpf || !dataNasc) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos');
      setLoading(false);
      return;
    }

    if (!isCPFValid(cpf)) {
      Alert.alert('Erro', 'CPF inválido');
      setLoading(false);
      return;
    }

    try {
      const { userID } = await supabaseConnector.fetchCredentials();
      const doctorId = userID;

      await db
        .insertInto('patients')
        .values({
          id: uuid(),
          nome_patients: nome,
          cpf_patients: removeCPFMask(cpf),
          data_nasc_patients: formatDateForDatabase(dataNasc),
          fone_patients: telefone,
          sexo_patients: sexo,
          cep_patients: removeCEPFormat(cep),
          uf_patients: uf,
          cidade_patients: cidade,
          endereco_patients: endereco,
          numero_endereco_patients: numero,
          doctor_id: doctorId,
          created_at: new Date().toISOString(),
          // updated_at: new Date().toISOString(), // Removed as it is not a known property
        })
        .execute();

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
      router.replace(`/patients/${removeCPFMask(cpf)}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleDataNascChange = (value: string) => {
    setDataNasc(value);
    const idadeCalculada = calcularIdade(new Date(value));
    setIdade(idadeCalculada);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}
        <Text style={styles.header}>Cadastro do Paciente</Text>

        {/* Informações Pessoais */}
        <Text style={styles.sectionTitle}>Informações pessoais:</Text>
        <TextInput
          placeholder="Nome Completo: (obrigatório)"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="CPF da criança ou do responsável (obrigatório)"
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Data nascimento: (obrigatório)"
          value={dataNasc}
          onChangeText={handleDataNascChange}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput placeholder="Idade:" value={idade} editable={false} style={styles.input} />

        <View style={styles.row}>
          <TextInput
            placeholder="Celular:"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.inputSmall}
            keyboardType="phone-pad"
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sexo}
              style={styles.picker}
              onValueChange={(itemValue) => setSexo(itemValue)}>
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
            </Picker>
          </View>
        </View>

        {/* Endereço */}
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Endereço:</Text>
          <CEPInput
            cep={cep}
            setCep={setCep}
            onAddressFound={(data) => {
              setUf(data.uf);
              setCidade(data.localidade);
              setEndereco(data.logradouro);
            }}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Logradouro"
            value={endereco}
            onChangeText={setEndereco}
            style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            style={styles.inputSmall}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <TextInput placeholder="UF" value={uf} onChangeText={setUf} style={styles.inputSmall} />
          <TextInput
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
            style={styles.inputSmall}
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.replace('./home')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CadastroPaciente;
