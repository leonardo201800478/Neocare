// app/vaccines/RegisterVaccination.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para os ícones de incremento e decremento

import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/VaccinationStyles';

const vaccineList = [
  'BCG',
  'Hepatite B',
  'Rotavírus',
  'Tríplice bacteriana (DTP)',
  'Haemophilus influenzae B (Hib)',
  'Poliomielite (VIP)',
  'Pneumocócica conjugada',
  'Meningocócica conjugada C',
  'Meningocócica B',
  'Influenza',
  'Febre Amarela',
  'Hepatite A',
  'Tríplice viral (SCR)',
  'Varicela',
  'HPV',
  'Dengue',
  'Covid-19',
];

const RegisterVaccination = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams();
  const parsedPatient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const { supabaseConnector } = useSystem();
  const [vaccines, setVaccines] = useState<{ [key: string]: number }>({}); // Armazena vacina e número da dose

  useEffect(() => {
    // Buscar vacinas atuais do paciente
    if (parsedPatient) {
      const fetchVaccinations = async () => {
        try {
          const { data, error } = await supabaseConnector.client
            .from('vaccinations')
            .select('*')
            .eq('patient_id', parsedPatient.id);

          if (error) {
            console.error('Erro ao buscar vacinas:', error);
            Alert.alert('Erro', 'Erro ao buscar vacinas do paciente.');
          } else {
            // Atualizar doses de vacinas no estado
            const vaccineData: { [key: string]: number } = {};
            data.forEach((vaccine: any) => {
              if (vaccineData[vaccine.vaccine_name]) {
                vaccineData[vaccine.vaccine_name] += 1;
              } else {
                vaccineData[vaccine.vaccine_name] = 1;
              }
            });
            setVaccines(vaccineData);
          }
        } catch (error) {
          console.error('Erro ao buscar vacinas:', error);
          Alert.alert('Erro', 'Erro ao buscar vacinas do paciente.');
        }
      };

      fetchVaccinations();
    }
  }, [parsedPatient]);

  const handleRegister = async (vaccineName: string, dose: number) => {
    if (!parsedPatient) {
      Alert.alert('Erro', 'Paciente não encontrado.');
      return;
    }

    try {
      const { error } = await supabaseConnector.client.from('vaccinations').insert({
        patient_id: parsedPatient.id,
        vaccine_name: vaccineName,
        dose_number: dose,
        administered_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Erro ao cadastrar vacina:', error);
        Alert.alert('Erro', 'Erro ao cadastrar vacina.');
      } else {
        Alert.alert('Sucesso', `Vacina ${vaccineName} (Dose ${dose}) cadastrada com sucesso!`);
        setVaccines((prevVaccines) => ({
          ...prevVaccines,
          [vaccineName]: dose,
        }));
      }
    } catch (error) {
      console.error('Erro ao cadastrar vacina:', error);
      Alert.alert('Erro', 'Erro ao cadastrar vacina.');
    }
  };

  // Incrementa a dose da vacina no estado e tenta registrar
  const handleIncrement = (vaccineName: string) => {
    const currentDose = vaccines[vaccineName] ? vaccines[vaccineName] + 1 : 1;
    handleRegister(vaccineName, currentDose);
  };

  // Decrementa a dose da vacina no estado e exclui do banco de dados
  const handleDecrement = async (vaccineName: string) => {
    if (!parsedPatient || !vaccines[vaccineName] || vaccines[vaccineName] <= 0) {
      return;
    }

    const currentDose = vaccines[vaccineName];

    try {
      // Deletar a última dose registrada da vacina
      const { error } = await supabaseConnector.client
        .from('vaccinations')
        .delete()
        .eq('patient_id', parsedPatient.id)
        .eq('vaccine_name', vaccineName)
        .eq('dose_number', currentDose);

      if (error) {
        console.error('Erro ao excluir vacina:', error);
        Alert.alert('Erro', 'Erro ao excluir vacina.');
      } else {
        Alert.alert('Sucesso', `Vacina ${vaccineName} (Dose ${currentDose}) removida com sucesso!`);
        setVaccines((prevVaccines) => ({
          ...prevVaccines,
          [vaccineName]: currentDose - 1,
        }));
      }
    } catch (error) {
      console.error('Erro ao excluir vacina:', error);
      Alert.alert('Erro', 'Erro ao excluir vacina.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cadastrar Vacina</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: '50%' }]}>Vacina</Text>
        <Text style={[styles.tableHeaderText, { width: '20%', textAlign: 'center' }]}>
          Dose Atual
        </Text>
        <Text style={[styles.tableHeaderText, { width: '30%', textAlign: 'center' }]}>Ações</Text>
      </View>
      {vaccineList.map((vaccine, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={[styles.vaccineName, { width: '50%' }]}>{vaccine}</Text>
          <Text style={[styles.doseNumber, { width: '20%', textAlign: 'center' }]}>
            {vaccines[vaccine] ? vaccines[vaccine] : '0'}
          </Text>
          <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => handleIncrement(vaccine)}>
              <Icon name="plus-circle" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDecrement(vaccine)}>
              <Icon name="minus-circle" size={30} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.replace(
            `/patients/PacienteDetails?patient=${encodeURIComponent(JSON.stringify(parsedPatient))}`
          )
        }>
        <Text style={styles.buttonText}>SAIR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterVaccination;
