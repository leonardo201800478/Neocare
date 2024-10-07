// app/context/AttendanceVitalContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceVital } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceVitalContextType = {
  vitalSigns: AttendanceVital | null;
  setVitalSigns: (vitals: AttendanceVital | null) => void;
  createVitalSigns: (vitals: Partial<AttendanceVital>, attendanceId: string) => Promise<void>;
  updateVitalSigns: (vitalId: string, updatedFields: Partial<AttendanceVital>) => Promise<void>;
};

const AttendanceVitalContext = createContext<AttendanceVitalContextType | undefined>(undefined);

export const AttendanceVitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vitalSigns, setVitalSigns] = useState<AttendanceVital | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createVitalSigns = async (vitals: Partial<AttendanceVital>, attendanceId: string) => {
    if (!attendanceId || !vitals.peso_kg || !vitals.comprimento_cm) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    try {
      // Gerar um UUID para os novos sinais vitais
      const vitalId = uuid();

      // Criar um novo registro dos sinais vitais localmente
      const newVitalSigns = {
        id: vitalId,
        attendance_id: attendanceId,
        peso_kg: vitals.peso_kg,
        comprimento_cm: vitals.comprimento_cm,
        perimetro_cefalico_cm: vitals.perimetro_cefalico_cm ?? null,
        numero_respiracoes_por_minuto: vitals.numero_respiracoes_por_minuto ?? null,
      };

      await db.insertInto('attendance_vitals').values(newVitalSigns).execute();
      setVitalSigns(newVitalSigns);
      console.log('Sinais vitais criados localmente:', vitalId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_vitals')
        .insert([newVitalSigns]);

      if (error) {
        console.warn('Erro ao sincronizar sinais vitais com o Supabase:', error.message);
        throw new Error(
          'Sinais vitais adicionados localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Sinais vitais sincronizados com sucesso:', vitalId);
    } catch (error) {
      console.error('Erro ao criar sinais vitais:', error);
      throw new Error('Erro ao criar os sinais vitais.');
    }
  };

  const updateVitalSigns = async (vitalId: string, updatedFields: Partial<AttendanceVital>) => {
    if (!vitalId) {
      throw new Error('O ID dos sinais vitais é obrigatório para a atualização.');
    }

    try {
      console.log(
        'Iniciando atualização dos sinais vitais. ID:',
        vitalId,
        'Campos a serem atualizados:',
        updatedFields
      );

      // Atualizar o registro dos sinais vitais localmente
      const result = await db
        .updateTable('attendance_vitals')
        .set(updatedFields)
        .where('id', '=', vitalId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        console.error('Nenhum registro foi atualizado. Verifique o ID e os campos enviados.');
        throw new Error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
      }

      console.log('Sinais vitais atualizados localmente:', vitalId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_vitals')
        .update(updatedFields)
        .eq('id', vitalId);

      if (error) {
        console.warn(
          'Erro ao sincronizar atualização dos sinais vitais com o Supabase:',
          error.message
        );
        throw new Error(
          'Sinais vitais atualizados localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Sinais vitais sincronizados com sucesso:', vitalId);
    } catch (error) {
      console.error('Erro ao atualizar os sinais vitais:', error);
      throw new Error('Ocorreu um erro ao atualizar os sinais vitais.');
    }
  };

  return (
    <AttendanceVitalContext.Provider
      value={{ vitalSigns, setVitalSigns, createVitalSigns, updateVitalSigns }}>
      {children}
    </AttendanceVitalContext.Provider>
  );
};

export const useAttendanceVital = (): AttendanceVitalContextType => {
  const context = useContext(AttendanceVitalContext);
  if (!context) {
    throw new Error('useAttendanceVital deve ser usado dentro de um AttendanceVitalProvider');
  }
  return context;
};
