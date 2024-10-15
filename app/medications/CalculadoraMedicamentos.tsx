// app/medications/CalculadoraMedicamentos.tsx

import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';

import { calculateDosage } from './LogicaMedicamentos';
import styles from './styles/MedicamentosStyles';
import { calcularIdade } from '../../utils/idadeCalculator';
import { useMedicaments } from '../context/MedicamentsContext';

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

interface DosageResult {
  medicamento: string;
  dosage: string;
  frequency: string;
  contraindications?: string;
}

type PatientData = {
  patient: any;
  doctor: any;
  attendance: any;
  vitals: any;
  allergies: any;
  medication?: string; // Add this line to include the medication property
};

const CalculadoraMedicamentos: React.FC<{ patientId: string }> = ({ patientId }) => {
  const { fetchDataForMedicationCalculator } = useMedicaments();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [dosageResults, setDosageResults] = useState<DosageResult[]>([]);

  useEffect(() => {
    if (patientId) {
      loadPatientData(patientId);
    }
  }, [patientId]);

  const loadPatientData = async (patientId: string) => {
    try {
      const data = await fetchDataForMedicationCalculator(patientId);
      if (data) {
        setPatientData(data);
      } else {
        throw new Error('Dados do paciente não encontrados.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar dados do paciente: ' + (error as Error).message);
    }
  };

  const handleCalculate = () => {
    if (!patientData || !selectedMedication) {
      Alert.alert(
        'Erro',
        'Por favor, complete os cadastros ou selecione um medicamento para calcular a dosagem.'
      );
      return;
    }

    const results = calculateDosage({
      patient: patientData.patient,
      doctor: patientData.doctor,
      attendance: patientData.attendance,
      vitals: patientData.vitals,
      allergies: patientData.allergies,
    });

    const formattedResults = results.map((result) => ({
      medicamento: result.medicamento || '',
      dosage: result.dosage || '',
      frequency: result.frequency || '',
      contraindications: result.contraindications || '',
    }));

    setDosageResults(formattedResults);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cálculo de Medicamentos</Text>

      {patientData ? (
        <>
          <Text style={styles.label}>Nome do Paciente: {patientData.patient.name}</Text>
          <Text style={styles.label}>
            Idade: {calcularIdade(new Date(patientData.patient.birth_date), 'years')}
          </Text>
          <Text style={styles.label}>Nome do Médico: {patientData.doctor?.name}</Text>

          <Text style={styles.sectionTitle}>Selecione o Medicamento</Text>
          <Picker
            selectedValue={selectedMedication}
            onValueChange={(itemValue) => setSelectedMedication(itemValue)}
            style={styles.picker}
          >
            {Object.entries(medicationsList).map(([category, medications]) => (
              <React.Fragment key={category}>
                <Picker.Item label={`-- ${category} --`} value={null} enabled={false} />
                {medications.map((med) => (
                  <Picker.Item label={med.name} value={med.name} key={med.id} />
                ))}
              </React.Fragment>
            ))}
          </Picker>

          {selectedMedication && (
            <View style={styles.medicationDetails}>
              {Object.entries(medicationsList).map(([category, medications]) =>
                medications.map((med) =>
                  med.name === selectedMedication ? (
                    <React.Fragment key={med.id}>
                      <Text style={styles.label}>Dosagem: {med.dosage}</Text>
                      <Text style={styles.label}>Indicações: {med.indications}</Text>
                      <Text style={styles.label}>Contraindicações: {med.contraindications}</Text>
                    </React.Fragment>
                  ) : null
                )
              )}
            </View>
          )}
        </>
      ) : (
        <Text style={styles.label}>Carregando dados do paciente...</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calcular Dosagem</Text>
      </TouchableOpacity>

      {dosageResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Resultados da Dosagem</Text>
          {dosageResults.map((result, index) => (
            <View key={index} style={styles.resultItem}>
              <Text>Medicamento: {result.medicamento}</Text>
              <Text>Dosagem: {result.dosage}</Text>
              <Text>Frequência: {result.frequency}</Text>
              {result.contraindications && (
                <Text>Contraindicações: {result.contraindications}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CalculadoraMedicamentos;