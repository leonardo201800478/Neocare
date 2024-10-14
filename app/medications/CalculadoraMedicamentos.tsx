// app/medications/CalculadoraMedicamentos.tsx

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
      dosage: '20-40 mg/kg/dia, dividido em 2-3 doses',
      indications: 'Infecções bacterianas, como otite média e infecções respiratórias',
      contraindications: 'Alergia à penicilina',
    },
    {
      id: 7,
      name: 'Cotrimoxazol',
      dosage:
        '8 mg/kg/dia de trimetoprima para crianças; 160-800 mg para adultos, duas vezes ao dia',
      indications: 'Infecções bacterianas, como infecções do trato urinário',
      contraindications: 'Alergia à sulfa. Usar com cautela em diabetes',
    },
    {
      id: 8,
      name: 'Eritromicina',
      dosage: '30-50 mg/kg/dia, dividido em 4 doses',
      indications: 'Infecções bacterianas como faringite estreptocócica e pneumonia',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 9,
      name: 'Cefalexina',
      dosage: '25-50 mg/kg por dia, dividido em 4 doses',
      indications: 'Tratamento de infecções bacterianas',
      contraindications: 'Alergia a cefalosporinas',
    },
    {
      id: 10,
      name: 'Claritromicina',
      dosage: '7,5 mg/kg a cada 12 horas',
      indications: 'Infecções bacterianas',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 11,
      name: 'Metronidazol (oral)',
      dosage: '7,5 mg/kg por dose, a cada 8 horas',
      indications: 'Tratamento de infecções bacterianas e parasitárias',
      contraindications: 'Alergia ao metronidazol',
    },
    {
      id: 12,
      name: 'Prednisolona (oral)',
      dosage: '1-2 mg/kg por dia, dividido em 1-2 doses',
      indications: 'Inflamação e condições alérgicas',
      contraindications: 'Hipertensão, diabetes',
    },
  ],
  'Sem Tarja': [
    {
      id: 13,
      name: 'Soluções de Reidratação Oral (SRO)',
      dosage: '50-100 ml/kg, dependendo do nível de desidratação',
      indications: 'Reidratação em casos de desidratação leve a moderada',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 14,
      name: 'Ibuprofeno',
      dosage: '5-10 mg/kg por dose, a cada 6-8 horas (máximo: 40 mg/kg/dia)',
      indications: 'Inflamação, dor e febre',
      contraindications: 'Hipertensão, alergia a AINEs',
    },
    {
      id: 15,
      name: 'Paracetamol',
      dosage: '10 mg/kg por dose, até 4 vezes ao dia (máximo: 40 mg/kg/dia)',
      indications: 'Alívio da dor e febre',
      contraindications: 'Doença hepática',
    },
    {
      id: 16,
      name: 'Albendazol',
      dosage: '400 mg dose única (acima de 2 anos); 200 mg (menores de 2 anos)',
      indications: 'Tratamento de infecções por vermes',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 17,
      name: 'Mebendazol',
      dosage: '100 mg, duas vezes ao dia por 3 dias',
      indications: 'Tratamento de infecções parasitárias',
      contraindications: 'Não recomendado para menores de 2 anos',
    },
    {
      id: 18,
      name: 'Nistatina (oral)',
      dosage: '100.000 UI, 4 vezes ao dia',
      indications: 'Tratamento de candidíase oral',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 19,
      name: 'Permetrina/Benzoato de Benzila',
      dosage: 'Aplicar topicamente conforme necessário',
      indications: 'Tratamento de escabiose e pediculose',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 20,
      name: 'Salbutamol (xarope ou inalatório)',
      dosage: '0,1-0,2 mg/kg por dose, até 3-4 vezes ao dia',
      indications: 'Tratamento de broncoespasmo em asma ou DPOC',
      contraindications: 'Alergia ao salbutamol',
    },
    {
      id: 21,
      name: 'Clorexidina Tópica',
      dosage: 'Aplicar conforme necessário para limpeza/desinfecção',
      indications: 'Antisséptico para limpeza de feridas',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 22,
      name: 'Tetraciclina (pomada oftálmica)',
      dosage: 'Aplicar 2-4 vezes ao dia',
      indications: 'Infecções oculares bacterianas',
      contraindications: 'Alergia à tetraciclina',
    },
    {
      id: 23,
      name: 'Povidona Iodada',
      dosage: 'Aplicar conforme necessário',
      indications: 'Antisséptico para feridas',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 24,
      name: 'Lidocaína Gel',
      dosage: 'Aplicar uma pequena quantidade na área afetada',
      indications: 'Alívio de dor local',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 25,
      name: 'Sulfacetamida (colírio)',
      dosage: '1-2 gotas em cada olho, a cada 3-4 horas',
      indications: 'Infecções oculares',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 26,
      name: 'Permetrina 1% (xampu ou loção)',
      dosage: 'Aplicar conforme necessário para tratamento de piolhos',
      indications: 'Tratamento de piolhos',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 27,
      name: 'Miconazol (creme ou pomada)',
      dosage: 'Aplicar 2 vezes ao dia',
      indications: 'Tratamento de infecções fúngicas',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 28,
      name: 'Salicilato de Metila',
      dosage: 'Aplicar topicamente conforme necessário para alívio da dor',
      indications: 'Alívio de dores musculares e articulares',
      contraindications: 'Nenhuma específica',
    },
    {
      id: 29,
      name: 'Corticosteroides Tópicos (como Hidrocortisona Creme)',
      dosage: 'Aplicar 1-2 vezes ao dia',
      indications: 'Tratamento de inflamação e prurido cutâneo',
      contraindications: 'Nenhuma específica',
    },
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
