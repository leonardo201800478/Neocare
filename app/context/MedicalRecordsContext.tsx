// MedicalRecordsContext.tsx
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
  const { db } = useSystem();

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

      // Insere o novo prontuário no banco de dados
      await db.insertInto('medical_records').values(newMedicalRecord).execute();

      return { medicalRecordId, error: null }; // Retorna o ID do prontuário criado
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
  
      // Executa a atualização no banco de dados
      await db
        .updateTable('medical_records')
        .set(updatedFields)
        .where('id', '=', medicalRecordId)
        .execute();
  
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
      const records = await db
        .selectFrom('medical_records')
        .leftJoin('doctors', 'medical_records.doctor_id', 'doctors.id')
        .leftJoin('patients', 'medical_records.patient_id', 'patients.id')
        .select([
          'medical_records.id',
          'medical_records.attendance_id',
          'medical_records.vital_id',
          'medical_records.symptom_id',
          'medical_records.nutrition_id',
          'medical_records.created_at',
          'medical_records.updated_at',
          'medical_records.doctor_id', // Inclui o doctor_id
          'medical_records.patient_id', // Inclui o patient_id
          'doctors.name as doctor_name',
          'patients.name as patient_name',
        ])
        .where('medical_records.id', '=', medicalRecordId)
        .execute();

      if (records.length === 0) return null;

      const record = records[0];

      // Buscar os dados adicionais das tabelas relacionadas (attendances, vitals, symptoms, nutrition)
      const [attendance, vitals, symptoms, nutrition] = await Promise.all([
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
      ]);

      return {
        id: record.id as string,
        attendance_id: record.attendance_id,
        vital_id: record.vital_id,
        symptom_id: record.symptom_id,
        nutrition_id: record.nutrition_id,
        doctor_id: record.doctor_id, // Agora doctor_id existe
        patient_id: record.patient_id, // Agora patient_id existe
        created_at: record.created_at,
        updated_at: record.updated_at,
        doctor: { name: record.doctor_name ?? undefined },
        patient: { name: record.patient_name ?? undefined },
        attendance: attendance[0] || {}, // O primeiro registro de attendance
        vitals: vitals[0] || {}, // O primeiro registro de vitals
        symptoms: symptoms[0] || {}, // O primeiro registro de symptoms
        nutrition: nutrition[0] || {}, // O primeiro registro de nutrition
      };
    } catch (error) {
      console.error('Error fetching complete medical record:', error);
      return null;
    }
  };

  const fetchMedicalRecordsByPatient = async (
    patientId: string
  ): Promise<MedicalRecord[] | null> => {
    try {
      const records = await db
        .selectFrom('medical_records')
        .leftJoin('doctors', 'medical_records.doctor_id', 'doctors.id')
        .leftJoin('patients', 'medical_records.patient_id', 'patients.id')
        .select([
          'medical_records.id',
          'medical_records.attendance_id',
          'medical_records.vital_id',
          'medical_records.symptom_id',
          'medical_records.nutrition_id',
          'medical_records.created_at',
          'medical_records.updated_at',
          'medical_records.doctor_id', // Inclui o doctor_id
          'medical_records.patient_id', // Inclui o patient_id
          'doctors.name as doctor_name',
          'patients.name as patient_name',
        ])
        .where('medical_records.patient_id', '=', patientId)
        .execute();

      if (records.length === 0) return null;

      return await Promise.all(
        records.map(async (record) => {
          // Buscar os dados adicionais das tabelas relacionadas (attendances, vitals, symptoms, nutrition)
          const [attendance, vitals, symptoms, nutrition] = await Promise.all([
            db
              .selectFrom('attendances')
              .selectAll()
              .where('id', '=', record.attendance_id)
              .execute(),
            db
              .selectFrom('attendance_vitals')
              .selectAll()
              .where('id', '=', record.vital_id)
              .execute(),
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
          ]);

          return {
            id: record.id as string,
            attendance_id: record.attendance_id,
            vital_id: record.vital_id,
            symptom_id: record.symptom_id,
            nutrition_id: record.nutrition_id,
            doctor_id: record.doctor_id, // Agora doctor_id existe
            patient_id: record.patient_id, // Agora patient_id existe
            created_at: record.created_at,
            updated_at: record.updated_at,
            doctor: { name: record.doctor_name ?? undefined },
            patient: { name: record.patient_name ?? undefined },
            attendance: attendance[0] || {}, // O primeiro registro de attendance
            vitals: vitals[0] || {}, // O primeiro registro de vitals
            symptoms: symptoms[0] || {}, // O primeiro registro de symptoms
            nutrition: nutrition[0] || {}, // O primeiro registro de nutrition
          };
        })
      );
    } catch (error) {
      console.error('Error fetching medical records by patient:', error);
      return null;
    }
  };

  const fetchMedicalRecordsByDoctor = async (doctorId: string): Promise<MedicalRecord[] | null> => {
    try {
      const records = await db
        .selectFrom('medical_records')
        .leftJoin('doctors', 'medical_records.doctor_id', 'doctors.id')
        .leftJoin('patients', 'medical_records.patient_id', 'patients.id')
        .select([
          'medical_records.id',
          'medical_records.attendance_id',
          'medical_records.vital_id',
          'medical_records.symptom_id',
          'medical_records.nutrition_id',
          'medical_records.created_at',
          'medical_records.updated_at',
          'medical_records.doctor_id', // Inclui o doctor_id
          'medical_records.patient_id', // Inclui o patient_id
          'doctors.name as doctor_name',
          'patients.name as patient_name',
        ])
        .where('medical_records.doctor_id', '=', doctorId)
        .execute();

      if (records.length === 0) return null;

      return await Promise.all(
        records.map(async (record) => {
          // Buscar os dados adicionais das tabelas relacionadas (attendances, vitals, symptoms, nutrition)
          const [attendance, vitals, symptoms, nutrition] = await Promise.all([
            db
              .selectFrom('attendances')
              .selectAll()
              .where('id', '=', record.attendance_id)
              .execute(),
            db
              .selectFrom('attendance_vitals')
              .selectAll()
              .where('id', '=', record.vital_id)
              .execute(),
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
          ]);

          return {
            id: record.id as string,
            attendance_id: record.attendance_id,
            vital_id: record.vital_id,
            symptom_id: record.symptom_id,
            nutrition_id: record.nutrition_id,
            doctor_id: record.doctor_id, // Agora doctor_id existe
            patient_id: record.patient_id, // Agora patient_id existe
            created_at: record.created_at,
            updated_at: record.updated_at,
            doctor: { name: record.doctor_name ?? undefined },
            patient: { name: record.patient_name ?? undefined },
            attendance: attendance[0] || {}, // O primeiro registro de attendance
            vitals: vitals[0] || {}, // O primeiro registro de vitals
            symptoms: symptoms[0] || {}, // O primeiro registro de symptoms
            nutrition: nutrition[0] || {}, // O primeiro registro de nutrition
          };
        })
      );
    } catch (error) {
      console.error('Error fetching medical records by doctor:', error);
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

export const useMedicalRecords = (): MedicalRecordsContextType => {
  const context = useContext(MedicalRecordsContext);
  if (!context) {
    throw new Error('useMedicalRecords must be used within a MedicalRecordsProvider');
  }
  return context;
};
