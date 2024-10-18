import DateTimePicker from '@react-native-community/datetimepicker';
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
  Platform,
} from 'react-native';

import styles from './styles/ModernStyles'; // Arquivo de estilo fornecido
import CEPInput from '../../../components/CEPInput';
import { isCPFValid } from '../../../components/CPFValidator';
import {
  formatDateForDatabase,
  formatCPF,
  removeCPFMask,
  removeCEPFormat,
  formatPhoneNumber,
  countryCodes,
} from '../../../utils/formatUtils';
import { calcularIdade } from '../../../utils/idadeCalculator';
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';

const CadastroPaciente: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [dataNasc, setDataNasc] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [sexo, setSexo] = useState<string>('Masculino');
  const [idade, setIdade] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [codigoPais, setCodigoPais] = useState<string>('+55');
  const [cep, setCep] = useState<string>('');
  const [uf, setUf] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const router = useRouter();

  const { createPatient } = usePatient();
  const { selectedDoctor } = useDoctor();

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

    const cleanedCEP = removeCEPFormat(cep);
    if (cleanedCEP.length !== 8) {
      Alert.alert('Erro', 'CEP inválido. Deve conter 8 dígitos.');
      setLoading(false);
      return;
    }

    const formattedPhoneNumber = formatPhoneNumber(codigoPais, telefone);

    try {
      if (!selectedDoctor?.id) {
        throw new Error('Erro ao obter o ID do médico logado.');
      }

      const newPatient = {
        name: nome,
        cpf: removeCPFMask(cpf),
        birth_date: formatDateForDatabase(dataNasc!.toISOString().split('T')[0]), // Formata a data para YYYY-MM-DD
        phone_number: formattedPhoneNumber,
        gender: sexo,
        zip_code: cleanedCEP,
        uf,
        city: cidade,
        address: `${endereco}, ${numero}`,
      };

      console.log('Dados do paciente a serem criados:', newPatient);

      await createPatient(newPatient, selectedDoctor.id);

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso');
      router.replace(`/(tabs)/patients/PacienteDetails`);
    } catch (error) {
      console.error('Erro ao cadastrar o paciente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o paciente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDataNascChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDataNasc(selectedDate);
      const idadeCalculada = calcularIdade(selectedDate, 'years');
      setIdade(idadeCalculada);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}
        <Text style={styles.header}>Cadastro do Paciente</Text>

        <TextInput
          placeholder="Nome Completo: (obrigatório)"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholderTextColor="#ccc"
        />
        <TextInput
          placeholder="CPF da criança ou do responsável (obrigatório)"
          value={cpf}
          onChangeText={(text) => setCpf(formatCPF(text))}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#ccc"
        />

        {/* Campo de Data de Nascimento com DatePicker */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            placeholder="Data de nascimento: (obrigatório)"
            value={dataNasc ? dataNasc.toLocaleDateString() : ''}
            editable={false}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dataNasc || new Date()}
            mode="date"
            display="default"
            onChange={handleDataNascChange}
            maximumDate={new Date()} // Limita a seleção de data para o presente ou passado
          />
        )}

        <TextInput
          placeholder="Idade:"
          placeholderTextColor="#FFF"
          value={idade}
          editable={false}
          style={styles.inputIdade}
        />

        <View style={styles.pickerContainerSexo}>
          <Picker
            selectedValue={sexo}
            style={styles.picker}
            onValueChange={(itemValue) => setSexo(itemValue)}>
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
          </Picker>
        </View>

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
            style={styles.inputCel}
            keyboardType="phone-pad"
            placeholderTextColor="#ccc"
          />
        </View>

        <View style={styles.containerCEP}>
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
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            style={styles.inputSmall}
            keyboardType="numeric"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="UF"
            value={uf}
            onChangeText={setUf}
            style={styles.inputSmall}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
            style={styles.inputSmall}
            placeholderTextColor="#ccc"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/home/')}>
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
