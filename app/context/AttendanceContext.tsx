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
  ) => Promise<{ data: any; error: any }>;
  updateAttendance: (attendanceId: string, updatedFields: Partial<Attendance>) => Promise<void>;
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
  ): Promise<{ data: any; error: any }> => {
    if (!doctorId || !patientId) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    try {
      const attendanceId = uuid();
      const newAttendance = {
        id: attendanceId,
        doctor_id: doctorId,
        patient_id: patientId,
        motivo_consulta: attendance.motivo_consulta ?? 'false',
        primeira_consulta: attendance.primeira_consulta ?? 'false',
        consulta_retorno: attendance.consulta_retorno ?? 'false',
        hipertensao: attendance.hipertensao ?? 'false',
        diabetes: attendance.diabetes ?? 'false',
        doenca_hepatica: attendance.doenca_hepatica ?? 'false',
        deficiencia_g6pd: attendance.deficiencia_g6pd ?? 'false',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await db.insertInto('attendances').values(newAttendance).execute();
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .insert([newAttendance]);

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Função para atualizar um atendimento existente
  const updateAttendance = async (attendanceId: string, updatedFields: Partial<Attendance>) => {
    if (!attendanceId) {
      throw new Error('O ID do atendimento é obrigatório para a atualização.');
    }

    try {
      const result = await db
        .updateTable('attendances')
        .set(updatedFields)
        .where('id', '=', attendanceId)
        .execute();

      const { error } = await supabaseConnector.client
        .from('attendances')
        .update(updatedFields)
        .eq('id', attendanceId);

      if (error) {
        throw new Error('Erro ao sincronizar atualização do atendimento com o Supabase.');
      }
    } catch (error) {
      throw new Error('Erro ao atualizar o atendimento.');
    }
  };

  // Função para buscar atendimento por ID de paciente
  const fetchAttendanceByPatient = async (patientId: string): Promise<Attendance | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        return null;
      }

      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
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
    } catch (error) {
      return null;
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        selectedAttendance,
        setSelectedAttendance,
        createAttendance,
        updateAttendance,
        fetchAttendanceByPatient,
        fetchAttendanceById,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance deve ser usado dentro de um AttendanceProvider');
  }
  return context;
};
