// app/(tabs)/about/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Sobre o Neocare</Text>

        <View style={styles.content}>
          <Text style={styles.paragraph}>
            O aplicativo Neocare foi desenvolvido para auxiliar profissionais de saúde no
            acompanhamento de pacientes neonatais. Ele é uma ferramenta poderosa e flexível, que
            permite o registro, acompanhamento e monitoramento de neonatos, com foco especial em
            regiões remotas e de difícil acesso, onde a conectividade à internet pode ser limitada.
          </Text>

          <Text style={styles.itemTitle}>1. Cadastro de Pacientes</Text>
          <Text style={styles.paragraph}>
            Utilize a opção de "Novo Paciente" para cadastrar um novo neonato. Preencha as
            informações básicas, como nome, idade, peso e altura. A aplicação oferece uma
            experiência simples e eficiente, adaptada para ser usada tanto online quanto offline.
          </Text>

          <Text style={styles.itemTitle}>2. Acompanhamento de Vacinas</Text>
          <Text style={styles.paragraph}>
            O Neocare permite o acompanhamento completo do histórico de vacinas aplicadas a cada
            paciente. Na aba de "Vacinas", você poderá adicionar, visualizar e acompanhar as doses
            aplicadas, conforme as diretrizes recomendadas.
          </Text>

          <Text style={styles.itemTitle}>3. Consulta de Prontuários</Text>
          <Text style={styles.paragraph}>
            Na aba de "Prontuários", acesse o histórico de consultas, diagnósticos e prescrições
            realizadas para cada paciente. Este recurso facilita o acompanhamento e o planejamento
            de cuidados médicos contínuos.
          </Text>

          <Text style={styles.itemTitle}>4. Funcionalidade Offline</Text>
          <Text style={styles.paragraph}>
            Em regiões sem acesso à internet, o Neocare continua a funcionar normalmente, permitindo
            que os profissionais de saúde insiram e acessem informações essenciais dos pacientes. Ao
            se reconectar à internet, o aplicativo sincroniza automaticamente todos os dados com a
            nuvem.
          </Text>

          <Text style={styles.itemTitle}>5. Sincronização de Dados</Text>
          <Text style={styles.paragraph}>
            Após restabelecer a conexão à internet, o aplicativo sincroniza automaticamente os
            dados, garantindo que todas as informações dos pacientes estejam atualizadas e seguras
            na nuvem.
          </Text>

          <Text style={styles.footer}>
            Para mais informações detalhadas sobre o uso do aplicativo, acesse o manual completo ou
            entre em contato com nossa equipe de suporte. O Neocare está sempre em evolução para
            fornecer a melhor experiência aos profissionais de saúde neonatal.
          </Text>
        </View>

        {/* Botão para retornar à tela inicial */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/home')}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.backText}>Voltar para Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    paddingBottom: 40, 
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1B5E20',
  },
  content: {
    paddingVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  footer: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
    color: '#4CAF50',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});
