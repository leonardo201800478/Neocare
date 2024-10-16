// app/medications/TestScreen.tsx

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { calcularIdadeMesesAnos } from '../../utils/novaCalculadoraIdade';
import { useAllergies } from '../context/AllergiesContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { usePatient } from '../context/PatientContext';
import { medicationsList } from './api/medicationsList'; // Lista de medicamentos importada
import {
  calcularMedicamento,
  verificarContraindicacoes,
} from '../medications/api/CalculadoraMedicamentos';

const TestScreen: React.FC = () => {
  const { medicalRecordId } = useLocalSearchParams<{ medicalRecordId: string }>();
  const { fetchCompleteMedicalRecord } = useMedicalRecords();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
  const { fetchAllergiesByPatient } = useAllergies();

  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [allergies, setAllergies] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedication, setSelectedMedication] = useState<string>(''); // Medicamento selecionado
  const [calculatedDosage, setCalculatedDosage] = useState<string>(''); // Resultado do cálculo de dosagem
  const [searchTerm, setSearchTerm] = useState<string>(''); // Termo de pesquisa para medicamentos
  const [filteredMedications, setFilteredMedications] = useState<any[]>([]); // Lista filtrada de medicamentos

  const loadAllergies = async (patientId: string) => {
    setLoading(true);
    try {
      const patientAllergies = await fetchAllergiesByPatient(patientId);
      if (patientAllergies && patientAllergies.length > 0) {
        setAllergies(patientAllergies[0]);
      } else {
        setAllergies([]);
      }
      console.log('Alergias carregadas:', patientAllergies);
    } catch (error) {
      console.error('Erro ao buscar alergias:', error);
      Alert.alert('Erro', 'Erro ao carregar alergias do paciente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar medicamentos com base no termo de pesquisa
  const filterMedications = (text: string) => {
    setSearchTerm(text);

    if (text.length >= 3) {
      const filtered = medicationsList.filter((medication) =>
        medication.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMedications(filtered);
    } else {
      setFilteredMedications([]); // Se menos de 3 caracteres, não exibe a lista
    }
  };

  const handleMedicationSelection = (medication: string) => {
    setSelectedMedication(medication);
    setSearchTerm(medication); // Fixar o medicamento selecionado no campo de pesquisa
    setFilteredMedications([]); // Esconder a lista de medicamentos após a seleção
  };

  const handleCalculateDosage = () => {
    if (!selectedMedication) {
      Alert.alert('Erro', 'Selecione um medicamento.');
      return;
    }

    if (!medicalRecord || !medicalRecord.vitals?.peso_kg) {
      Alert.alert('Erro', 'Dados insuficientes para calcular a dosagem.');
      return;
    }

    const peso = medicalRecord.vitals.peso_kg; // Mantendo o peso como está, sem conversão
    console.log('Peso do paciente (em gramas):', peso);

    const idadeCalculada = calcularIdadeMesesAnos(
      new Date(medicalRecord.patientAge),
      medicalRecord.patientAge
    );
    const idade = idadeCalculada.anos + idadeCalculada.meses / 12;
    console.log('Idade do paciente (em anos):', idade);

    const patientInfo = {
      alergias: allergies || {},
      condicoesClinicas: medicalRecord.attendance || {},
    };

    console.log('Condições clínicas do paciente:', patientInfo.condicoesClinicas);

    const contraindications = verificarContraindicacoes(selectedMedication, patientInfo);

    if (contraindications.length > 0) {
      // Se houver contraindicações, exibe a mensagem
      Alert.alert('Atenção', contraindications.join('\n'));
    } else {
      // Se não houver contraindicações, calcular a dosagem e exibir
      const resultado = calcularMedicamento(selectedMedication, peso, idade, patientInfo);
      setCalculatedDosage(resultado.dosage);
      console.log('Resultado da dosagem calculada:', resultado.dosage);
    }
  };

  useEffect(() => {
    const loadMedicalRecord = async () => {
      if (!medicalRecordId) {
        Alert.alert('Erro', 'ID do prontuário não encontrado.');
        return;
      }

      setLoading(true);
      try {
        const record = await fetchCompleteMedicalRecord(medicalRecordId);
        console.log('Prontuário carregado:', record);

        if (!record) throw new Error('Prontuário não encontrado.');

        const doctor = record.doctor_id ? await fetchDoctorById(record.doctor_id) : null;
        const patient = record.patient_id ? await fetchPatientById(record.patient_id) : null;

        console.log('Médico carregado:', doctor);
        console.log('Paciente carregado:', patient);

        if (patient?.id) {
          await loadAllergies(patient.id);
        }

        setMedicalRecord({
          ...record,
          doctorName: doctor ? doctor.name : 'Não informado',
          patientName: patient ? patient.name : 'Não informado',
          patientAge: patient ? patient.birth_date : 'Não informado',
        });
      } catch (error) {
        console.error('Erro ao carregar prontuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar o prontuário.');
      } finally {
        setLoading(false);
      }
    };

    loadMedicalRecord();
  }, [medicalRecordId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text>Carregando dados do prontuário...</Text>
      </View>
    );
  }

  if (!medicalRecord) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Prontuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculo de Medicação</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Médico: {medicalRecord.doctorName}</Text>
        <Text style={styles.label}>Paciente: {medicalRecord.patientName}</Text>
        <Text style={styles.label}>
          Idade do Paciente:{' '}
          {
            calcularIdadeMesesAnos(new Date(medicalRecord.patientAge), medicalRecord.patientAge)
              .anos
          }{' '}
          anos e{' '}
          {
            calcularIdadeMesesAnos(new Date(medicalRecord.patientAge), medicalRecord.patientAge)
              .meses
          }{' '}
          meses
        </Text>
        <Text style={styles.label}>
          Peso (g): {medicalRecord.vitals?.peso_kg || 'Não informado'}
        </Text>
      </View>

      {/* Campo de pesquisa para medicamentos */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do medicamento"
          value={searchTerm}
          onChangeText={(text) => filterMedications(text)}
        />
        {filteredMedications.length > 0 && (
          <FlatList
            data={filteredMedications}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.medicationItem}
                onPress={() => handleMedicationSelection(item.value)}>
                <Text style={styles.medicationText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Button title="Calcular Dosagem" onPress={handleCalculateDosage} />

      {calculatedDosage ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Dosagem Calculada: {calculatedDosage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgreen',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  medicationItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  medicationText: {
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TestScreen;
