// app/context/AttendanceContext.tsx

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
  ) => Promise<{ data: any, error: any }>; // Retorna dados e erro
  updateAttendance: (attendanceId: string, updatedFields: Partial<Attendance>) => Promise<void>;
  fetchAttendanceByPatient: (patientId: string) => Promise<Attendance | null>;
};

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createAttendance = async (
    attendance: Partial<Attendance>,
    doctorId: string,
    patientId: string
  ): Promise<{ data: any; error: any }> => {
    if (!doctorId || !patientId) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    try {
      // Gerar um UUID para o novo atendimento
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

      // Inserir o novo atendimento localmente
      await db.insertInto('attendances').values(newAttendance).execute();
      console.log('Atendimento criado localmente:', attendanceId);

      // Tentar sincronizar com o Supabase
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .insert([newAttendance]);

      if (error) {
        console.warn('Erro ao sincronizar atendimento com o Supabase:', error.message);
        return { data: null, error };
      }

      console.log('Atendimento sincronizado com sucesso:', attendanceId);
      return { data, error: null };

    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
      return { data: null, error };
    }
  };

  const updateAttendance = async (attendanceId: string, updatedFields: Partial<Attendance>) => {
    if (!attendanceId) {
      throw new Error('O ID do atendimento é obrigatório para a atualização.');
    }

    try {
      console.log('Iniciando atualização do atendimento:', attendanceId);

      // Atualizar o atendimento localmente
      const result = await db
        .updateTable('attendances')
        .set(updatedFields)
        .where('id', '=', attendanceId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        throw new Error('Nenhum registro foi atualizado. Verifique os dados enviados.');
      }

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendances')
        .update(updatedFields)
        .eq('id', attendanceId);

      if (error) {
        throw new Error('Erro ao sincronizar atualização do atendimento com o Supabase.');
      }

      console.log('Atendimento atualizado e sincronizado com sucesso:', attendanceId);

    } catch (error) {
      console.error('Erro ao atualizar o atendimento:', error);
      throw new Error('Erro ao atualizar o atendimento.');
    }
  };

  const fetchAttendanceByPatient = async (patientId: string): Promise<Attendance | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendances')
        .select('*')
        .eq('patient_id', patientId)
        .single();

      if (error) {
        console.error('Erro ao buscar atendimento:', error.message);
        return null;
      }

      return data;

    } catch (error) {
      console.error('Erro ao buscar atendimento:', error);
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
      }}>
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
