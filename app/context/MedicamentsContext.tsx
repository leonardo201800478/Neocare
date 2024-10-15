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

// Definição do contexto
type MedicamentsContextType = {
  medications: Medication[];
  fetchDataForMedicationCalculator: (patientId: string) => Promise<any>;
  addMedication: (medication: Omit<Medication, 'id' | 'created_at'>) => Promise<void>;
  fetchMedicationsByPatient: (patientId: string) => Promise<Medication[]>;
  fetchMedicationsByDoctor: (doctorId: string) => Promise<Medication[]>;
  generatePrescription: (medicationId: string) => Promise<any>;
};

const MedicamentsContext = createContext<MedicamentsContextType | undefined>(undefined);

export const MedicamentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { db, supabaseConnector } = useSystem();
  const [medications, setMedications] = useState<Medication[]>([]);

  // Função para buscar os dados necessários para a calculadora de medicamentos
  const fetchDataForMedicationCalculator = async (patientId: string) => {
    try {
      // Busca os dados do paciente
      const patientQuery = await db
        .selectFrom('patients')
        .selectAll()
        .where('id', '=', patientId)
        .execute();
      if (!patientQuery.length) {
        throw new Error('Paciente não encontrado');
      }

      // Busca os atendimentos do paciente
      const attendancesQuery = await db
        .selectFrom('attendances')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();
      const attendance = attendancesQuery[0] as Attendance;

      // Busca os sinais vitais do paciente
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

      // Busca as alergias do paciente
      const allergiesQuery = await db
        .selectFrom('allergies')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();
      const allergies = allergiesQuery.length > 0 ? (allergiesQuery[0] as Allergies) : {};

      // Se houver um atendimento, busca o médico relacionado
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
      throw new Error('Erro ao buscar dados para a calculadora.');
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

      if (error) {
        throw new Error('Erro ao cadastrar o medicamento.');
      }

      if (data && data[0]) {
        setMedications((prev) => [...prev, data[0]]);
      }
    } catch (error) {
      console.error('Erro ao cadastrar medicamento:', error);
      throw error;
    }
  };

  // Função para buscar medicamentos por paciente
  const fetchMedicationsByPatient = async (patientId: string): Promise<Medication[]> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('medications')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        throw new Error('Erro ao buscar medicamentos do paciente.');
      }

      return data as Medication[];
    } catch (error) {
      console.error('Erro ao buscar medicamentos do paciente:', error);
      throw error;
    }
  };

  // Função para buscar medicamentos gerados por um determinado médico
  const fetchMedicationsByDoctor = async (doctorId: string): Promise<Medication[]> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('medications')
        .select('*')
        .eq('doctor_id', doctorId);

      if (error) {
        throw new Error('Erro ao buscar medicamentos por médico.');
      }

      return data as Medication[];
    } catch (error) {
      console.error('Erro ao buscar medicamentos por médico:', error);
      throw error;
    }
  };

  // Função para gerar uma receita com os dados do paciente e do médico
  const generatePrescription = async (medicationId: string) => {
    try {
      const medicationQuery = await supabaseConnector.client
        .from('medications')
        .select('*')
        .eq('id', medicationId)
        .single();

      if (medicationQuery.error || !medicationQuery.data) {
        throw new Error('Medicamento não encontrado');
      }
      const medication = medicationQuery.data;

      const [patientQuery, doctorQuery] = await Promise.all([
        db.selectFrom('patients').selectAll().where('id', '=', medication.patient_id).execute(),
        db.selectFrom('doctors').selectAll().where('id', '=', medication.doctor_id).execute(),
      ]);

      const patient = patientQuery[0];
      const doctor = doctorQuery[0];

      if (!patient || !doctor) {
        throw new Error('Informações do paciente ou médico não encontradas');
      }

      return {
        medicationName: medication.name,
        dosage: medication.dosage_info,
        patientName: patient.name,
        birthDate: patient.birth_date,
        cpf: patient.cpf,
        doctorName: doctor.name,
      };
    } catch (error) {
      console.error('Erro ao gerar receita:', error);
      throw new Error('Erro ao gerar receita.');
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
