// app/attendences/MedicalRecordsContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';

import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type MedicalRecord = {
  id: string;
  attendance_id: string;
  vital_id: string;
  symptom_id: string;
  nutrition_id: string;
  doctor_id: string;
  patient_id: string;
  created_at: string;
  updated_at: string;
};

type MedicalRecordsContextType = {
  createMedicalRecord: (
    attendanceId: string,
    vitalId: string,
    symptomId: string,
    nutritionId: string,
    doctorId: string,
    patientId: string
  ) => Promise<{ medicalRecordId: string | null; error: string | null }>;
  updateMedicalRecord: (
    medicalRecordId: string,
    updatedFields: Partial<MedicalRecord>
  ) => Promise<{ error: string | null }>;
  fetchMedicalRecordByPatient: (patientId: string) => Promise<MedicalRecord | null>;
  fetchMedicalRecordById: (medicalRecordId: string) => Promise<MedicalRecord | null>;
};

const MedicalRecordsContext = createContext<MedicalRecordsContextType | undefined>(undefined);

export const MedicalRecordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { db, supabaseConnector } = useSystem();

  // Função para criar um novo registro na tabela medical_records
  const createMedicalRecord = async (
    attendanceId: string,
    vitalId: string,
    symptomId: string,
    nutritionId: string,
    doctorId: string,
    patientId: string
  ): Promise<{ medicalRecordId: string | null; error: string | null }> => {
    if (!attendanceId || !vitalId || !symptomId || !nutritionId || !doctorId || !patientId) {
      return {
        medicalRecordId: null,
        error:
          'Todos os IDs (attendance, vital, symptom, nutrition, doctor e patient) são obrigatórios.',
      };
    }

    try {
      const medicalRecordId = uuid();

      const newMedicalRecord: MedicalRecord = {
        id: medicalRecordId,
        attendance_id: attendanceId,
        vital_id: vitalId,
        symptom_id: symptomId,
        nutrition_id: nutritionId,
        doctor_id: doctorId,
        patient_id: patientId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Salvar localmente
      await db.insertInto('medical_records').values(newMedicalRecord).execute();

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('medical_records')
        .insert([newMedicalRecord]);

      if (error) {
        return {
          medicalRecordId: null,
          error: 'Erro ao sincronizar prontuário com o Supabase: ' + error.message,
        };
      }

      return { medicalRecordId, error: null };
    } catch (error) {
      return {
        medicalRecordId: null,
        error: 'Erro ao criar prontuário: ' + (error as Error).message,
      };
    }
  };

  // Função para atualizar campos do prontuário
  const updateMedicalRecord = async (
    medicalRecordId: string,
    updatedFields: Partial<MedicalRecord>
  ): Promise<{ error: string | null }> => {
    try {
      // Atualizar localmente
      await db
        .updateTable('medical_records')
        .set(updatedFields)
        .where('id', '=', medicalRecordId)
        .execute();

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('medical_records')
        .update(updatedFields)
        .eq('id', medicalRecordId);

      if (error) {
        return { error: 'Erro ao atualizar prontuário no Supabase: ' + error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao atualizar prontuário: ' + (error as Error).message };
    }
  };

  // Outras funções omitidas para o exemplo...

  return (
    <MedicalRecordsContext.Provider
      value={{
        createMedicalRecord,
        updateMedicalRecord, // Adiciona a função updateMedicalRecord ao contexto
        fetchMedicalRecordByPatient: async () => null, // Implementação omitida
        fetchMedicalRecordById: async () => null, // Implementação omitida
      }}>
      {children}
    </MedicalRecordsContext.Provider>
  );
};

export const useMedicalRecords = (): MedicalRecordsContextType => {
  const context = useContext(MedicalRecordsContext);
  if (!context) {
    throw new Error('useMedicalRecords deve ser usado dentro de um MedicalRecordsProvider');
  }
  return context;
};
