// app/context/MedicamentsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

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

// Definição do tipo Paciente e Médico
type Patient = {
  id: string;
  name: string;
  birth_date: string;
  cpf: string;
};

type Doctor = {
  id: string;
  name: string;
};

type Attendance = {
  hipertensao?: string;
  doenca_hepatica?: string;
  deficiencia_g6pd?: string;
  doctor_id?: string;
};

type Vitals = {
  peso_kg: number;
  comprimento_cm: number;
};

type Allergies = Record<string, boolean | string>;

type ManualData = {
  patient?: Patient;
  doctor?: Doctor;
  attendance?: Attendance;
  vitals?: Vitals;
  allergies?: Allergies;
};

// Definição do contexto
type MedicamentsContextType = {
  medications: Medication[];
  fetchDataForMedicationCalculator: (patientId: string) => Promise<any>;
  addMedication: (medication: Omit<Medication, 'id' | 'created_at'>) => Promise<void>;
  fetchMedicationsByPatient: (patientId: string) => Promise<Medication[]>;
  fetchMedicationsByDoctor: (doctorId: string) => Promise<Medication[]>;
  generatePrescription: (medicationId: string) => Promise<any>;
  provideManualData: (manualData: ManualData) => void;
};

const MedicamentsContext = createContext<MedicamentsContextType | undefined>(undefined);

export const MedicamentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { db, supabaseConnector } = useSystem();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [manualData, setManualData] = useState<ManualData>({});

  // Função para buscar os dados necessários para a calculadora de medicamentos
  const fetchDataForMedicationCalculator = async (patientId: string) => {
    try {
      const patientQuery = await db
        .selectFrom('patients')
        .selectAll()
        .where('id', '=', patientId)
        .execute();
      if (!patientQuery.length) throw new Error('Paciente não encontrado');
      console.log('Resultado da consulta de paciente:', patientQuery);

      const attendancesQuery = await db
        .selectFrom('attendances')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();
      const attendance = attendancesQuery[0] as Attendance;

      const vitalsQuery = await db
        .selectFrom('attendance_vitals')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();
      const vitals =
        vitalsQuery.length > 0
          ? {
              peso_kg: vitalsQuery[0].peso_kg ? parseFloat(vitalsQuery[0].peso_kg) : 0,
              comprimento_cm: vitalsQuery[0].comprimento_cm
                ? parseFloat(vitalsQuery[0].comprimento_cm)
                : 0,
            }
          : null;

      const allergiesQuery = await db
        .selectFrom('allergies')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();
      const allergies = allergiesQuery.length > 0 ? (allergiesQuery[0] as Allergies) : {};

      let doctor = null;
      if (attendance?.doctor_id) {
        const doctorQuery = await db
          .selectFrom('doctors')
          .selectAll()
          .where('id', '=', attendance.doctor_id)
          .execute();
        doctor = doctorQuery.length > 0 ? doctorQuery[0] : null;
      }

      return {
        patient: patientQuery[0],
        attendance,
        vitals,
        allergies,
        doctor,
      };
    } catch (error) {
      console.error('Erro ao buscar dados para a calculadora de medicamentos:', error);
      return {
        ...manualData,
      };
    }
  };

  // Função para adicionar novo medicamento à tabela 'medications'
  const addMedication = async (medication: Omit<Medication, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabaseConnector.client.from('medications').insert([
        {
          ...medication,
          id: uuid(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw new Error('Erro ao cadastrar o medicamento.');

      if (data && data[0]) setMedications((prev) => [...prev, data[0]]);
    } catch (error) {
      console.error('Erro ao cadastrar medicamento:', error);
      throw error;
    }
  };

  // Função para fornecer dados manuais, caso não estejam disponíveis no banco
  const provideManualData = (data: ManualData) => {
    setManualData((prevData) => ({ ...prevData, ...data }));
  };

  // Função para buscar medicamentos por paciente
  const fetchMedicationsByPatient = async (patientId: string): Promise<Medication[]> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('medications')
        .select('*')
        .eq('patient_id', patientId);

      if (error) throw new Error('Erro ao buscar medicamentos por paciente.');

      return data as Medication[];
    } catch (error) {
      console.error('Erro ao buscar medicamentos por paciente:', error);
      throw error;
    }
  };

  // Função para buscar medicamentos por médico
  const fetchMedicationsByDoctor = async (doctorId: string): Promise<Medication[]> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('medications')
        .select('*')
        .eq('doctor_id', doctorId);

      if (error) throw new Error('Erro ao buscar medicamentos por médico.');

      return data as Medication[];
    } catch (error) {
      console.error('Erro ao buscar medicamentos por médico:', error);
      throw error;
    }
  };

  // Função para gerar prescrição
  const generatePrescription = async (medicationId: string): Promise<any> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('prescriptions')
        .insert([{ medication_id: medicationId }]);

      if (error) throw new Error('Erro ao gerar prescrição.');

      return data;
    } catch (error) {
      console.error('Erro ao gerar prescrição:', error);
      throw error;
    }
  };

  return (
    <MedicamentsContext.Provider
      value={{
        medications,
        fetchDataForMedicationCalculator,
        addMedication,
        fetchMedicationsByPatient,
        fetchMedicationsByDoctor,
        generatePrescription,
        provideManualData,
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
