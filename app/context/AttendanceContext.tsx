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
  ) => Promise<void>;
  updateAttendance: (attendanceId: string, updatedFields: Partial<Attendance>) => Promise<void>;
};

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createAttendance = async (
    attendance: Partial<Attendance>,
    doctorId: string,
    patientId: string
  ) => {
    if (!doctorId || !patientId || !attendance.motivo_consulta) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    try {
      // Gerar um UUID para o novo atendimento
      const attendanceId = uuid();

      // Criar um novo registro do atendimento localmente
      const newAttendance = {
        id: attendanceId,
        doctor_id: doctorId,
        patient_id: patientId,
        motivo_consulta: attendance.motivo_consulta,
        primeira_consulta: attendance.primeira_consulta ?? 'false',
        consulta_retorno: attendance.consulta_retorno ?? 'false',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await db.insertInto('attendances').values(newAttendance).execute();
      console.log('Atendimento criado localmente:', attendanceId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client.from('attendances').insert([newAttendance]);

      if (error) {
        console.warn('Erro ao sincronizar atendimento com o Supabase:', error.message);
        throw new Error(
          'Atendimento adicionado localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Atendimento sincronizado com sucesso:', attendanceId);
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
      throw new Error('Erro ao criar o atendimento.');
    }
  };

  const updateAttendance = async (attendanceId: string, updatedFields: Partial<Attendance>) => {
    if (!attendanceId) {
      throw new Error('O ID do atendimento é obrigatório para a atualização.');
    }

    try {
      console.log(
        'Iniciando atualização do atendimento. ID:',
        attendanceId,
        'Campos a serem atualizados:',
        updatedFields
      );

      // Atualizar o registro do atendimento localmente
      const result = await db
        .updateTable('attendances')
        .set(updatedFields)
        .where('id', '=', attendanceId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        console.error('Nenhum registro foi atualizado. Verifique o ID e os campos enviados.');
        throw new Error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
      }

      console.log('Atendimento atualizado localmente:', attendanceId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendances')
        .update(updatedFields)
        .eq('id', attendanceId);

      if (error) {
        console.warn(
          'Erro ao sincronizar atualização do atendimento com o Supabase:',
          error.message
        );
        throw new Error(
          'Atendimento atualizado localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Atendimento sincronizado com sucesso:', attendanceId);
    } catch (error) {
      console.error('Erro ao atualizar o atendimento:', error);
      throw new Error('Ocorreu um erro ao atualizar o atendimento.');
    }
  };

  return (
    <AttendanceContext.Provider
      value={{ selectedAttendance, setSelectedAttendance, createAttendance, updateAttendance }}>
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
