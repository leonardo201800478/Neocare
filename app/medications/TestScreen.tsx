import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';

import { calcularIdade } from '../../utils/idadeCalculator';
import { useAllergies } from '../context/AllergiesContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { usePatient } from '../context/PatientContext';
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
  const [allergies, setAllergies] = useState<any>(null); // Estado para armazenar alergias
  const [loading, setLoading] = useState(true);
  const [selectedMedication, setSelectedMedication] = useState<string>(''); // Medicamento selecionado
  const [calculatedDosage, setCalculatedDosage] = useState<string>(''); // Resultado do cálculo de dosagem

  // Lista de medicamentos (definida manualmente, ou pode ser dinâmica)
  const medicationsList = [
    { label: 'Amoxicilina', value: 'Amoxicilina' },
    { label: 'Ibuprofeno', value: 'Ibuprofeno' },
    { label: 'Paracetamol', value: 'Paracetamol' },
    { label: 'Sulfato Ferroso', value: 'SulfatoFerroso' },
    { label: 'Cotrimoxazol', value: 'Cotrimoxazol' },
    { label: 'Eritromicina', value: 'Eritromicina' },
    { label: 'Zinco', value: 'Zinco' },
    { label: 'Vitamina A', value: 'VitaminaA' },
    { label: 'Albendazol', value: 'Albendazol' },
    { label: 'Mebendazol', value: 'Mebendazol' },
    { label: 'Ácido Fólico', value: 'AcidoFolico' },
    { label: 'Metronidazol', value: 'Metronidazol' },
    { label: 'Cloroquina Primaquina', value: 'CloroquinaPrimaquina' },
    { label: 'Salbutamol', value: 'Salbutamol' },
    { label: 'Nistatina', value: 'Nistatina' },
    { label: 'Permetrina Benzoato', value: 'PermetrinaBenzoato' },
    { label: 'Cefalexina', value: 'Cefalexina' },
    { label: 'Claritromicina', value: 'Claritromicina' },
    { label: 'Gentamicina (Colírio)', value: 'GentamicinaColirio' },
    { label: 'SRO', value: 'SRO' },
    { label: 'Isotretinoína Tópica', value: 'IsotretinoinaTopica' },
    { label: 'Vitamina D', value: 'VitaminaD' },
    { label: 'Prednisolona', value: 'Prednisolona' },
    { label: 'Aciclovir', value: 'Aciclovir' },
    { label: 'Hidroxizina', value: 'Hidroxizina' },
    { label: 'Bromoprida', value: 'Bromoprida' },
    { label: 'Clorexidina Tópica', value: 'ClorexidinaTopica' },
    { label: 'Tetraciclina (Pomada)', value: 'TetraciclinaPomada' },
    { label: 'Povidona Iodada', value: 'PovidonaIodada' },
    { label: 'Metoclopramida', value: 'Metoclopramida' },
    { label: 'Dexametasona (Oftálmica)', value: 'DexametasonaOftalmica' },
    { label: 'Miconazol', value: 'Miconazol' },
    { label: 'Salicilato de Metila', value: 'SalicilatoDeMetila' },
    { label: 'Corticosteroide Tópico', value: 'CorticosteroideTopico' },
    { label: 'Lidocaína (Gel)', value: 'LidocainaGel' },
    { label: 'Sulfacetamida (Colírio)', value: 'SulfacetamidaColirio' },
    { label: 'Permetrina 1%', value: 'Permetrina1' }
  ];

  const loadAllergies = async (patientId: string) => {
    setLoading(true);
    try {
      const patientAllergies = await fetchAllergiesByPatient(patientId);
      if (patientAllergies && patientAllergies.length > 0) {
        setAllergies(patientAllergies[0]); // Define a primeira entrada de alergias
      } else {
        setAllergies([]);
      }
    } catch (error) {
      console.error('Erro ao buscar alergias:', error);
      Alert.alert('Erro', 'Erro ao carregar alergias do paciente.');
    } finally {
      setLoading(false);
    }
  };

  const handleMedicationSelection = () => {
    if (!selectedMedication) {
      Alert.alert('Erro', 'Selecione um medicamento.');
      return;
    }

    if (!medicalRecord || !medicalRecord.vitals?.peso_kg) {
      Alert.alert('Erro', 'Dados insuficientes para calcular a dosagem.');
      return;
    }

    // Dados do paciente para o cálculo
    const peso = medicalRecord.vitals.peso_kg;
    const idade = medicalRecord.patientAge.split(' ')[0]; // Pegando a idade em anos

    // Verificar contraindicações usando alergias e condições clínicas
    const patientInfo = {
      alergias: allergies || {}, // Certifique-se de que as alergias estão definidas
      condicoesClinicas: medicalRecord.attendance || {}, // Usando os dados de condições clínicas
    };

    // Verificar contraindicações antes do cálculo
    const contraindications = verificarContraindicacoes(selectedMedication, patientInfo);

    if (contraindications.length > 0) {
      // Se houver contraindicações, exibe a mensagem e não calcula
      Alert.alert('Atenção', contraindications.join('\n'));
      return;
    }

    // Se não houver contraindicações, prosseguir com o cálculo da dosagem
    const resultado = calcularMedicamento(
      selectedMedication,
      parseFloat(peso),
      parseInt(idade, 10),
      patientInfo
    );

    setCalculatedDosage(resultado.dosage);
  };

  useEffect(() => {
    const loadMedicalRecord = async () => {
      if (!medicalRecordId) {
        Alert.alert('Erro', 'ID do prontuário não encontrado.');
        return;
      }

      setLoading(true);
      try {
        // Buscar o prontuário completo usando o medicalRecordId
        const record = await fetchCompleteMedicalRecord(medicalRecordId);
        if (!record) throw new Error('Prontuário não encontrado.');

        // Buscar o médico e paciente pelo ID
        const doctor = record.doctor_id ? await fetchDoctorById(record.doctor_id) : null;
        const patient = record.patient_id ? await fetchPatientById(record.patient_id) : null;

        // Carregar as alergias do paciente, se o paciente for encontrado
        if (patient?.id) {
          await loadAllergies(patient.id); // Chama a função de carregar alergias
        }

        // Atualiza o estado do prontuário
        setMedicalRecord({
          ...record,
          doctorName: doctor ? doctor.name : 'Não informado',
          patientName: patient ? patient.name : 'Não informado',
          patientAge: patient
            ? patient.birth_date
              ? calcularIdade(new Date(patient.birth_date), patient.birth_date)
              : 'Data de nascimento não informada'
            : 'Não informado',
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

      {/* Informações do Médico e Paciente */}
      <View style={styles.section}>
        <Text style={styles.label}>Médico: {medicalRecord.doctorName}</Text>
        <Text style={styles.label}>Paciente: {medicalRecord.patientName}</Text>
        <Text style={styles.label}>Idade do Paciente: {medicalRecord.patientAge}</Text>
        <Text style={styles.label}>
          Peso (kg): {medicalRecord.vitals?.peso_kg || 'Não informado'}
        </Text>
      </View>

      {/* Picker para selecionar o medicamento */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Selecione o Medicamento:</Text>
        <Picker
          selectedValue={selectedMedication}
          onValueChange={(itemValue) => setSelectedMedication(itemValue)}
          style={styles.picker}>
          {medicationsList.map((medication) => (
            <Picker.Item key={medication.value} label={medication.label} value={medication.value} />
          ))}
        </Picker>
      </View>

      <Button title="Calcular Dosagem" onPress={handleMedicationSelection} />

      {/* Exibe o resultado do cálculo da dosagem */}
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
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
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
  allergyItem: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
  },
});

export default TestScreen;
