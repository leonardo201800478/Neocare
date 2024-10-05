// app/(tabs)/vaccines/VaccinationCard.tsx

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import { useSystem } from '../../powersync/PowerSync';
import { calcularIdade } from '../../utils/idadeCalculator';

type VaccineSchedule = {
  [key: string]: { minAge: number; maxAge: number };
};

const vaccineSchedule: VaccineSchedule = {
  BCG: { minAge: 0, maxAge: 0 },
  'Hepatite B': { minAge: 0, maxAge: 0.25 }, // Até 3 meses
  Rotavírus: { minAge: 0.5, maxAge: 1 }, // De 2 a 7 meses
  'Tríplice bacteriana (DTP)': { minAge: 2, maxAge: 6 }, // A partir dos 2 meses até reforço aos 6 anos
  'Haemophilus influenzae B (Hib)': { minAge: 2, maxAge: 1.5 }, // De 2 a 18 meses
  'Poliomielite (VIP)': { minAge: 2, maxAge: 4 }, // Até 4 anos
  'Pneumocócica conjugada': { minAge: 2, maxAge: 1.5 }, // Reforço até 18 meses
  'Meningocócica conjugada C': { minAge: 3, maxAge: 5 }, // A partir de 3 meses com reforço até 5 anos
  'Meningocócica B': { minAge: 3, maxAge: 2 }, // A partir dos 3 meses com reforço
  Influenza: { minAge: 6, maxAge: 999 }, // Dose anual após 6 meses
  'Febre Amarela': { minAge: 9, maxAge: 999 }, // A partir dos 9 meses
  'Hepatite A': { minAge: 12, maxAge: 5 }, // Dose única aos 15 meses até menores de 5 anos
  'Tríplice viral (SCR)': { minAge: 12, maxAge: 999 }, // A partir dos 12 meses
  Varicela: { minAge: 15, maxAge: 999 }, // A partir dos 15 meses
  HPV: { minAge: 108, maxAge: 180 }, // Dos 9 aos 14 anos
  Dengue: { minAge: 48, maxAge: 999 }, // A partir de 4 anos
  'Covid-19': { minAge: 6, maxAge: 60 }, // De 6 meses até 5 anos
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
      setPatientAge(calcularIdade(birthDate));

      // Fetch current vaccinations for the patient
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
    const currentDate = new Date();
    const ageData = vaccineSchedule[vaccineName];
    if (!ageData) return 'transparent';

    const [years, months] = patientAge
      .split(' ')
      .filter((v) => !isNaN(Number(v)))
      .map(Number);
    const totalMonths = years * 12 + months;

    if (totalMonths < ageData.minAge) {
      return 'transparent'; // Too early for the vaccine
    }

    if (vaccines[vaccineName]) {
      // If the vaccine has been taken, check if it's still within schedule
      const lastDoseDate = new Date(
        vaccines[vaccineName][vaccines[vaccineName].length - 1].administered_at
      );
      const nextDoseDeadline = new Date(lastDoseDate);
      nextDoseDeadline.setMonth(nextDoseDeadline.getMonth() + 6); // Assume 6 months for the next dose

      if (currentDate > nextDoseDeadline) {
        return 'lightcoral'; // Delayed
      } else if (
        (nextDoseDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) <=
        15
      ) {
        return 'lightyellow'; // Due soon
      } else {
        return 'lightgreen'; // Up-to-date
      }
    } else {
      return 'lightcoral'; // No vaccine taken yet
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Caderneta de Vacinação
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Nome: {parsedPatient?.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Idade: {patientAge}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Vacina</Text>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Dose</Text>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>Data de Aplicação</Text>
      </View>
      {Object.keys(vaccineSchedule).map((vaccineName, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            backgroundColor: getStatusColor(vaccineName),
            marginBottom: 4,
          }}>
          <Text style={{ flex: 1 }}>{vaccineName}</Text>
          <Text style={{ flex: 1 }}>
            {vaccines[vaccineName] ? vaccines[vaccineName].length : 'Nenhuma dose aplicada'}
          </Text>
          <Text style={{ flex: 1 }}>
            {vaccines[vaccineName]
              ? vaccines[vaccineName]
                  .map((v) => new Date(v.administered_at).toLocaleDateString())
                  .join(', ')
              : '-'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default VaccinationCard;
