// screens/retorno/malaria.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RetornoMalaria() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>MALÁRIA, PROVÁVEL MALÁRIA OU MALÁRIA POUCO PROVÁVEL</Text>

        <Text style={styles.content}>
          Se, depois de três dias, a febre persistir ou se retornar dentro de 14 dias*:
          {'\n'}- Fazer uma reavaliação completa da criança. Consultar o quadro AVALIAR E
          CLASSIFICAR e determinar se há outras causas para a febre.
          {'\n'}- Se a criança retorna para receber resultado da gota espessa:
          {'\n'}- Se o exame for positivo, tratar conforme resultado da gota espessa (consultar
          quadro no módulo Tratar a Criança).
          {'\n'}- Se o exame for negativo, tratar outras causas para a febre. Caso não possa
          resolver na unidade de saúde, referir a criança ao hospital.
        </Text>

        <Text style={styles.content}>
          Se a criança fez exame de gota espessa, e houve confirmação de malária na primeira
          consulta:
          {'\n'}* Verificar se tomou corretamente a medicação ou se apresentou diarreia ou vômitos.
          Se ocorreu uma dessas situações, reiniciar tratamento.
          {'\n'}* Se não ocorreu essas situações, repetir o exame de gota espessa para verificar a
          possibilidade de malária mista. Se o exame der positivo para outra espécie de Plasmodium,
          iniciar o esquema recomendado para malária mista (P. falciparum e P. vivax). Se o exame
          não der positivo para outro tipo de Plasmodium, pode significar que a criança tenha uma
          malária resistente, devendo ser encaminhada para um Centro de Referência para Tratamento
          de Malária. Se a criança não fez exame de sangue, referi-la para fazer exame.
        </Text>

        <Text style={styles.subtitle}>Tratamento:</Text>

        <Text style={styles.content}>
          Se a criança apresentar qualquer sinal geral de perigo ou rigidez de nuca, tratar como
          MALÁRIA GRAVE OU DOENÇA FEBRIL MUITO GRAVE. Tratar com antimalárico recomendado para
          malária grave (P. falciparum pelo risco de evolução grave), somente após confirmação
          através do exame de gota espessa.
        </Text>

        <Text style={styles.content}>
          Se a criança apresentar MALÁRIA MISTA confirmada através de um novo exame de gota espessa,
          iniciar tratamento recomendado.
        </Text>

        <Text style={styles.content}>
          Se a criança apresentar qualquer outra causa para a febre que não seja malária, tratar. Se
          a febre persistir há sete dias, referir para avaliação hospitalar.
        </Text>

        <Text style={styles.content}>
          * Os casos de malária por P. falciparum deverão realizar novas lâminas de verificação de
          cura (LVC) nos dias 3, 7, 14, 28 e 35, considerando-se como dia zero o dia do início do
          tratamento.
        </Text>

        {/* Botão "Voltar" */}
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Fundo branco
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Cor vermelha para o título
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Texto preto
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#000000', // Texto preto
    textAlign: 'justify',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Verde escuro para o botão "Voltar"
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
