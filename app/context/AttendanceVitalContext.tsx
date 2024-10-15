// app/attendences/AttendanceVitalContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AttendanceVital } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceVitalContextType = {
  vitalSigns: AttendanceVital | null;
  setVitalSigns: (vitals: AttendanceVital | null) => void;
  createVitalSigns: (
    vitals: Partial<AttendanceVital>,
    doctorId: string,
    patientId: string
  ) => Promise<{ vitalId: string | null; error: string | null }>;
  fetchVitalsById: (vitalId: string) => Promise<AttendanceVital | null>;
  fetchVitalsByAttendance: (attendanceId: string) => Promise<AttendanceVital | null>; // Nova função para buscar sinais vitais por atendimento
};

const AttendanceVitalContext = createContext<AttendanceVitalContextType | undefined>(undefined);

export const AttendanceVitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vitalSigns, setVitalSigns] = useState<AttendanceVital | null>(null);
  const { db, supabaseConnector } = useSystem();

  // Função para criar novos sinais vitais e salvar na tabela 'attendance_vitals'
  const createVitalSigns = async (
    vitals: Partial<AttendanceVital>,
    doctorId: string,
    patientId: string
  ): Promise<{ vitalId: string | null; error: string | null }> => {
    if (!doctorId || !patientId) {
      return { vitalId: null, error: 'ID do médico e paciente são obrigatórios.' };
    }

    try {
      const vitalId = uuid();

      const newVitalSigns: AttendanceVital = {
        id: vitalId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        peso_kg: vitals.peso_kg ?? null,
        comprimento_cm: vitals.comprimento_cm ?? null,
        perimetro_cefalico_cm: vitals.perimetro_cefalico_cm ?? null,
        numero_respiracoes_por_minuto: vitals.numero_respiracoes_por_minuto ?? null,
        doctor_id: doctorId,
        patient_id: patientId,
      };

      // Salvar localmente
      await db.insertInto('attendance_vitals').values(newVitalSigns).execute();
      setVitalSigns(newVitalSigns);

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_vitals')
        .insert([newVitalSigns]);

      if (error) {
        return {
          vitalId: null,
          error: 'Erro ao sincronizar sinais vitais com o Supabase: ' + error.message,
        };
      }

      return { vitalId, error: null };
    } catch (error) {
      return { vitalId: null, error: 'Erro ao criar sinais vitais: ' + (error as any).message };
    }
  };

  // Função para buscar sinais vitais pelo ID específico
  const fetchVitalsById = async (vitalId: string): Promise<AttendanceVital | null> => {
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

  // Função para buscar sinais vitais por ID de atendimento (attendanceId)
  const fetchVitalsByAttendance = async (attendanceId: string): Promise<AttendanceVital | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_vitals')
        .select('*')
        .eq('attendance_id', attendanceId)
        .single(); // Espera-se que haja um único registro por atendimento

      if (error) {
        console.error('Erro ao buscar sinais vitais por atendimento:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar sinais vitais por atendimento:', error);
      return null;
    }
  };

  return (
    <AttendanceVitalContext.Provider
      value={{
        vitalSigns,
        setVitalSigns,
        createVitalSigns,
        fetchVitalsById,
        fetchVitalsByAttendance, // Adiciona a nova função aqui
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
