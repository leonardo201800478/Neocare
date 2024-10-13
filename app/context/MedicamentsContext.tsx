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

// Definição do contexto
type MedicamentsContextType = {
  medications: Medication[];
  fetchMedicationsByPatient: (patientId: string) => Promise<void>;
  addMedication: (medication: Omit<Medication, 'id' | 'created_at'>) => Promise<void>; // Função de cadastro
  calculateDosage: (data: any) => any[]; // Função de cálculo de dosagem
};

const MedicamentsContext = createContext<MedicamentsContextType | undefined>(undefined);

export const MedicamentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { supabaseConnector } = useSystem();
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

  return (
    <MedicamentsContext.Provider
      value={{ medications, fetchMedicationsByPatient, addMedication, calculateDosage }}>
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
