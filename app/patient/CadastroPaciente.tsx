// app/patient/CadastroPaciente.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import styles from '../styles/CadastroPacienteStyles';
import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';
import {
  formatDateForDatabase,
  formatCPF,
  removeCPFMask,
  formatCEP,
  removeCEPFormat,
} from '../utils/formatUtils';
import { isCPFValid } from '../components/CPFValidator';
import CEPInput from '../components/CEPInput';

const CadastroPaciente = () => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();

  const handleCadastro = async () => {
    setLoading(true);
    if (!nome || !cpf || !dataNasc || !email || !telefone) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos');
      setLoading(false);
      return;
    }

    // Validação do CPF
    if (!isCPFValid(cpf)) {
      Alert.alert('Erro', 'CPF inválido');
      setLoading(false);
      return;
    }

    // Validação de e-mail
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'E-mail inválido');
      setLoading(false);
      return;
    }

    try {
      const { userID } = await supabaseConnector.fetchCredentials(); // Pegando as credenciais do usuário logado
      const doctorId = userID; // Pegando o id do médico logado

      // Salvando o paciente na tabela patients
      await db
        .insertInto('patients')
        .values({
          id: uuid(), // Usando a função uuid para gerar o ID
          nome_patients: nome,
          cpf_patients: removeCPFMask(cpf), // Armazenando CPF sem máscara
          data_nasc_patients: formatDateForDatabase(dataNasc), // Formatando a data para aaaa-mm-dd
          email_patients: email,
          fone_patients: telefone,
          cep_patients: removeCEPFormat(cep),
          uf_patients: uf,
          cidade_patients: cidade,
          endereco_patients: endereco,
          doctor_id: doctorId, // Vinculando o id do médico logado
          created_at: new Date().toISOString(),
          inserted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute();

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');

      // Redireciona automaticamente para a tela de detalhes do paciente
      router.replace(`/patient/${removeCPFMask(cpf)}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o paciente');
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar o telefone no formato (DDD) xxx-xxxxxx
  const formatTelefone = (value: string) => {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 10) {
      return onlyNums.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return onlyNums;
  };

  // Função para adicionar máscara à data de nascimento no formato dd/mm/aaaa
  const formatDataNasc = (value: string) => {
    const onlyNums = value.replace(/\D/g, '');
    if (onlyNums.length <= 8) {
      return onlyNums.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    }
    return onlyNums;
  };

  const handleAddressFound = (data: any) => {
    setUf(data.uf);
    setCidade(data.localidade);
    setEndereco(data.logradouro);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      <Text style={styles.header}>Dados do Paciente</Text>
      <TextInput placeholder="Nome*" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        placeholder="CPF da criança ou do responsável*"
        value={cpf}
        onChangeText={(text) => setCpf(formatCPF(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Data nascimento*"
        value={dataNasc}
        onChangeText={(text) => setDataNasc(formatDataNasc(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.row}>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.inputSmall}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(formatTelefone(text))}
          style={styles.inputSmall}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.row}>
        <CEPInput onAddressFound={handleAddressFound} />
      </View>
      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />
      <View style={styles.row}>
        <TextInput
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
          style={styles.inputSmall}
        />
        <TextInput placeholder="UF" value={uf} onChangeText={setUf} style={styles.inputSmall} />
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CadastroPaciente;
