// app/medications/MedicationCalc.tsx

import { useLocalSearchParams, useRouter } from 'expo-router';
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
  SafeAreaView,
} from 'react-native';

import { calcularIdadeMesesAnos } from '../../utils/novaCalculadoraIdade';
import { useAllergies } from '../context/AllergiesContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { useMedicaments } from '../context/MedicamentsContext';
import { usePatient } from '../context/PatientContext';
import { medicationsList } from './api/medicationsList';
import {
  calcularMedicamento,
  verificarContraindicacoes,
} from '../medications/api/CalculadoraMedicamentos';

const MedicationCalc: React.FC = () => {
  const { medicalRecordId } = useLocalSearchParams<{ medicalRecordId: string }>();
  const { fetchCompleteMedicalRecord } = useMedicalRecords();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
  const { fetchAllergiesByPatient } = useAllergies();
  const { addMedication } = useMedicaments(); // Hook para adicionar medicamento

  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [allergies, setAllergies] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMedication, setSelectedMedication] = useState<string>(''); // Medicamento selecionado
  const [calculatedDosage, setCalculatedDosage] = useState<string>(''); // Resultado do cálculo de dosagem
  const [searchTerm, setSearchTerm] = useState<string>(''); // Termo de pesquisa para medicamentos
  const [filteredMedications, setFilteredMedications] = useState<any[]>([]); // Lista filtrada de medicamentos
  const [dosageRecords, setDosageRecords] = useState<any[]>([]); // Registros de dosagem para a lista
  const router = useRouter();

  useEffect(() => {
    const loadAllergies = async (patientId: string) => {
      try {
        const allergiesData = await fetchAllergiesByPatient(patientId);
        setAllergies(allergiesData);
      } catch (error) {
        console.error('Erro ao carregar alergias:', error);
        Alert.alert('Erro', 'Não foi possível carregar as alergias do paciente.');
      }
    };

    const loadMedicalRecord = async () => {
      if (!medicalRecordId) {
        Alert.alert('Erro', 'ID do prontuário não encontrado.');
        return;
      }

      setLoading(true);
      try {
        const record = await fetchCompleteMedicalRecord(medicalRecordId);
        if (!record) throw new Error('Prontuário não encontrado.');

        const doctor = record.doctor_id ? await fetchDoctorById(record.doctor_id) : null;
        const patient = record.patient_id ? await fetchPatientById(record.patient_id) : null;

        if (patient?.id) {
          await loadAllergies(patient.id);
        }

        setMedicalRecord({
          ...record,
          doctorName: doctor ? doctor.name : 'Não informado',
          patientName: patient ? patient.name : 'Não informado',
          patientAge: patient ? patient.birth_date : null, // Ajuste para evitar erro
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

  const filterMedications = (text: string) => {
    setSearchTerm(text);
    if (text.length >= 3) {
      const filtered = medicationsList.filter((medication) =>
        medication.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMedications(filtered);
    } else {
      setFilteredMedications([]);
    }
  };

  const handleMedicationSelection = (medication: string) => {
    setSelectedMedication(medication);
    setSearchTerm(medication);
    setFilteredMedications([]);
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

    const peso = medicalRecord.vitals.peso_kg;
    if (medicalRecord.patientAge) {
      const idadeCalculada = calcularIdadeMesesAnos(
        new Date(medicalRecord.patientAge),
        medicalRecord.patientAge
      );
      const idade = idadeCalculada.anos + idadeCalculada.meses / 12;

      const patientInfo = {
        alergias: allergies || {},
        condicoesClinicas: medicalRecord.attendance || {},
      };

      const contraindications = verificarContraindicacoes(selectedMedication, patientInfo);
      if (contraindications.length > 0) {
        Alert.alert('Atenção', contraindications.join('\n'));
      } else {
        const resultado = calcularMedicamento(selectedMedication, peso, idade, patientInfo);
        setCalculatedDosage(resultado.dosage);
        setDosageRecords((prev) => [
          ...prev,
          { medication: selectedMedication, dosage: resultado.dosage },
        ]);
      }
    } else {
      Alert.alert('Erro', 'Idade do paciente não informada.');
    }
  };

  const handleAddMedication = async () => {
    if (!selectedMedication || !calculatedDosage) {
      Alert.alert('Erro', 'Calcule a dosagem antes de registrar o medicamento.');
      return;
    }

    try {
      await addMedication({
        name: selectedMedication,
        dosage_info: calculatedDosage,
        indication: 'Indicação específica',
        contraindications: 'Nenhuma conhecida',
        patient_id: medicalRecord.patient_id,
        doctor_id: medicalRecord.doctor_id,
      });
      Alert.alert('Sucesso', 'Medicamento registrado com sucesso.');
    } catch (error) {
      console.error('Erro ao registrar medicamento:', error);
      Alert.alert('Erro', 'Erro ao registrar o medicamento.');
    }
  };

  const handleDeleteDosageRecord = (index: number) => {
    Alert.alert('Confirmar Exclusão', 'Deseja realmente excluir este registro de dosagem?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: () => setDosageRecords((prev) => prev.filter((_, i) => i !== index)),
        style: 'destructive',
      },
    ]);
  };

  const handleGeneratePrescription = async () => {
    if (!medicalRecord || !medicalRecord.patient_id || !medicalRecord.doctor_id) {
      Alert.alert('Erro', 'Informações insuficientes para gerar a receita.');
      return;
    }

    setLoading(true);

    try {
      const patientDetails = await fetchPatientById(medicalRecord.patient_id);
      const doctorDetails = await fetchDoctorById(medicalRecord.doctor_id);

      if (!patientDetails || !doctorDetails) {
        Alert.alert('Erro', 'Falha ao carregar dados do paciente ou do médico.');
        return;
      }

      const prescriptionData = {
        patient: {
          name: patientDetails.name,
          cpf: patientDetails.cpf,
          age: patientDetails.birth_date
            ? calcularIdadeMesesAnos(new Date(patientDetails.birth_date), '').anos
            : 'Data de nascimento não informada',
        },
        doctor: {
          name: doctorDetails.name,
        },
        dosageRecords: dosageRecords.map((dr) => ({
          medication: dr.medication,
          dosage: dr.dosage,
        })),
      };

      router.push({
        pathname: '/medications/PrescriptionScreen',
        params: {
          patient: JSON.stringify(prescriptionData.patient),
          doctor: JSON.stringify(prescriptionData.doctor),
          dosageRecords: JSON.stringify(prescriptionData.dosageRecords),
        },
      });
    } catch (error) {
      console.error('Erro ao gerar receita:', error);
      Alert.alert('Erro', 'Não foi possível gerar a receita.');
    } finally {
      setLoading(false);
    }
  };

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cálculo de Medicação</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Médico: {medicalRecord.doctorName}</Text>
        <Text style={styles.label}>Paciente: {medicalRecord.patientName}</Text>
        <Text style={styles.label}>
          Idade do Paciente:{' '}
          {medicalRecord.patientAge
            ? `${calcularIdadeMesesAnos(new Date(medicalRecord.patientAge), '').anos} anos e ${
                calcularIdadeMesesAnos(new Date(medicalRecord.patientAge), '').meses
              } meses`
            : 'Idade não informada'}
        </Text>
        <Text style={styles.label}>
          Peso (g): {medicalRecord.vitals?.peso_kg || 'Não informado'}
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Digite o nome do medicamento"
        value={searchTerm}
        onChangeText={filterMedications}
      />

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
        ListHeaderComponent={
          <View>
            <Button title="Calcular Dosagem" onPress={handleCalculateDosage} />
            <Button title="Registrar Medicamento" onPress={handleAddMedication} />
            <Button title="Gerar Receita" onPress={handleGeneratePrescription} />
          </View>
        }
      />

      <FlatList
        data={dosageRecords}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.dosageRecord}
            onPress={() => handleDeleteDosageRecord(index)}>
            <Text style={styles.dosageText}>Medicamento: {item.medication}</Text>
            <Text style={styles.dosageText}>Dosagem: {item.dosage}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma dosagem registrada</Text>}
      />
    </SafeAreaView>
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 10,
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
  dosageRecord: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dosageText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default MedicationCalc;
