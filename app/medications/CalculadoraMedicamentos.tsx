import { Picker } from '@react-native-picker/picker'; // Biblioteca para o dropdown
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';

import { calcularIdade } from '../../utils/idadeCalculator';
import { useAllergies } from '../context/AllergiesContext'; // Coleta de dados de alergias
import { useAttendance } from '../context/AttendanceContext';
import { useAttendanceVital } from '../context/AttendanceVitalContext';
import { useDoctor } from '../context/DoctorContext';
import { useMedicaments } from '../context/MedicamentsContext';
import { usePatient } from '../context/PatientContext';
import styles from './styles/MedicamentosStyles';

// Lista dos medicamentos organizados por categorias
const medicationsList = {
  'Vitaminas e Derivados': [
    {
      id: 1,
      name: 'Vitamina A',
      dosage: '100.000 UI (menores de 1 ano); 200.000 UI (acima de 1 ano)',
      indications: 'Prevenção de deficiência de vitamina A',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 2,
      name: 'Ácido Fólico',
      dosage: '0,1-0,4 mg uma vez ao dia',
      indications: 'Prevenção de deficiência de ácido fólico, suporte pré-natal',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 3,
      name: 'Zinco (Suplemento)',
      dosage: '10-20 mg uma vez ao dia por 10-14 dias',
      indications: 'Tratamento da deficiência de zinco',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 4,
      name: 'Vitamina D',
      dosage: '400-1000 UI uma vez ao dia',
      indications: 'Prevenção e tratamento de deficiência de vitamina D',
      contraindications: 'Nenhuma específica',
    },
  ],
  'Tarja Preta': [
    {
      id: 5,
      name: 'Isotretinoína Tópica',
      dosage: 'Aplicar uma vez ao dia',
      indications: 'Tratamento de acne grave',
      contraindications: 'Gravidez',
    },
  ],
  'Tarja Vermelha': [
    {
      id: 6,
      name: 'Amoxicilina',
      dosage: '20-40 mg/kg/dia',
      indications: 'Infecções bacterianas',
      contraindications: 'Alergia à penicilina',
    },
    {
      id: 7,
      name: 'Cotrimoxazol',
      dosage: '8 mg/kg/dia',
      indications: 'Infecções bacterianas',
      contraindications: 'Alergia à sulfa',
    },
    {
      id: 8,
      name: 'Eritromicina',
      dosage: '30-50 mg/kg/dia',
      indications: 'Infecções bacterianas',
      contraindications: 'Nenhuma específica',
    },
    // Adicione outros medicamentos conforme necessário
  ],
  'Sem Tarja': [
    {
      id: 9,
      name: 'Soluções de Reidratação Oral (SRO)',
      dosage: '50-100 ml/kg',
      indications: 'Reidratação em casos de desidratação leve a moderada',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 10,
      name: 'Ibuprofeno',
      dosage: '5-10 mg/kg por dose',
      indications: 'Inflamação, dor e febre',
      contraindications: 'Hipertensão, alergia a AINEs',
    },
    // Adicione outros medicamentos conforme necessário
  ],
};

