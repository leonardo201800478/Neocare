import { Ionicons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSystem } from '../../powersync/PowerSync';

export default function Terms() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const { supabaseConnector } = useSystem();

  const handleAccept = async () => {
    if (!accepted) {
      Alert.alert('Erro', 'Você precisa aceitar os termos para continuar.');
      return;
    }

    const {
      data: { user },
    } = await supabaseConnector.client.auth.getUser();
    if (user) {
      // Atualiza o campo 'terms_accepted' na tabela 'doctors'
      const { error } = await supabaseConnector.client
        .from('doctors')
        .update({ terms_accepted: '1' })
        .eq('auth_user_id', user.id);

      if (error) {
        Alert.alert('Erro', 'Não foi possível atualizar o status de aceite dos termos.');
      } else {
        // Redireciona o usuário para a tela principal
        router.push('/(tabs)/home/HomeScreen');
      }
    } else {
      Alert.alert('Erro', 'Usuário não autenticado.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>
          Termos de Consentimento e Aceite para o Uso de Dados em Neocare
        </Text>

        <Text style={styles.sectionTitle}>1. Introdução</Text>
        <Text style={styles.paragraph}>
          O aplicativo Neocare ("Aplicativo") é uma ferramenta desenvolvida para auxiliar médicos e
          profissionais de saúde no atendimento e acompanhamento de pacientes neonatais. A proteção
          dos dados pessoais, especialmente os dados sensíveis de saúde, é de extrema importância.
          Por isso, este termo de consentimento segue os princípios da Lei Geral de Proteção de
          Dados Pessoais (LGPD) – Lei nº 13.709/2018. Ao utilizar o Neocare, você, profissional da
          saúde, concorda com os termos e condições descritos neste documento.
        </Text>

        <Text style={styles.sectionTitle}>2. Coleta e Tratamento de Dados Pessoais</Text>
        <Text style={styles.subsectionTitle}>2.1. Dados Coletados</Text>
        <Text style={styles.paragraph}>
          O Neocare coleta e processa dados pessoais dos pacientes, inseridos por médicos e
          profissionais de saúde, incluindo:
        </Text>
        <Text style={styles.listItem}>
          • Dados de Identificação dos Pacientes: Nome, CPF, data de nascimento, gênero, endereço,
          telefone e dados relacionados ao responsável pelo paciente.
        </Text>
        <Text style={styles.listItem}>
          • Dados de Saúde: Informações médicas relevantes, incluindo prontuários, sinais vitais,
          sintomas, diagnósticos, tratamentos, vacinação e acompanhamento nutricional e de
          desenvolvimento.
        </Text>
        <Text style={styles.listItem}>
          • Dados de Atendimentos: Histórico de consultas, datas e detalhes de atendimento,
          medicamentos prescritos e dosagens.
        </Text>
        <Text style={styles.listItem}>
          • Dados Profissionais: Identificação do médico ou profissional responsável pelo
          atendimento.
        </Text>

        <Text style={styles.subsectionTitle}>2.2. Finalidade do Tratamento</Text>
        <Text style={styles.paragraph}>Os dados coletados têm como finalidades:</Text>
        <Text style={styles.listItem}>
          • A prestação de serviços de saúde aos pacientes neonatais, permitindo o acompanhamento
          adequado e eficiente de cada caso.
        </Text>
        <Text style={styles.listItem}>
          • A criação de prontuários e relatórios médicos para melhorar a qualidade do atendimento.
        </Text>
        <Text style={styles.listItem}>
          • A realização de estudos e análises estatísticas, sempre de forma anônima, para fins de
          pesquisa científica na área de saúde neonatal.
        </Text>

        <Text style={styles.sectionTitle}>3. Compartilhamento de Dados</Text>
        <Text style={styles.paragraph}>
          Os dados dos pacientes coletados no Neocare poderão ser acessados e compartilhados
          exclusivamente com:
        </Text>
        <Text style={styles.listItem}>
          • Profissionais de saúde responsáveis pelo acompanhamento e atendimento do paciente.
        </Text>
        <Text style={styles.listItem}>
          • Autoridades sanitárias e reguladoras, conforme exigido por lei ou para garantir o
          cumprimento de obrigações legais e regulatórias.
        </Text>
        <Text style={styles.paragraph}>
          Em nenhum momento os dados serão compartilhados com terceiros sem o devido consentimento
          do profissional de saúde responsável, exceto em situações de emergência médica ou por
          determinação judicial.
        </Text>

        <Text style={styles.sectionTitle}>4. Segurança dos Dados</Text>
        <Text style={styles.paragraph}>
          O Neocare implementa medidas de segurança técnicas e administrativas adequadas para
          proteger os dados pessoais dos pacientes contra acessos não autorizados, destruição,
          perda, alteração, ou qualquer outro tratamento irregular.
        </Text>

        <Text style={styles.sectionTitle}>5. Direitos dos Pacientes</Text>
        <Text style={styles.paragraph}>
          Conforme a LGPD, os pacientes têm o direito de solicitar:
        </Text>
        <Text style={styles.listItem}>• Acesso aos dados coletados sobre eles.</Text>
        <Text style={styles.listItem}>
          • Correção de dados pessoais incompletos, inexatos ou desatualizados.
        </Text>
        <Text style={styles.listItem}>
          • Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em
          desconformidade com a LGPD.
        </Text>
        <Text style={styles.listItem}>
          • Portabilidade dos dados a outro prestador de serviço de saúde, mediante requisição
          expressa e por meios seguros.
        </Text>

        <Text style={styles.sectionTitle}>6. Responsabilidade dos Profissionais de Saúde</Text>
        <Text style={styles.paragraph}>
          Os profissionais de saúde que utilizam o Neocare comprometem-se a utilizar a plataforma de
          forma ética e responsável, respeitando o sigilo médico e a privacidade dos pacientes.
        </Text>

        <Text style={styles.sectionTitle}>7. Alterações nos Termos de Consentimento</Text>
        <Text style={styles.paragraph}>
          O Neocare reserva-se o direito de atualizar estes Termos de Consentimento e Aceite
          periodicamente, conforme necessário para garantir conformidade com leis e regulamentos
          vigentes.
        </Text>

        <Text style={styles.sectionTitle}>8. Contato</Text>
        <Text style={styles.paragraph}>
          Para dúvidas ou solicitações sobre estes termos ou o tratamento de dados pessoais no
          Neocare, entre em contato com nossa equipe de suporte através do e-mail [email de contato]
          ou pelo telefone [número de contato].
        </Text>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={accepted}
            onValueChange={(newValue: boolean) => setAccepted(newValue)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Eu li e aceito os Termos de Consentimento</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.acceptButton, !accepted && styles.disabledButton]}
            onPress={handleAccept}
            disabled={!accepted}>
            <Text style={styles.buttonText}>Aceitar e Continuar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botão "Voltar" no Final da Página */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/home/HomeScreen')}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#4CAF50',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#388E3C',
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 15,
    lineHeight: 22,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 10,
    lineHeight: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});
