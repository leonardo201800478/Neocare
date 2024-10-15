// app/attendences/AttendanceContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Attendance } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceContextType = {
  selectedAttendance: Attendance | null;
  setSelectedAttendance: (attendance: Attendance | null) => void;
  createAttendance: (
    attendance: Partial<Attendance>,
    doctorId: string,
    patientId: string
  ) => Promise<{ attendanceId: string | null; error: any }>;
  createMedicalRecord: (
    vitalId: string,
    symptomId: string,
    nutritionId: string,
    doctorId: string,
    patientId: string
  ) => Promise<{ error: any }>;
  fetchAttendanceByPatient: (patientId: string) => Promise<Attendance | null>;
  fetchAttendanceById: (attendanceId: string) => Promise<Attendance | null>;
};

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const { db, supabaseConnector } = useSystem();

  // Função para criar um novo atendimento
  const createAttendance = async (
    attendance: Partial<Attendance>,
    doctorId: string,
    patientId: string
  ): Promise<{ attendanceId: string | null; error: any }> => {
    if (!doctorId || !patientId) {
      return { attendanceId: null, error: 'Doctor ID and Patient ID are required.' };
    }

    try {
      const attendanceId = uuid();
      const newAttendance: Attendance = {
        ...attendance,
        id: attendanceId,
        doctor_id: doctorId,
        patient_id: patientId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        motivo_consulta: attendance.motivo_consulta ?? null,
        hipertensao: attendance.hipertensao ?? null,
        diabetes: attendance.diabetes ?? null,
        doenca_hepatica: attendance.doenca_hepatica ?? null,
        deficiencia_g6pd: attendance.deficiencia_g6pd ?? null,
      };

      // Insere os dados localmente
      await db.insertInto('attendances').values(newAttendance).execute();

      // Sincroniza com o Supabase
      const { error } = await supabaseConnector.client.from('attendances').insert([newAttendance]);

      if (error) {
        return { attendanceId: null, error };
      }

      return { attendanceId, error: null };
    } catch (error) {
      return { attendanceId: null, error };
    }
  };

  // Função para criar um novo registro na tabela medical_records após a última etapa
  const createMedicalRecord = async (
    vitalId: string,
    symptomId: string,
    nutritionId: string,
    doctorId: string,
    patientId: string
  ): Promise<{ error: any }> => {
    const medicalRecordId = uuid();
    const newMedicalRecord = {
      id: medicalRecordId,
      vital_id: vitalId,
      symptom_id: symptomId,
      nutrition_id: nutritionId,
      doctor_id: doctorId,
      patient_id: patientId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      // Insere os dados localmente
      await db.insertInto('medical_records').values(newMedicalRecord).execute();

      // Sincroniza com o Supabase
      const { error } = await supabaseConnector.client
        .from('medical_records')
        .insert([newMedicalRecord]);

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Função para buscar atendimento por ID de paciente (último atendimento)
  const fetchAttendanceByPatient = async (patientId: string): Promise<Attendance | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })
        .limit(1); // Busca o último atendimento

      if (error || !data || data.length === 0) {
        return null;
      }

      return data[0];
    } catch {
      return null;
    }
  };

  // Função para buscar atendimento por ID de atendimento
  const fetchAttendanceById = async (attendanceId: string): Promise<Attendance | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('id', attendanceId)
        .single();

      if (error) {
        return null;
      }

      return data;
    } catch {
      return null;
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        selectedAttendance,
        setSelectedAttendance,
        createAttendance,
        createMedicalRecord,
        fetchAttendanceByPatient,
        fetchAttendanceById,
      }}>
      {children}
    </AttendanceContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance deve ser usado dentro de um AttendanceProvider');
  }
  return context;
};