const CalculadoraMedicamentos = ({ patientId }: { patientId: string }) => {
  const { calculateDosage } = useMedicaments();
  const { selectedPatient, setSelectedPatient, fetchPatientById } = usePatient();
  const { selectedDoctor, setSelectedDoctor, fetchDoctorById } = useDoctor();
  const { selectedAttendance, setSelectedAttendance, fetchAttendanceByPatient } = useAttendance();
  const { vitalSigns, setVitalSigns, fetchVitalsByAttendance } = useAttendanceVital();
  const { fetchAllergiesByPatient } = useAllergies();

  const [patientAge, setPatientAge] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<any>(null); // Armazenar as alergias
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);

  useEffect(() => {
    if (patientId) {
      initializeData(patientId);
    }
  }, [patientId]);

  const initializeData = async (patientId: string): Promise<void> => {
    try {
      // Buscar dados do paciente
      const patient = await fetchPatientById(patientId);
      if (!patient) throw new Error('Paciente não encontrado');

      if (!patient.birth_date) throw new Error('Data de nascimento do paciente não encontrada');
      const age = calcularIdade(new Date(patient.birth_date), 'years');
      setPatientAge(age);
      setSelectedPatient(patient);

      // Buscar nome do médico
      const doctor = patient.doctor_id ? await fetchDoctorById(patient.doctor_id) : null;
      if (doctor) {
        setDoctorName(doctor.name);
        setSelectedDoctor(doctor);
      } else {
        setErrors((prev) => [...prev, 'Médico não encontrado']);
      }

      // Buscar dados de consulta (attendance)
      const attendance = await fetchAttendanceByPatient(patientId);
      if (!attendance) setErrors((prev) => [...prev, 'Informações de consulta faltando']);
      setSelectedAttendance(attendance);

      // Buscar dados dos sinais vitais (attendance_vitals)
      const vitals = attendance?.id ? await fetchVitalsByAttendance(attendance.id) : null;
      if (!vitals) setErrors((prev) => [...prev, 'Informações de sinais vitais faltando']);
      setVitalSigns(vitals);

      // Buscar alergias
      const allergiesData = await fetchAllergiesByPatient(patientId);
      if (!allergiesData) {
        setErrors((prev) => [...prev, 'Informações de alergias faltando']);
      } else {
        setAllergies(allergiesData);
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  const handleCalculate = () => {
    if (errors.length > 0) {
      Alert.alert('Erro', 'Por favor, complete os cadastros: ' + errors.join(', '));
      return;
    }

    const dosageResults = calculateDosage({
      patient: selectedPatient,
      doctor: selectedDoctor,
      attendance: selectedAttendance,
      vitals: vitalSigns,
    });

    console.log(dosageResults);
  };

  if (!selectedPatient || !selectedDoctor) {
    return (
      <View style={styles.container}>
        <Text>Carregando dados do paciente e médico...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cálculo de Medicamentos</Text>

      <Text style={styles.label}>Nome do Paciente: {selectedPatient?.name}</Text>
      <Text style={styles.label}>Idade: {patientAge}</Text>
      <Text style={styles.label}>Nome do Médico: {doctorName}</Text>

      {selectedAttendance && (
        <>
          <Text style={styles.sectionTitle}>Condições Clínicas</Text>
          <Text>Hipertensão: {selectedAttendance.hipertensao}</Text>
          <Text>Diabetes: {selectedAttendance.diabetes}</Text>
          <Text>Doença Hepática: {selectedAttendance.doenca_hepatica}</Text>
          <Text>Deficiência de G6PD: {selectedAttendance.deficiencia_g6pd}</Text>
        </>
      )}

      {vitalSigns && (
        <>
          <Text style={styles.sectionTitle}>Sinais Vitais</Text>
          <Text>Peso: {vitalSigns.peso_kg} kg</Text>
          <Text>Altura: {vitalSigns.comprimento_cm} cm</Text>
        </>
      )}

      {allergies && (
        <>
          <Text style={styles.sectionTitle}>Alergias</Text>
          {Object.entries(allergies).map(([key, value]) => (
            <Text key={key}>
              {key}: {String(value)}
            </Text>
          ))}
        </>
      )}

      {/* Dropdown para selecionar medicamentos */}
      <Text style={styles.sectionTitle}>Selecione o Medicamento</Text>
      <Picker
        selectedValue={selectedMedication}
        onValueChange={(itemValue) => setSelectedMedication(itemValue)}
        style={styles.picker}>
        {Object.entries(medicationsList).map(([category, medications]) => (
          <React.Fragment key={category}>
            <Picker.Item label={`-- ${category} --`} value={null} enabled={false} />
            {medications.map((med) => (
              <Picker.Item label={med.name} value={med} key={med.id} />
            ))}
          </React.Fragment>
        ))}
      </Picker>

      {selectedMedication && (
        <View style={styles.medicationDetails}>
          <Text style={styles.label}>Dosagem: {selectedMedication.dosage}</Text>
          <Text style={styles.label}>Indicações: {selectedMedication.indications}</Text>
          <Text style={styles.label}>Contraindicações: {selectedMedication.contraindications}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calcular Dosagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CalculadoraMedicamentos;
