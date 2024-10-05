// app/vaccines/RegisterVaccination.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para os ícones de incremento e decremento

import { useSystem } from '../../powersync/PowerSync';
import styles from '../styles/VaccinationStyles';

type VaccineSchedule = {
  [key: string]: number;
};

// Atualizado para refletir as doses conforme o calendário
const vaccineSchedule: VaccineSchedule = {
  BCG: 1,
  'Hepatite B': 4,
  Rotavírus: 3,
  'Tríplice bacteriana (DTP)': 5,
  'Haemophilus influenzae B (Hib)': 4,
  'Poliomielite (VIP)': 4,
  'Pneumocócica conjugada': 3,
  'Meningocócica conjugada C': 3,
  'Meningocócica B': 3,
  Influenza: 999, // Vacinação contínua anual
  'Febre Amarela': 2,
  'Hepatite A': 2,
  'Tríplice viral (SCR)': 2,
  Varicela: 2,
  HPV: 2,
  Dengue: 2,
  'Covid-19': 3,
};

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

    if (dose > vaccineSchedule[vaccineName]) {
      Alert.alert('Erro', `Número máximo de doses para ${vaccineName} já foi atingido.`);
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

  const handleIncrement = (vaccineName: string) => {
    const currentDose = vaccines[vaccineName] ? vaccines[vaccineName] + 1 : 1;
    handleRegister(vaccineName, currentDose);
  };

  const handleDecrement = async (vaccineName: string) => {
    if (!parsedPatient || !vaccines[vaccineName] || vaccines[vaccineName] <= 0) {
      return;
    }

    const currentDose = vaccines[vaccineName];

    try {
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Cadastrar Vacina</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { width: '50%' }]}>Vacina</Text>
          <Text style={[styles.tableHeaderText, { width: '20%', textAlign: 'center' }]}>
            Dose Atual
          </Text>
          <Text style={[styles.tableHeaderText, { width: '30%', textAlign: 'center' }]}>Ações</Text>
        </View>
        {Object.keys(vaccineSchedule).map((vaccine, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.vaccineName, { width: '50%' }]}>{vaccine}</Text>
            <Text style={[styles.doseNumber, { width: '20%', textAlign: 'center' }]}>
              {vaccines[vaccine] ? vaccines[vaccine] : '0'}
            </Text>
            <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={() => handleIncrement(vaccine)}
                disabled={vaccines[vaccine] >= vaccineSchedule[vaccine]}>
                <Icon
                  name="plus-circle"
                  size={30}
                  color={vaccines[vaccine] >= vaccineSchedule[vaccine] ? 'gray' : 'green'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDecrement(vaccine)}
                disabled={!vaccines[vaccine] || vaccines[vaccine] <= 0}>
                <Icon
                  name="minus-circle"
                  size={30}
                  color={!vaccines[vaccine] || vaccines[vaccine] <= 0 ? 'gray' : 'red'}
                />
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
    </SafeAreaView>
  );
};

export default RegisterVaccination;
