// app/context/MedicamentsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { useSystem } from '../../powersync/PowerSync';

// Definição do tipo Medication
type Medication = {
  id: string;
  name: string;
  dosage_info: string;
  max_dosage_info?: string;
  indication: string;
  contraindications?: string;
  patient_id: string;
  doctor_id: string;
  created_at: string;
  updated_at?: string;
};

// Definição do tipo Prontuário Médico (Medical Record)
type MedicalRecord = {
  id: string;
  attendance: any; // Registro completo da tabela 'attendances'
  vitals: any; // Registro completo da tabela 'attendance_vitals'
  symptoms: any; // Registro completo da tabela 'attendance_symptoms'
  nutrition: any; // Registro completo da tabela 'attendance_nutrition_development'
  doctor: any; // Informação do médico
  patient: any; // Informação do paciente
  created_at: string;
};

// Definição do contexto
type MedicamentsContextType = {
  medications: Medication[];
  fetchMedicationsByPatient: (patientId: string) => Promise<void>;
  addMedication: (medication: Omit<Medication, 'id' | 'created_at'>) => Promise<void>; // Função de cadastro
  calculateDosage: (data: any) => any[]; // Função de cálculo de dosagem
  fetchCompleteMedicalRecord: (medicalRecordId: string) => Promise<MedicalRecord | null>; // Nova função para buscar prontuário completo
};

const MedicamentsContext = createContext<MedicamentsContextType | undefined>(undefined);

export const MedicamentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { db, supabaseConnector } = useSystem();
  const [medications, setMedications] = useState<Medication[]>([]);

  // Função para buscar medicamentos por paciente
  const fetchMedicationsByPatient = async (patientId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('medications')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        console.error('Erro ao buscar medicamentos:', error.message);
        return;
      }

      if (data) {
        setMedications(data as Medication[]);
      }
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  };

  // Função para adicionar novo medicamento à tabela 'medications'
  const addMedication = async (medication: Omit<Medication, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabaseConnector.client.from('medications').insert([
        {
          ...medication,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Erro ao adicionar medicamento:', error.message);
        throw new Error('Erro ao cadastrar o medicamento.');
      }

      if (data) {
        setMedications((prev) => [...prev, data[0]]);
      }
    } catch (error) {
      console.error('Erro ao cadastrar medicamento:', error);
    }
  };

  // Função de cálculo de dosagem para medicamentos
  const calculateDosage = (data: any): any[] => {
    const { patient, attendance, vitals } = data;
    const dosages = [];

    // Exemplo de cálculo para Amoxicilina
    if (attendance?.hipertensao === 'no' && !attendance?.doenca_hepatica) {
      const dosageAmoxicilina = (20 * vitals.peso_kg).toFixed(2); // Cálculo por kg
      dosages.push({
        medicamento: 'Amoxicilina',
        dosage: `${dosageAmoxicilina} mg`,
        frequency: 'Dividido em 2-3 doses',
      });
    }

    // Adicionar lógica para outros medicamentos conforme as condições clínicas
    return dosages;
  };

  // Função para buscar o prontuário médico completo
  const fetchCompleteMedicalRecord = async (
    medicalRecordId: string
  ): Promise<MedicalRecord | null> => {
    try {
      const medicalRecord = await db
        .selectFrom('medical_records')
        .selectAll()
        .where('id', '=', medicalRecordId)
        .execute();

      if (medicalRecord.length === 0) {
        console.error('Prontuário não encontrado');
        return null;
      }

      const record = medicalRecord[0];

      // Buscar informações de atendimento, sinais vitais, sintomas, nutrição, médico e paciente
      const [attendance, vitals, symptoms, nutrition, doctor, patient] = await Promise.all([
        db.selectFrom('attendances').selectAll().where('id', '=', record.attendance_id).execute(),
        db.selectFrom('attendance_vitals').selectAll().where('id', '=', record.vital_id).execute(),
        db
          .selectFrom('attendance_symptoms')
          .selectAll()
          .where('id', '=', record.symptom_id)
          .execute(),
        db
          .selectFrom('attendance_nutrition_development')
          .selectAll()
          .where('id', '=', record.nutrition_id)
          .execute(),
        db.selectFrom('doctors').selectAll().where('id', '=', record.doctor_id).execute(),
        db.selectFrom('patients').selectAll().where('id', '=', record.patient_id).execute(),
      ]);

      // Utilizando os dados do paciente
      return {
        id: record.id,
        attendance: attendance[0],
        vitals: vitals[0],
        symptoms: symptoms[0],
        nutrition: nutrition[0],
        doctor: doctor[0],
        patient: patient[0], // Agora o paciente é retornado corretamente
        created_at: record.created_at ?? '',
      };
    } catch (error) {
      console.error('Erro ao buscar o prontuário completo:', error);
      return null;
    }
  };

  return (
    <MedicamentsContext.Provider
      value={{
        medications,
        fetchMedicationsByPatient,
        addMedication,
        calculateDosage,
        fetchCompleteMedicalRecord, // Incluímos a função para buscar o prontuário completo
      }}>
      {children}
    </MedicamentsContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de medicamentos
export const useMedicaments = (): MedicamentsContextType => {
  const context = useContext(MedicamentsContext);
  if (!context) {
    throw new Error('useMedicaments deve ser usado dentro de um MedicamentsProvider');
  }
  return context;
};
