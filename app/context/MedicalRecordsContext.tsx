// app/context/MedicalRecordsContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type MedicalRecord = {
  id: string;
  attendance_id: string | null;
  vital_id: string | null;
  symptom_id: string | null;
  nutrition_id: string | null;
  doctor_id: string | null;
  patient_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  doctor: { name?: string };
  patient: { name?: string };
  attendance: any;
  vitals: any;
  symptoms: any;
  nutrition: any;
};

type MedicalRecordsContextType = {
  createMedicalRecord: (
    args: Record<string, string>
  ) => Promise<{ medicalRecordId: string | null; error: string | null }>;
  updateMedicalRecord: (
    medicalRecordId: string,
    updatedFields: Partial<MedicalRecord>
  ) => Promise<{ error: string | null }>;
  fetchCompleteMedicalRecord: (medicalRecordId: string) => Promise<MedicalRecord | null>;
  fetchMedicalRecordsByPatient: (patientId: string) => Promise<MedicalRecord[] | null>;
  fetchMedicalRecordsByDoctor: (doctorId: string) => Promise<MedicalRecord[] | null>;
};

const MedicalRecordsContext = createContext<MedicalRecordsContextType | undefined>(undefined);

export const MedicalRecordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { supabaseConnector } = useSystem(); // Acessando o Supabase via Powersync

  const createMedicalRecord = async (
    args: Record<string, string>
  ): Promise<{ medicalRecordId: string | null; error: string | null }> => {
    const { attendanceId, vitalId, symptomId, nutritionId, doctorId, patientId } = args;

    // Validação para garantir que todos os campos obrigatórios estão presentes
    if (!attendanceId || !vitalId || !symptomId || !nutritionId || !doctorId || !patientId) {
      return {
        medicalRecordId: null,
        error:
          'Todos os campos (attendanceId, vitalId, symptomId, nutritionId, doctorId, patientId) são obrigatórios.',
      };
    }

    try {
      const medicalRecordId = uuid(); // Gera o ID para o novo prontuário

      const newMedicalRecord = {
        id: medicalRecordId,
        attendance_id: attendanceId,
        vital_id: vitalId,
        symptom_id: symptomId,
        nutrition_id: nutritionId,
        doctor_id: doctorId,
        patient_id: patientId,
        created_at: new Date().toISOString(), // Define a data de criação
        updated_at: new Date().toISOString(), // Define a data de atualização
      };

      // Insere o novo prontuário no Supabase
      const { data, error } = await supabaseConnector.client
        .from('medical_records')
        .insert([newMedicalRecord]);

      if (error) {
        console.error('Erro ao inserir o prontuário médico no Supabase:', error.message);
        return { medicalRecordId: null, error: 'Erro ao criar prontuário médico.' };
      }

      console.log('Prontuário médico criado com sucesso no Supabase:', data);
      return { medicalRecordId, error: null };
    } catch (error) {
      console.error('Erro ao criar prontuário médico:', error);
      return { medicalRecordId: null, error: 'Erro ao criar prontuário médico.' };
    }
  };

  const updateMedicalRecord = async (
    medicalRecordId: string,
    updatedFields: Partial<MedicalRecord>
  ): Promise<{ error: string | null }> => {
    try {
      // Atualiza a data de atualização sempre que um campo for atualizado
      updatedFields.updated_at = new Date().toISOString();

      // Verifica se há campos a serem atualizados
      if (Object.keys(updatedFields).length === 0) {
        return { error: 'Nenhum campo a ser atualizado foi fornecido.' };
      }

      // Executa a atualização no Supabase
      const { data, error } = await supabaseConnector.client
        .from('medical_records')
        .update(updatedFields)
        .eq('id', medicalRecordId);

      if (error) {
        console.error('Erro ao atualizar prontuário médico no Supabase:', error.message);
        return { error: 'Erro ao atualizar prontuário médico.' };
      }

      console.log('Prontuário médico atualizado com sucesso no Supabase:', data);
      return { error: null };
    } catch (error) {
      console.error('Erro ao atualizar prontuário médico:', error);
      return { error: 'Erro ao atualizar prontuário médico.' };
    }
  };

  const fetchCompleteMedicalRecord = async (
    medicalRecordId: string
  ): Promise<MedicalRecord | null> => {
    try {
      // Buscar o registro principal de medical_records
      const { data: medicalRecord, error: medicalRecordError } = await supabaseConnector.client
        .from('medical_records')
        .select('*')
        .eq('id', medicalRecordId)
        .single();

      if (medicalRecordError || !medicalRecord) {
        console.error(
          'Erro ao buscar o prontuário médico no Supabase:',
          medicalRecordError?.message
        );
        return null;
      }

      // Buscar dados do médico
      const { data: doctor, error: doctorError } = await supabaseConnector.client
        .from('doctors')
        .select('name')
        .eq('id', medicalRecord.doctor_id)
        .single();

      if (doctorError) {
        console.error('Erro ao buscar o médico no Supabase:', doctorError.message);
      }

      // Buscar dados do paciente
      const { data: patient, error: patientError } = await supabaseConnector.client
        .from('patients')
        .select('name')
        .eq('id', medicalRecord.patient_id)
        .single();

      if (patientError) {
        console.error('Erro ao buscar o paciente no Supabase:', patientError.message);
      }

      // Buscar dados do atendimento
      const { data: attendance, error: attendanceError } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('id', medicalRecord.attendance_id)
        .single();

      if (attendanceError) {
        console.error('Erro ao buscar o atendimento no Supabase:', attendanceError.message);
      }

      // Buscar dados dos sinais vitais
      const { data: vitals, error: vitalsError } = await supabaseConnector.client
        .from('attendance_vitals')
        .select('*')
        .eq('id', medicalRecord.vital_id)
        .single();

      if (vitalsError) {
        console.error('Erro ao buscar sinais vitais no Supabase:', vitalsError.message);
      }

      // Buscar múltiplos dados de sintomas
      const { data: symptoms, error: symptomsError } = await supabaseConnector.client
        .from('attendance_symptoms')
        .select('*')
        .eq('id', medicalRecord.symptom_id); // Remove o .single() porque pode haver múltiplos registros

      if (symptomsError) {
        console.error('Erro ao buscar sintomas no Supabase:', symptomsError.message);
      }

      // Buscar dados de nutrição e desenvolvimento
      const { data: nutrition, error: nutritionError } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .select('*')
        .eq('id', medicalRecord.nutrition_id)
        .single();

      if (nutritionError) {
        console.error('Erro ao buscar dados de nutrição no Supabase:', nutritionError.message);
      }

      // Retornar todos os dados combinados
      return {
        id: medicalRecord.id,
        attendance_id: medicalRecord.attendance_id,
        vital_id: medicalRecord.vital_id,
        symptom_id: medicalRecord.symptom_id,
        nutrition_id: medicalRecord.nutrition_id,
        doctor_id: medicalRecord.doctor_id,
        patient_id: medicalRecord.patient_id,
        created_at: medicalRecord.created_at,
        updated_at: medicalRecord.updated_at,
        doctor: { name: doctor?.name || undefined },
        patient: { name: patient?.name || undefined },
        attendance: attendance || {},
        vitals: vitals || {},
        symptoms: symptoms || [], // Retorna uma lista de sintomas
        nutrition: nutrition || {},
      };
    } catch (error) {
      console.error('Erro ao buscar prontuário médico completo:', error);
      return null;
    }
  };

  const fetchMedicalRecordsByPatient = async (
    patientId: string
  ): Promise<MedicalRecord[] | null> => {
    try {
      // Buscar os registros médicos sem joins
      const { data: medicalRecords, error } = await supabaseConnector.client
        .from('medical_records')
        .select('*') // Apenas os dados da tabela medical_records
        .eq('patient_id', patientId);

      if (error) {
        console.error(
          'Erro ao buscar prontuários médicos por paciente no Supabase:',
          error.message
        );
        return null;
      }

      return medicalRecords;
    } catch (error) {
      console.error('Erro ao buscar prontuários médicos por paciente:', error);
      return null;
    }
  };

  const fetchMedicalRecordsByDoctor = async (doctorId: string): Promise<MedicalRecord[] | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('medical_records')
        .select(
          `
          id,
          attendance_id,
          vital_id,
          symptom_id,
          nutrition_id,
          doctor_id,
          patient_id,
          created_at,
          updated_at,
          doctors ( name ),
          patients ( name )
        `
        )
        .eq('doctor_id', doctorId);

      if (error) {
        console.error('Erro ao buscar prontuários médicos por médico no Supabase:', error.message);
        return null;
      }

      return data.map((record: any) => ({
        id: record.id,
        attendance_id: record.attendance_id,
        vital_id: record.vital_id,
        symptom_id: record.symptom_id,
        nutrition_id: record.nutrition_id,
        doctor_id: record.doctor_id,
        patient_id: record.patient_id,
        created_at: record.created_at,
        updated_at: record.updated_at,
        doctor: { name: record.doctors?.[0]?.name || undefined },
        patient: { name: record.patients?.[0]?.name || undefined },
        attendance: {}, // Add appropriate data if available
        vitals: {}, // Add appropriate data if available
        symptoms: {}, // Add appropriate data if available
        nutrition: {}, // Add appropriate data if available
      }));
    } catch (error) {
      console.error('Erro ao buscar prontuários médicos por médico:', error);
      return null;
    }
  };

  return (
    <MedicalRecordsContext.Provider
      value={{
        createMedicalRecord,
        updateMedicalRecord,
        fetchCompleteMedicalRecord,
        fetchMedicalRecordsByPatient,
        fetchMedicalRecordsByDoctor,
      }}>
      {children}
    </MedicalRecordsContext.Provider>
  );
};

// Hook para acessar o contexto de registros médicos
export const useMedicalRecords = (): MedicalRecordsContextType => {
  const context = useContext(MedicalRecordsContext);
  if (!context) {
    throw new Error('useMedicalRecords deve ser usado dentro de um MedicalRecordsProvider');
  }
  return context;
};
