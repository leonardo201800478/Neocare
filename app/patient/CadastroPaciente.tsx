// app/patient/CadastroPaciente.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CEPInput from '../components/CEPInput';
import { isCPFValid } from '../components/CPFValidator';
import styles from '../styles/CadastroPacienteStyles';
import {
  formatDateForDatabase,
  formatCPF,
  removeCPFMask,
  formatCEP,
  removeCEPFormat,
} from '../utils/formatUtils';
import { useSystem } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';
import { calcularIdade } from '../utils/idadeCalculator'; // Função para calcular idade

const CadastroPaciente = () => {
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [sexo, setSexo] = useState('Masculino'); // Default para Masculino
  const [idade, setIdade] = useState(''); // Idade calculada
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState(''); // Estado (UF)
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

    // Validação do CPF
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
          email_patients: email,
          fone_patients: telefone,
          sexo_patients: sexo,
          cep_patients: removeCEPFormat(cep),
          uf_patients: uf,
          cidade_patients: cidade,
          endereco_patients: endereco,
          numero_endereco_patients: numero,
          doctor_id: doctorId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .execute();

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
      router.replace(`/patient/${removeCPFMask(cpf)}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressFound = (data: any) => {
    setUf(data.uf);
    setCidade(data.localidade);
    setEndereco(data.logradouro);
  };

  const handleDataNascChange = (value: string) => {
    setDataNasc(value);
    const idadeCalculada = calcularIdade(new Date(value)); // Calcula a idade automaticamente
    setIdade(idadeCalculada);
  };

  function formatTelefone(text: string): React.SetStateAction<string> {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      <Text style={styles.header}>Cadastro do Paciente</Text>
      <TextInput
        placeholder="Nome (obrigatório)"
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
        placeholder="Data de nascimento (obrigatório)"
        value={dataNasc}
        onChangeText={handleDataNascChange}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Idade (calculada automaticamente)"
        value={idade}
        editable={false}
        style={styles.input}
      />

      <View style={styles.row}>
        <Picker
          selectedValue={sexo}
          style={styles.picker}
          onValueChange={(itemValue) => setSexo(itemValue)}>
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
        </Picker>
      </View>

      <TextInput
        placeholder="Celular"
        value={telefone}
        onChangeText={(text) => setTelefone(formatTelefone(text))}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <CEPInput onAddressFound={handleAddressFound} />

      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
          style={styles.inputSmall}
          keyboardType="numeric" // Aceita apenas números
        />
      </View>

      <Picker
        selectedValue={uf}
        style={styles.picker}
        onValueChange={(itemValue) => setUf(itemValue)}>
        {/* Lista de UFs */}
        {[
          'AC',
          'AL',
          'AM',
          'AP',
          'BA',
          'CE',
          'DF',
          'ES',
          'GO',
          'MA',
          'MG',
          'MS',
          'MT',
          'PA',
          'PB',
          'PE',
          'PI',
          'PR',
          'RJ',
          'RN',
          'RO',
          'RR',
          'RS',
          'SC',
          'SE',
          'SP',
          'TO',
        ].map((uf) => (
          <Picker.Item key={uf} label={uf} value={uf} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroPaciente;
