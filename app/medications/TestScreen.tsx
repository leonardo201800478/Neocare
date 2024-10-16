import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { calcularIdade } from '../../utils/idadeCalculator';
import { useAllergies } from '../context/AllergiesContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicalRecords } from '../context/MedicalRecordsContext';
import { usePatient } from '../context/PatientContext';

const TestScreen: React.FC = () => {
  const { medicalRecordId } = useLocalSearchParams<{ medicalRecordId: string }>();
  const { fetchCompleteMedicalRecord } = useMedicalRecords();
  const { fetchDoctorById } = useDoctor();
  const { fetchPatientById } = usePatient();
  const { fetchAllergiesByPatient } = useAllergies();

  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [allergies, setAllergies] = useState<any>(null); // Estado para armazenar alergias
  const [loading, setLoading] = useState(true);

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

  const renderAllergyItem = (label: string, value: string) => {
    return value === 'yes' ? <Text style={styles.allergyItem}>{label}</Text> : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações para a tela de medicamentos</Text>

      {/* Informações do Médico e Paciente */}
      <View style={styles.section}>
        <Text style={styles.label}>Médico: {medicalRecord.doctorName}</Text>
        <Text style={styles.label}>Paciente: {medicalRecord.patientName}</Text>
        <Text style={styles.label}>Idade do Paciente: {medicalRecord.patientAge}</Text>
        <Text style={styles.label}>
          Peso (kg): {medicalRecord.vitals?.peso_kg || 'Não informado'}
        </Text>

        {/* Exibe a data da última atualização */}
        {allergies?.updated_at && (
          <Text style={styles.updateText}>
            Última atualização: {format(new Date(allergies.updated_at), 'dd/MM/yyyy')}
          </Text>
        )}

        {/* Verifica se o paciente possui alergias cadastradas */}
        {allergies ? (
          <View style={styles.allergiesContainer}>
            <Text style={styles.sectionTitle}>Alergias</Text>
            {renderAllergyItem('Leite e derivados', allergies.allergy_milk)}
            {renderAllergyItem('Ovos', allergies.allergy_eggs)}
            {renderAllergyItem('Carne bovina', allergies.allergy_beef)}
            {renderAllergyItem('Peixe', allergies.allergy_fish)}
            {renderAllergyItem('Crustáceos', allergies.allergy_shellfish)}
            {renderAllergyItem('Gato', allergies.allergy_cat)}
            {renderAllergyItem('Cachorro', allergies.allergy_dog)}
            {renderAllergyItem('Abelha', allergies.allergy_bee)}
            {renderAllergyItem('Formiga', allergies.allergy_ant)}
            {renderAllergyItem('Animais peçonhentos', allergies.allergy_venomous_animals)}
            {renderAllergyItem('Insetos', allergies.allergy_insects)}
            {renderAllergyItem('Dipirona', allergies.allergy_dipyrone)}
            {renderAllergyItem('Aspirina', allergies.allergy_aspirin)}
            {renderAllergyItem('Diclofenaco', allergies.allergy_diclofenac)}
            {renderAllergyItem('Paracetamol', allergies.allergy_paracetamol)}
            {renderAllergyItem('Penicilina', allergies.allergy_penicillin)}
            {renderAllergyItem('Magnésio bisulfato', allergies.allergy_magnesium_bisulphate)}
            {renderAllergyItem('Rivaroxabana', allergies.allergy_rivaroxaban)}
            {renderAllergyItem('Losartana', allergies.allergy_losartan_potassium)}
            {renderAllergyItem('Metformina', allergies.allergy_metformin)}
            {renderAllergyItem('Butilbrometo de escopolamina', allergies.allergy_butylscopolamine)}
            {renderAllergyItem('Cefalosporina', allergies.allergy_cephalosporin)}
            {renderAllergyItem('Salbutamol', allergies.allergy_salbutamol)}
            {renderAllergyItem('Ácido fólico', allergies.allergy_acido_folico)}
            {renderAllergyItem('Isotretinoína', allergies.allergy_isotretinoina)}
          </View>
        ) : (
          <Text style={styles.noAllergiesText}>Nenhuma alergia cadastrada para este paciente.</Text>
        )}

        <Text style={styles.label}>
          Hipertensão: {medicalRecord.attendance?.hipertensao === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Diabetes: {medicalRecord.attendance?.diabetes === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Doença Hepática: {medicalRecord.attendance?.doenca_hepatica === 'yes' ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.label}>
          Deficiência G6PD: {medicalRecord.attendance?.deficiencia_g6pd === 'yes' ? 'Sim' : 'Não'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgreen',
  },
  updateText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
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
  allergiesContainer: {
    backgroundColor: '#F1F8E9', // Fundo leve para o container de alergias
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#AED581', // Borda verde clara para o container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  noAllergiesText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  allergyItem: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#A5D6A7',
    borderRadius: 5,
  },
});

export default TestScreen;
