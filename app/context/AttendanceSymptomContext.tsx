// app/context/AttendanceSymptomContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceSymptom } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceSymptomContextType = {
  symptoms: AttendanceSymptom | null;
  setSymptoms: (symptoms: AttendanceSymptom | null) => void;
  createSymptom: (
    symptoms: Partial<AttendanceSymptom>,
    attendanceId: string
  ) => Promise<{ error: string | null }>;
  updateSymptom: (
    symptomId: string,
    updatedFields: Partial<AttendanceSymptom>
  ) => Promise<{ error: string | null }>;
};

const AttendanceSymptomContext = createContext<AttendanceSymptomContextType | undefined>(undefined);

export const AttendanceSymptomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<AttendanceSymptom | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createSymptom = async (
    symptoms: Partial<AttendanceSymptom>,
    attendanceId: string
  ): Promise<{ error: string | null }> => {
    if (!attendanceId) {
      return { error: 'O ID do atendimento é obrigatório.' };
    }

    try {
      const symptomId = uuid();

      const newSymptom = {
        id: symptomId,
        attendance_id: attendanceId,
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
      };

      await db.insertInto('attendance_symptoms').values(newSymptom).execute();
      setSymptoms(newSymptom);

      const { error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .insert([newSymptom]);

      if (error) {
        return { error: 'Erro ao sincronizar sintomas com o Supabase: ' + error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao criar sintomas: ' + (error as Error).message };
    }
  };

  const updateSymptom = async (
    symptomId: string,
    updatedFields: Partial<AttendanceSymptom>
  ): Promise<{ error: string | null }> => {
    if (!symptomId) {
      return { error: 'O ID dos sintomas é obrigatório para a atualização.' };
    }

    try {
      const result = await db
        .updateTable('attendance_symptoms')
        .set(updatedFields)
        .where('id', '=', symptomId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        return { error: 'Nenhum registro foi atualizado. Verifique os dados.' };
      }

      const { error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .update(updatedFields)
        .eq('id', symptomId);

      if (error) {
        return { error: 'Erro ao sincronizar atualização dos sintomas: ' + error.message };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao atualizar os sintomas: ' + (error as Error).message };
    }
  };

  return (
    <AttendanceSymptomContext.Provider
      value={{ symptoms, setSymptoms, createSymptom, updateSymptom }}>
      {children}
    </AttendanceSymptomContext.Provider>
  );
};

export const useAttendanceSymptom = (): AttendanceSymptomContextType => {
  const context = useContext(AttendanceSymptomContext);
  if (!context) {
    throw new Error('useAttendanceSymptom deve ser usado dentro de um AttendanceSymptomProvider');
  }
  return context;
};
