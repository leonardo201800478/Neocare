import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Patient } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type PatientContextType = {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  createPatient: (patient: Partial<Patient>, doctorId: string) => Promise<void>;
  fetchPatientById: (patientId: string) => Promise<Patient | null>;
};

// Inicializando o contexto de pacientes
const PatientContext = createContext<PatientContextType | undefined>(undefined);

// Provedor de contexto que envolve a aplicação
export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { supabaseConnector } = useSystem();

  /**
   * Função para criar um paciente
   * @param patient - Dados parciais do paciente
   * @param doctorId - ID do médico que está cadastrando o paciente
   */
  const createPatient = async (patient: Partial<Patient>, doctorId: string) => {
    if (!patient.name || !patient.cpf || !doctorId) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    try {
      // Gerar um UUID para o paciente
      const patientId = uuid();

      // Montar o objeto do paciente sem o campo 'created_by'
      const newPatient = {
        id: patientId,
        name: patient.name,
        cpf: patient.cpf,
        birth_date: patient.birth_date ?? null,
        gender: patient.gender ?? null,
        phone_number: patient.phone_number ?? null,
        address: patient.address ?? null,
        city: patient.city ?? null,
        uf: patient.uf ?? null,
        zip_code: patient.zip_code ?? null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        doctor_id: doctorId, // Associando o médico ao paciente no campo correto
      };

      // Inserir o novo paciente no banco de dados do Supabase
      const { data, error } = await supabaseConnector.client.from('patients').insert([newPatient]);

      if (error) {
        console.error('Erro ao inserir o paciente no Supabase:', error.message);
        throw new Error('Ocorreu um erro ao cadastrar o paciente no Supabase.');
      }

      console.log('Paciente cadastrado com sucesso no Supabase:', data);
      setSelectedPatient(newPatient);
    } catch (error) {
      console.error('Erro ao criar o paciente:', error);
      throw new Error('Ocorreu um erro ao cadastrar o paciente.');
    }
  };

  /**
   * Função para buscar um paciente pelo ID
   * @param patientId - ID do paciente a ser buscado
   * @returns Retorna o paciente ou null se não for encontrado
   */
  const fetchPatientById = async (patientId: string): Promise<Patient | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single();

      if (error) {
        console.error('Erro ao buscar paciente:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      return null;
    }
  };

  return (
    <PatientContext.Provider
      value={{ selectedPatient, setSelectedPatient, createPatient, fetchPatientById }}>
      {children}
    </PatientContext.Provider>
  );
};

// Hook para acessar o contexto de pacientes
export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient deve ser usado dentro de um PatientProvider');
  }
  return context;
};
