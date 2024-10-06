// app/context/PatientContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type PatientContextType = {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  createPatient: (patient: Partial<Patient>, doctorId: string) => Promise<void>;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { db } = useSystem();

  const createPatient = async (patient: Partial<Patient>, doctorId: string) => {
    if (!patient.name || !patient.cpf || !doctorId) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    try {
      // Gerar um UUID para o novo paciente
      const patientId = uuid();

      // Criar um novo registro do paciente
      await db
        .insertInto('patients')
        .values({
          id: patientId,
          name: patient.name,
          cpf: patient.cpf,
          birth_date: patient.birth_date,
          gender: patient.gender,
          phone_number: patient.phone_number,
          address: patient.address,
          city: patient.city,
          uf: patient.uf,
          zip_code: patient.zip_code,
          created_by: doctorId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          doctor_id: doctorId,
        })
        .execute();

      console.log('Paciente criado com sucesso:', patientId);
    } catch (error) {
      console.error('Erro ao criar o paciente:', error);
      throw new Error('Ocorreu um erro ao cadastrar o paciente.');
    }
  };

  return (
    <PatientContext.Provider value={{ selectedPatient, setSelectedPatient, createPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient deve ser usado dentro de um PatientProvider');
  }
  return context;
};
