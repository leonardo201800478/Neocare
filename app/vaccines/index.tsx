// app/(tabs)/vaccines/VaccinationCard.tsx

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';

import { useSystem } from '../../powersync/PowerSync';
import { calcularIdade } from '../../utils/idadeCalculator';
import VaccinationStyles from '../styles/VaccinationStyles';

type VaccineSchedule = {
  [key: string]: { doses: number; minAge: number; maxAge: number };
};

// Atualizado com as informações de doses por vacina
const vaccineSchedule: VaccineSchedule = {
  BCG: { doses: 1, minAge: 0, maxAge: 0 },
  'Hepatite B': { doses: 4, minAge: 0, maxAge: 3 },
  Rotavírus: { doses: 3, minAge: 0.5, maxAge: 7 },
  'Tríplice bacteriana (DTP)': { doses: 5, minAge: 2, maxAge: 72 },
  'Haemophilus influenzae B (Hib)': { doses: 4, minAge: 2, maxAge: 18 },
  'Poliomielite (VIP)': { doses: 4, minAge: 2, maxAge: 48 },
  'Pneumocócica conjugada': { doses: 3, minAge: 2, maxAge: 18 },
  'Meningocócica conjugada C': { doses: 3, minAge: 3, maxAge: 60 },
  'Meningocócica B': { doses: 3, minAge: 3, maxAge: 23 },
  Influenza: { doses: 999, minAge: 6, maxAge: 999 },
  'Febre Amarela': { doses: 2, minAge: 9, maxAge: 999 },
  'Hepatite A': { doses: 2, minAge: 12, maxAge: 60 },
  'Tríplice viral (SCR)': { doses: 2, minAge: 12, maxAge: 999 },
  Varicela: { doses: 2, minAge: 15, maxAge: 999 },
  HPV: { doses: 2, minAge: 108, maxAge: 180 },
  Dengue: { doses: 2, minAge: 48, maxAge: 999 },
  'Covid-19': { doses: 3, minAge: 6, maxAge: 60 },
};

const VaccinationCard = () => {
  const { patient } = useLocalSearchParams();
  const parsedPatient = patient ? JSON.parse(decodeURIComponent(patient as string)) : null;
  const { supabaseConnector } = useSystem();
  const [vaccines, setVaccines] = useState<{ [key: string]: any[] }>({});
  const [patientAge, setPatientAge] = useState<string>('');

  useEffect(() => {
    if (parsedPatient) {
      const birthDate = new Date(parsedPatient.birth_date);
      setPatientAge(calcularIdade(birthDate, 'p0'));

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
            const vaccineData: { [key: string]: any[] } = {};
            data.forEach((vaccine: any) => {
              if (!vaccineData[vaccine.vaccine_name]) {
                vaccineData[vaccine.vaccine_name] = [];
              }
              vaccineData[vaccine.vaccine_name].push(vaccine);
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

  const getStatusColor = (vaccineName: string) => {
    const ageData = vaccineSchedule[vaccineName];
    if (!ageData) return 'transparent';

    const [years, months] = patientAge
      .split(' ')
      .filter((v) => !isNaN(Number(v)))
      .map(Number);
    const totalMonths = years * 12 + months;

    if (totalMonths < ageData.minAge) {
      return 'transparent';
    }

    const dosesTaken = vaccines[vaccineName] ? vaccines[vaccineName].length : 0;

    if (dosesTaken < ageData.doses) {
      return 'lightcoral';
    } else {
      return 'lightgreen';
    }
  };

  const handleVaccineClick = (vaccineName: string) => {
    const ageData = vaccineSchedule[vaccineName];
    if (!ageData) return;

    const dosesTaken = vaccines[vaccineName] ? vaccines[vaccineName].length : 0;
    if (dosesTaken < ageData.doses) {
      const dosesMissing = ageData.doses - dosesTaken;
      Alert.alert(
        'Vacina em Atraso',
        `A criança deveria ter tomado ${ageData.doses} doses da vacina ${vaccineName}, mas tomou apenas ${dosesTaken}. Estão faltando ${dosesMissing} dose(s).`
      );
    }
  };

  return (
    <SafeAreaView style={VaccinationStyles.container}>
      <ScrollView>
        <Text style={VaccinationStyles.header}>Caderneta de Vacinação</Text>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Nome: {parsedPatient?.name}</Text>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Idade: {patientAge}</Text>
        <View style={VaccinationStyles.tableHeader}>
          <Text style={VaccinationStyles.tableHeaderText}>Vacina</Text>
          <Text style={VaccinationStyles.tableHeaderText}>Dose</Text>
          <Text style={VaccinationStyles.tableHeaderText}>Data de Aplicação</Text>
        </View>
        {Object.keys(vaccineSchedule).map((vaccineName, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleVaccineClick(vaccineName)}
            style={[VaccinationStyles.tableRow, { backgroundColor: getStatusColor(vaccineName) }]}>
            <Text style={VaccinationStyles.vaccineName}>{vaccineName}</Text>
            <Text style={VaccinationStyles.doseNumber}>
              {vaccines[vaccineName] ? vaccines[vaccineName].length : 'Nenhuma dose aplicada'}
            </Text>
            <Text style={VaccinationStyles.doseNumber}>
              {vaccines[vaccineName]
                ? vaccines[vaccineName]
                    .map((v) => new Date(v.administered_at).toLocaleDateString())
                    .join(', ')
                : '-'}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={VaccinationStyles.button}
          onPress={() => {
            /* lógica de navegação para retornar */
          }}>
          <Text style={VaccinationStyles.buttonText}>Retornar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VaccinationCard;
