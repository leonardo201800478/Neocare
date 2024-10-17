// app/(tabs)/doctors/DoctorsPatients.tsx

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { useSystem } from '../../../powersync/PowerSync';
import { calcularIdade } from '../../../utils/idadeCalculator'; // Importando a função para calcular idade
import { useDoctor } from '../../context/DoctorContext';
import { usePatient } from '../../context/PatientContext';

const PatientsScreen: React.FC = () => {
  const { selectedDoctor } = useDoctor();
  const { setSelectedPatient } = usePatient();

  interface Patient {
    id: string;
    name: string;
    birth_date: string;
    cpf: string;
    created_at: string | null;
    updated_at: string | null;
    gender: string | null;
    phone_number: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    uf: string | null;
    zip_code: string | null;
    doctor_id: string | null;
  }

  const [patients, setPatients] = useState<Patient[]>([]);
  const { supabaseConnector } = useSystem();
  const router = useRouter();

  useEffect(() => {
    if (selectedDoctor) {
      fetchPatients();
    } else {
      console.error('No doctor selected');
    }
  }, [selectedDoctor]);

  const fetchPatients = async () => {
    const { data, error } = await supabaseConnector.client
      .from('patients')
      .select('*')
      .eq('doctor_id', selectedDoctor!.id)
      .order('name', { ascending: true }); // Ordenando os pacientes por nome em ordem alfabética

    if (error) {
      console.error('Erro ao buscar pacientes:', error.message);
      return;
    }
    const patientsWithUF = data.map((patient) => ({
      ...patient,
      uf: patient.state ? patient.state.substring(0, 2).toUpperCase() : null,
    }));
    setPatients(patientsWithUF); // Corrigido para aplicar o mapeamento com o campo `uf`
  };

  // Função para formatar o CPF no formato 000.000.000-00
  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handlePatientPress = (patient: Patient) => {
    setSelectedPatient(patient);
    router.push('/(tabs)/patients/PacienteDetails');
  };

  const renderItem = ({ item, index }: { item: Patient; index: number }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePatientPress(item)}>
      <Text style={styles.itemName}>{`${index + 1}. ${item.name}`}</Text>
      <Text style={styles.itemDetail}>CPF: {formatCPF(item.cpf)}</Text>
      <Text style={styles.itemDetail}>Idade: {calcularIdade(new Date(item.birth_date), '')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
  },
});

export default PatientsScreen;
