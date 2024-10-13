// app/context/MedicationsContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Medication } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

// Define o tipo para o contexto de medicamentos
type MedicationsContextType = {
  medications: Medication[] | null;
  setMedications: (medications: Medication[] | null) => void;
  createMedication: (
    medication: Partial<Medication>,
    patientId: string,
    doctorId: string
  ) => Promise<void>;
  updateMedication: (medicationId: string, updatedFields: Partial<Medication>) => Promise<void>;
  fetchMedicationsByPatient: (patientId: string) => Promise<Medication[] | null>;
};

// Inicializa o contexto
const MedicationsContext = createContext<MedicationsContextType | undefined>(undefined);

// Provider de Medications
export const MedicationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[] | null>(null);
  const { db, supabaseConnector } = useSystem();

  // Função para criar um novo medicamento
  const createMedication = async (
    medication: Partial<Medication>,
    patientId: string,
    doctorId: string
  ) => {
    if (!patientId || !doctorId || !medication.name) {
      throw new Error('Nome do medicamento, patientId e doctorId são obrigatórios.');
    }

    try {
      // Gera um ID único para o medicamento
      const medicationId = uuid();

      const newMedication: Medication = {
        id: medicationId,
        patient_id: patientId,
        doctor_id: doctorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: medication.name || null,
        dosage_info: medication.dosage_info || null,
        max_dosage_info: medication.max_dosage_info || null,
        indication: medication.indication || null,
        contraindications: medication.contraindications || null,
        instructions: medication.instructions || null,
      };

      // Insere no banco de dados local
      await db.insertInto('medications').values(newMedication).execute();
      setMedications((prev) => (prev ? [...prev, newMedication] : [newMedication]));

      // Tenta sincronizar com o Supabase
      const { error } = await supabaseConnector.client.from('medications').insert([newMedication]);

      if (error) {
        console.warn('Erro ao sincronizar medicamento com o Supabase:', error.message);
        throw new Error(
          'Medicamento criado localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Medicamento sincronizado com o Supabase:', medicationId);
    } catch (error) {
      console.error('Erro ao criar o medicamento:', error);
      throw new Error('Falha ao criar medicamento.');
    }
  };

  // Função para atualizar um medicamento existente
  const updateMedication = async (medicationId: string, updatedFields: Partial<Medication>) => {
    if (!medicationId) {
      throw new Error('O ID do medicamento é obrigatório para atualizar.');
    }

    try {
      // Atualiza o registro localmente
      await db
        .updateTable('medications')
        .set(updatedFields)
        .where('id', '=', medicationId)
        .execute();

      // Tenta sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('medications')
        .update(updatedFields)
        .eq('id', medicationId);

      if (error) {
        console.warn(
          'Erro ao sincronizar atualização do medicamento com o Supabase:',
          error.message
        );
        throw new Error(
          'Medicamento atualizado localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Medicamento atualizado e sincronizado com o Supabase:', medicationId);
    } catch (error) {
      console.error('Erro ao atualizar o medicamento:', error);
      throw new Error('Falha ao atualizar medicamento.');
    }
  };

  // Função para buscar medicamentos por ID de paciente
  const fetchMedicationsByPatient = async (patientId: string): Promise<Medication[] | null> => {
    if (!patientId) {
      throw new Error('O ID do paciente é obrigatório.');
    }

    try {
      const medications = await db
        .selectFrom('medications')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();

      setMedications(medications);

      return medications;
    } catch (error) {
      console.error('Erro ao buscar medicamentos por paciente:', error);
      throw new Error('Falha ao buscar medicamentos por paciente.');
    }
  };

  return (
    <MedicationsContext.Provider
      value={{
        medications,
        setMedications,
        createMedication,
        updateMedication,
        fetchMedicationsByPatient,
      }}>
      {children}
    </MedicationsContext.Provider>
  );
};

// Hook para acessar o contexto de Medications
export const useMedications = (): MedicationsContextType => {
  const context = useContext(MedicationsContext);
  if (!context) {
    throw new Error('useMedications deve ser usado dentro de um MedicationsProvider.');
  }
  return context;
};
