import { useRouter, useSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { ATTENDANCES_TABLE } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

const CadastroProntuario = () => {
  const { paciente } = useSearchParams(); // Pegando o estado do paciente diretamente
  const router = useRouter();
  const { db, supabaseConnector } = useSystem();

  // Estado para os campos da tabela attendances
  const [peso, setPeso] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [taxMae, setTaxMae] = useState('');
  const [pesoMae, setPesoMae] = useState('');
  const [estaturaMae, setEstaturaMae] = useState('');
  const [paMae, setPaMae] = useState('');
  const [tipoSangMae, setTipoSangMae] = useState('');
  const [apgar1, setApgar1] = useState('');
  const [apgar5, setApgar5] = useState('');
  const [pc, setPc] = useState('');
  const [gesta, setGesta] = useState('');
  const [para, setPara] = useState('');
  const [cesareas, setCesareas] = useState('');
  const [abortos, setAbortos] = useState('');
  const [abotEspon, setAbotEspon] = useState('');
  const [vacinasMae, setVacinasMae] = useState('');
  const [nascVivos, setNascVivos] = useState('');
  const [mortNeo, setMortNeo] = useState('');
  const [filhos, setFilhos] = useState('');
  const [intern, setIntern] = useState('');
  const [cirg, setCirg] = useState('');
  const [quantCirg, setQuantCirg] = useState('');
  const [consulPre, setConsulPre] = useState('');
  const [quantConsulPre, setQuantConsulPre] = useState('');
  const [tratMae, setTratMae] = useState('');
  const [descrMae, setDescrMae] = useState('');

  const handleCadastro = async () => {
    try {
      const { userID } = await supabaseConnector.fetchCredentials();
      const doctorName = 'Dr. Fulano'; // Nome do médico autenticado (ajuste conforme necessário)

      await db
        .insertInto(ATTENDANCES_TABLE)
        .values({
          id: uuid(),
          patient_id: paciente.id, // ID do paciente
          doctor_id: userID,
          doctor_name: doctorName,
          created_by: userID,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          peso,
          comprimento,
          tax_mae: taxMae,
          peso_mae: pesoMae,
          estatura_mae: estaturaMae,
          pa_mae: paMae,
          tipo_sang_mae: tipoSangMae,
          apgar_1: apgar1,
          apgar_5: apgar5,
          pc,
          gesta,
          para,
          cesareas,
          abortos,
          abot_espon: abotEspon,
          vacinas_mae: vacinasMae,
          nasc_vivos: nascVivos,
          mort_neo: mortNeo,
          filhos,
          intern,
          cirg,
          quant_cirg: quantCirg,
          consul_pre: consulPre,
          quant_consul_pre: quantConsulPre,
          trat_mae: tratMae,
          descr_mae: descrMae,
        })
        .execute();

      Alert.alert('Sucesso', 'Prontuário cadastrado com sucesso');
      router.push('/home/');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao cadastrar prontuário.');
      console.error('Erro ao cadastrar prontuário:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cadastrar Prontuário</Text>

      <TextInput
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Comprimento (cm)"
        value={comprimento}
        onChangeText={setComprimento}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Taxa da mãe"
        value={taxMae}
        onChangeText={setTaxMae}
        style={styles.input}
      />
      <TextInput
        placeholder="Peso da mãe (kg)"
        value={pesoMae}
        onChangeText={setPesoMae}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Estatura da mãe (cm)"
        value={estaturaMae}
        onChangeText={setEstaturaMae}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="PA da mãe"
        value={paMae}
        onChangeText={setPaMae}
        style={styles.input}
      />
      <TextInput
        placeholder="Tipo sanguíneo da mãe"
        value={tipoSangMae}
        onChangeText={setTipoSangMae}
        style={styles.input}
      />
      <TextInput
        placeholder="Apgar 1 min"
        value={apgar1}
        onChangeText={setApgar1}
        style={styles.input}
      />
      <TextInput
        placeholder="Apgar 5 min"
        value={apgar5}
        onChangeText={setApgar5}
        style={styles.input}
      />
      <TextInput
        placeholder="Perímetro cefálico (cm)"
        value={pc}
        onChangeText={setPc}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Número de gestações"
        value={gesta}
        onChangeText={setGesta}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de partos"
        value={para}
        onChangeText={setPara}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de cesáreas"
        value={cesareas}
        onChangeText={setCesareas}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de abortos"
        value={abortos}
        onChangeText={setAbortos}
        style={styles.input}
      />
      <TextInput
        placeholder="Abortos espontâneos"
        value={abotEspon}
        onChangeText={setAbotEspon}
        style={styles.input}
      />
      <TextInput
        placeholder="Vacinas da mãe"
        value={vacinasMae}
        onChangeText={setVacinasMae}
        style={styles.input}
      />
      <TextInput
        placeholder="Nascidos vivos"
        value={nascVivos}
        onChangeText={setNascVivos}
        style={styles.input}
      />
      <TextInput
        placeholder="Mortalidade neonatal"
        value={mortNeo}
        onChangeText={setMortNeo}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de filhos"
        value={filhos}
        onChangeText={setFilhos}
        style={styles.input}
      />
      <TextInput
        placeholder="Internações"
        value={intern}
        onChangeText={setIntern}
        style={styles.input}
      />
      <TextInput placeholder="Cirurgias" value={cirg} onChangeText={setCirg} style={styles.input} />
      <TextInput
        placeholder="Quantidade de cirurgias"
        value={quantCirg}
        onChangeText={setQuantCirg}
        style={styles.input}
      />
      <TextInput
        placeholder="Consultas pré-natais"
        value={consulPre}
        onChangeText={setConsulPre}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade de consultas pré-natais"
        value={quantConsulPre}
        onChangeText={setQuantConsulPre}
        style={styles.input}
      />
      <TextInput
        placeholder="Tratamentos da mãe"
        value={tratMae}
        onChangeText={setTratMae}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição da mãe"
        value={descrMae}
        onChangeText={setDescrMae}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Salvar Prontuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
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

export default CadastroProntuario;
