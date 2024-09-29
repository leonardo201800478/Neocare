// app/patients/register.tsx
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
import { useSystem } from '../../powersync/PowerSync';
import {
  formatDateForDatabase,
  formatCPF,
  removeCPFMask,
  removeCEPFormat,
  formatPhoneNumber,
  countryCodes,
} from '../../utils/formatUtils';
import { calcularIdade } from '../../utils/idadeCalculator';
import { uuid } from '../../utils/uuid';
import styles from '../styles/CadastroPacienteStyles';

const CadastroPaciente = () => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('Masculino');
  const [idade, setIdade] = useState('');
  const [telefone, setTelefone] = useState('');
  const [codigoPais, setCodigoPais] = useState('+55'); // Código do país, default Brasil
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const router = useRouter();
  const { supabaseConnector, powersync } = useSystem();

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

    // Formatar o telefone no formato +00-00-00000-0000
    const formattedPhoneNumber = formatPhoneNumber(codigoPais, telefone);

    try {
      // Obtendo o ID do usuário conectado
      const { userID } = await supabaseConnector.fetchCredentials();

      const newPatient = {
        id: uuid(),
        name: nome,
        cpf: removeCPFMask(cpf),
        birth_date: formatDateForDatabase(dataNasc),
        phone_number: formattedPhoneNumber,
        gender: sexo,
        zip_code: removeCEPFormat(cep),
        uf,
        city: cidade,
        address: endereco,
        created_by: userID, // Relacionando o paciente ao médico criador
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('Dados do paciente sendo enviados para o Supabase:', newPatient);

      // Inserir o paciente diretamente via Supabase client
      const { data, error } = await supabaseConnector.client.from('patients').insert([newPatient]);

      if (error) {
        throw error;
      }

      console.log('Dados inseridos no Supabase:', data);
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
      router.replace(`/home/`);
    } catch (error) {
      console.error('Erro ao cadastrar o paciente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o paciente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDataNascChange = (value: string) => {
    if (value.length === 8) {
      const formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
      setDataNasc(formattedValue);
      const birthDate = new Date(
        parseInt(value.slice(4), 10), // ano
        parseInt(value.slice(2, 4), 10) - 1, // mês (0-11)
        parseInt(value.slice(0, 2), 10) // dia
      );
      const idadeCalculada = calcularIdade(birthDate);
      setIdade(idadeCalculada);
    } else {
      setDataNasc(value);
    }
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
          placeholder="Data nascimento (ddmmaaaa): (obrigatório)"
          value={dataNasc}
          onChangeText={handleDataNascChange}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput placeholder="Idade:" value={idade} editable={false} style={styles.input} />

        {/* Telefone com Código do País */}
        <View style={styles.row}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={codigoPais}
              style={styles.picker}
              onValueChange={(itemValue) => setCodigoPais(itemValue)}>
              {countryCodes.map(({ code, country }) => (
                <Picker.Item key={code} label={`${country} ${code}`} value={code} />
              ))}
            </Picker>
          </View>
          <TextInput
            placeholder="Telefone:"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.inputSmall}
            keyboardType="phone-pad"
          />
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
          <TouchableOpacity style={styles.button} onPress={() => router.replace('/home/')}>
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
