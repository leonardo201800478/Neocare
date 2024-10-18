import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceSymptom } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceSymptomContextType = {
  symptoms: AttendanceSymptom | null;
  setSymptoms: (symptoms: AttendanceSymptom | null) => void;
  createSymptom: (
    symptoms: Partial<AttendanceSymptom>,
    doctorId: string,
    patientId: string
  ) => Promise<{ symptomId: string | null; error: string | null }>;
  fetchSymptomById: (symptomId: string) => Promise<AttendanceSymptom | null>;
  fetchSymptomsByAttendanceId: (attendanceId: string) => Promise<AttendanceSymptom[] | null>;
};

const AttendanceSymptomContext = createContext<AttendanceSymptomContextType | undefined>(undefined);

export const AttendanceSymptomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<AttendanceSymptom | null>(null);
  const { db, supabaseConnector } = useSystem();

  // Função para criar novos sintomas e salvar na tabela 'attendance_symptoms'
  const createSymptom = async (
    symptoms: Partial<AttendanceSymptom>,
    doctorId: string,
    patientId: string
  ): Promise<{ symptomId: string | null; error: string | null }> => {
    if (!doctorId || !patientId) {
      return { symptomId: null, error: 'ID do médico e do paciente são obrigatórios.' };
    }

    try {
      const symptomId = uuid();

      const newSymptom: AttendanceSymptom = {
        id: symptomId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        nao_bebe_ou_mama: symptoms.nao_bebe_ou_mama ?? null,
        vomita_tudo: symptoms.vomita_tudo ?? null,
        convulsoes: symptoms.convulsoes ?? null,
        letargica: symptoms.letargica ?? null,
        enchimento_capilar: symptoms.enchimento_capilar ?? null,
        batimento_asa: symptoms.batimento_asa ?? null,
        tem_tosse: symptoms.tem_tosse ?? null,
        sibilancia: symptoms.sibilancia ?? null,
        tem_diarreia: symptoms.tem_diarreia ?? null,
        tem_febre: symptoms.tem_febre ?? null,
        rigidez_nuca: symptoms.rigidez_nuca ?? null,
        problema_ouvido: symptoms.problema_ouvido ?? null,
        dor_garganta: symptoms.dor_garganta ?? null,
        gemido: symptoms.gemido ?? null,
        cianose_periferica: symptoms.cianose_periferica ?? null,
        ictericia: symptoms.ictericia ?? null,
        distensao_abdominal: symptoms.distensao_abdominal ?? null,
        emagrecimento: symptoms.emagrecimento ?? null,
        edema: symptoms.edema ?? null,
        doctor_id: doctorId,
        patient_id: patientId,
      };

      // Salvar localmente
      await db.insertInto('attendance_symptoms').values(newSymptom).execute();
      setSymptoms(newSymptom);

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .insert([newSymptom]);

      if (error) {
        return {
          symptomId: null,
          error: 'Erro ao sincronizar sintomas com o Supabase: ' + error.message,
        };
      }

      return { symptomId, error: null };
    } catch (error) {
      return { symptomId: null, error: 'Erro ao criar sintomas: ' + (error as Error).message };
    }
  };

  // Função para buscar sintomas por ID específico
  const fetchSymptomById = async (symptomId: string): Promise<AttendanceSymptom | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .select('*')
        .eq('id', symptomId)
        .single();

      if (error) {
        console.error('Erro ao buscar sintomas pelo ID:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error);
      return null;
    }
  };

  // Função para buscar sintomas por ID do atendimento
  const fetchSymptomsByAttendanceId = async (
    attendanceId: string
  ): Promise<AttendanceSymptom[] | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .select('*')
        .eq('attendance_id', attendanceId);

      if (error) {
        console.error('Erro ao buscar sintomas pelo ID de atendimento:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar sintomas:', error);
      return null;
    }
  };

  return (
    <AttendanceSymptomContext.Provider
      value={{
        symptoms,
        setSymptoms,
        createSymptom,
        fetchSymptomById,
        fetchSymptomsByAttendanceId, // Nova função adicionada ao contexto
      }}>
      {children}
    </AttendanceSymptomContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useAttendanceSymptom = (): AttendanceSymptomContextType => {
  const context = useContext(AttendanceSymptomContext);
  if (!context) {
    throw new Error('useAttendanceSymptom deve ser usado dentro de um AttendanceSymptomProvider');
  }
  return context;
};
