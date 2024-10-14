import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceVital } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceVitalContextType = {
  vitalSigns: AttendanceVital | null;
  setVitalSigns: (vitals: AttendanceVital | null) => void;
  createVitalSigns: (
    vitals: Partial<AttendanceVital>,
    attendanceId: string
  ) => Promise<{ error: string | null }>;
  updateVitalSigns: (
    vitalId: string,
    updatedFields: Partial<AttendanceVital>
  ) => Promise<{ error: string | null }>;
  fetchVitalsByAttendance: (attendanceId: string) => Promise<AttendanceVital | null>;
  fetchVitalById: (vitalId: string) => Promise<AttendanceVital | null>; // Nova função
};

const AttendanceVitalContext = createContext<AttendanceVitalContextType | undefined>(undefined);

export const AttendanceVitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vitalSigns, setVitalSigns] = useState<AttendanceVital | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createVitalSigns = async (
    vitals: Partial<AttendanceVital>,
    attendanceId: string
  ): Promise<{ error: string | null }> => {
    if (!attendanceId) {
      return { error: 'ID do atendimento não fornecido.' };
    }

    try {
      const vitalId = uuid();

      const newVitalSigns: AttendanceVital = {
        id: vitalId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        attendance_id: attendanceId,
        peso_kg: vitals.peso_kg ?? null,
        comprimento_cm: vitals.comprimento_cm ?? null,
        perimetro_cefalico_cm: vitals.perimetro_cefalico_cm ?? null,
        numero_respiracoes_por_minuto: vitals.numero_respiracoes_por_minuto ?? null,
        doctor_id: vitals.doctor_id ?? null,
        patient_id: vitals.patient_id ?? null,
      };

      // Salvar localmente
      await db.insertInto('attendance_vitals').values(newVitalSigns).execute();
      setVitalSigns(newVitalSigns);

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_vitals')
        .insert([newVitalSigns]);

      if (error) {
        return { error: 'Erro ao sincronizar sinais vitais com o Supabase: ' + error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao criar sinais vitais: ' + (error as any).message };
    }
  };

  const updateVitalSigns = async (
    vitalId: string,
    updatedFields: Partial<AttendanceVital>
  ): Promise<{ error: string | null }> => {
    if (!vitalId) {
      return { error: 'ID dos sinais vitais não fornecido.' };
    }

    try {
      // Atualizar localmente
      const result = await db
        .updateTable('attendance_vitals')
        .set(updatedFields)
        .where('id', '=', vitalId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        return { error: 'Nenhum registro foi atualizado. Verifique os dados.' };
      }

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_vitals')
        .update(updatedFields)
        .eq('id', vitalId);

      if (error) {
        return { error: 'Erro ao sincronizar atualização dos sinais vitais: ' + error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao atualizar os sinais vitais: ' + (error as any).message };
    }
  };

  const fetchVitalsByAttendance = async (attendanceId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_vitals')
        .select('*')
        .eq('attendance_id', attendanceId)
        .single(); // Espera-se que haja um único registro por atendimento
  
      if (error) {
        console.error('Erro ao buscar sinais vitais:', error.message);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar sinais vitais:', error);
      return null;
    }
  };

  const fetchVitalById = async (vitalId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_vitals')
        .select('*')
        .eq('id', vitalId)
        .single(); // Garantir que apenas um registro seja retornado
  
      if (error) {
        console.error('Erro ao buscar sinais vitais pelo ID:', error.message);
        return null;
      }
  
      return data;
    } catch (error) {
      console.error('Erro ao buscar sinais vitais pelo ID:', error);
      return null;
    }
  };
  
  return (
    <AttendanceVitalContext.Provider
      value={{
        vitalSigns,
        setVitalSigns,
        createVitalSigns,
        updateVitalSigns,
        fetchVitalsByAttendance,
        fetchVitalById, // Nova função para buscar sinais vitais pelo UUID
      }}>
      {children}
    </AttendanceVitalContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAttendanceVital = (): AttendanceVitalContextType => {
  const context = useContext(AttendanceVitalContext);
  if (!context) {
    throw new Error('useAttendanceVital deve ser usado dentro de um AttendanceVitalProvider');
  }
  return context;
};
