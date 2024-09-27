import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { Database, ATTENDANCES_TABLE, PATIENTS_TABLE } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';

const AttendanceDetails = () => {
  const router = useRouter();
  const { cpf } = useLocalSearchParams<{ cpf: string }>(); // Especificar a tipagem correta para cpf
  const { db } = useSystem();
  const [attendance, setAttendance] = useState<Database[typeof ATTENDANCES_TABLE] | null>(null);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<Database[typeof PATIENTS_TABLE] | null>(null);

  useEffect(() => {
    if (cpf) {
      loadAttendanceData();
    } else {
      Alert.alert('Erro', 'CPF inválido ou não fornecido.');
      router.replace('/home/');
    }
  }, [cpf]);

  const loadAttendanceData = async () => {
    setLoading(true);
    try {
      const patientData = await db
        .selectFrom(PATIENTS_TABLE)
        .selectAll()
        .where('cpf_patients', '=', cpf)
        .execute();

      if (patientData.length > 0) {
        setPatient(patientData[0]);

        const attendanceData = await db
          .selectFrom(ATTENDANCES_TABLE)
          .selectAll()
          .where('patient_id', '=', patientData[0].id)
          .orderBy('updated_at', 'desc')
          .execute();

        if (attendanceData.length > 0) {
          setAttendance(attendanceData[0]);
        }
      } else {
        Alert.alert('Erro', 'Paciente não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do prontuário:', error);
      Alert.alert('Erro', 'Erro ao carregar prontuário.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#A700FF" />;
  }

  return (
    <View style={styles.container}>
      {patient ? (
        <>
          <Text style={styles.header}>Dados do Paciente</Text>
          <Text style={styles.text}>Nome: {patient.nome_patients}</Text>
          <Text style={styles.text}>CPF: {patient.cpf_patients}</Text>
          <Text style={styles.text}>Data de Nascimento: {patient.data_nasc_patients}</Text>
          <Text style={styles.text}>Telefone: {patient.fone_patients}</Text>
          <Text style={styles.text}>
            Endereço:{' '}
            {`${patient.endereco_patients}, ${patient.cidade_patients} - ${patient.uf_patients}`}
          </Text>

          {attendance ? (
            <>
              <Text style={styles.header}>Último Prontuário</Text>
              <Text style={styles.text}>Médico: {attendance.doctor_name}</Text>
              <Text style={styles.text}>Peso: {attendance.peso} kg</Text>
              <Text style={styles.text}>Altura: {attendance.comprimento} cm</Text>
              <Text style={styles.text}>
                Data da última consulta:{' '}
                {attendance.updated_at
                  ? new Date(attendance.updated_at).toLocaleDateString()
                  : 'Data não disponível'}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>Nenhum prontuário encontrado.</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (patient.cpf_patients) {
                router.push({
                  pathname: '/attendences/[cpf]', // Corrigido para [cpf] dinâmico
                  params: { cpf: patient.cpf_patients }, // Certificando que cpf é string
                });
              } else {
                Alert.alert('Erro', 'CPF não disponível.');
              }
            }}>
            <Text style={styles.buttonText}>Cadastrar Novo Prontuário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/home/')}>
            <Text style={styles.buttonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.text}>Paciente não encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#A700FF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AttendanceDetails;
