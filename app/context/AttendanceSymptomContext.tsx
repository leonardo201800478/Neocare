// app/context/AttendanceSymptomContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceSymptom } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceSymptomContextType = {
  symptoms: AttendanceSymptom | null;
  setSymptoms: (symptoms: AttendanceSymptom | null) => void;
  createSymptom: (symptoms: Partial<AttendanceSymptom>, attendanceId: string) => Promise<void>;
  updateSymptom: (symptomId: string, updatedFields: Partial<AttendanceSymptom>) => Promise<void>;
};

const AttendanceSymptomContext = createContext<AttendanceSymptomContextType | undefined>(undefined);

export const AttendanceSymptomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<AttendanceSymptom | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createSymptom = async (symptoms: Partial<AttendanceSymptom>, attendanceId: string) => {
    if (!attendanceId) {
      throw new Error('O ID do atendimento é obrigatório.');
    }

    try {
      // Gerar um UUID para os novos sintomas
      const symptomId = uuid();

      // Criar um novo registro dos sintomas localmente
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
      console.log('Sintomas criados localmente:', symptomId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .insert([newSymptom]);

      if (error) {
        console.warn('Erro ao sincronizar sintomas com o Supabase:', error.message);
        throw new Error(
          'Sintomas adicionados localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Sintomas sincronizados com sucesso:', symptomId);
    } catch (error) {
      console.error('Erro ao criar sintomas:', error);
      throw new Error('Erro ao criar os sintomas.');
    }
  };

  const updateSymptom = async (symptomId: string, updatedFields: Partial<AttendanceSymptom>) => {
    if (!symptomId) {
      throw new Error('O ID dos sintomas é obrigatório para a atualização.');
    }

    try {
      console.log(
        'Iniciando atualização dos sintomas. ID:',
        symptomId,
        'Campos a serem atualizados:',
        updatedFields
      );

      // Atualizar o registro dos sintomas localmente
      const result = await db
        .updateTable('attendance_symptoms')
        .set(updatedFields)
        .where('id', '=', symptomId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        console.error('Nenhum registro foi atualizado. Verifique o ID e os campos enviados.');
        throw new Error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
      }

      console.log('Sintomas atualizados localmente:', symptomId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_symptoms')
        .update(updatedFields)
        .eq('id', symptomId);

      if (error) {
        console.warn('Erro ao sincronizar atualização dos sintomas com o Supabase:', error.message);
        throw new Error(
          'Sintomas atualizados localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Sintomas sincronizados com sucesso:', symptomId);
    } catch (error) {
      console.error('Erro ao atualizar os sintomas:', error);
      throw new Error('Ocorreu um erro ao atualizar os sintomas.');
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
