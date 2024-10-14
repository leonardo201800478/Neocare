// app/context/AttendanceNutritionDevelopmentContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceNutritionDevelopment } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceNutritionDevelopmentContextType = {
  nutritionDevelopment: AttendanceNutritionDevelopment | null;
  setNutritionDevelopment: (nutrition: AttendanceNutritionDevelopment | null) => void;
  createNutritionDevelopment: (
    nutrition: Partial<AttendanceNutritionDevelopment>,
    attendanceId: string
  ) => Promise<{ error: string | null }>;
  updateNutritionDevelopment: (
    nutritionId: string,
    updatedFields: Partial<AttendanceNutritionDevelopment>
  ) => Promise<{ error: string | null }>;
};

const AttendanceNutritionDevelopmentContext = createContext<
  AttendanceNutritionDevelopmentContextType | undefined
>(undefined);

export const AttendanceNutritionDevelopmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nutritionDevelopment, setNutritionDevelopment] =
    useState<AttendanceNutritionDevelopment | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createNutritionDevelopment = async (
    nutrition: Partial<AttendanceNutritionDevelopment>,
    attendanceId: string
  ): Promise<{ error: string | null }> => {
    if (!attendanceId) {
      return { error: 'O ID do atendimento é obrigatório.' };
    }

    try {
      const nutritionId = uuid();

      const newNutritionDevelopment = {
        id: nutritionId,
        attendance_id: attendanceId,
        amamentando: nutrition.amamentando ?? null,
        quantas_vezes_amamenta: nutrition.quantas_vezes_amamenta ?? null,
        amamenta_noite: nutrition.amamenta_noite ?? null,
        alimentos_liquidos: nutrition.alimentos_liquidos ?? null,
        quantidade_refeicoes: nutrition.quantidade_refeicoes ?? null,
        tipo_alimentacao: nutrition.tipo_alimentacao ?? null,
        mudou_alimentacao: nutrition.mudou_alimentacao ?? null,
        como_mudou_alimentacao: nutrition.como_mudou_alimentacao ?? null,
        perda_peso_primeira_semana: nutrition.perda_peso_primeira_semana ?? null,
        tendencia_crescimento: nutrition.tendencia_crescimento ?? null,
        habilidades_desenvolvimento: nutrition.habilidades_desenvolvimento ?? null,
        atividade_fisica_vezes_semana: nutrition.atividade_fisica_vezes_semana ?? null,
        tempo_atividade_fisica: nutrition.tempo_atividade_fisica ?? null,
        tempo_sedentario: nutrition.tempo_sedentario ?? null,
        avaliacao_violencia: nutrition.avaliacao_violencia ?? null,
        outros_problemas: nutrition.outros_problemas ?? null,
      };

      await db
        .insertInto('attendance_nutrition_development')
        .values(newNutritionDevelopment)
        .execute();
      setNutritionDevelopment(newNutritionDevelopment);

      const { error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .insert([newNutritionDevelopment]);

      if (error) {
        return {
          error: 'Erro ao sincronizar nutrição e desenvolvimento com o Supabase: ' + error.message,
        };
      }

      return { error: null };
    } catch (error) {
      return { error: 'Erro ao criar nutrição e desenvolvimento: ' + (error as Error).message };
    }
  };

  const updateNutritionDevelopment = async (
    nutritionId: string,
    updatedFields: Partial<AttendanceNutritionDevelopment>
  ): Promise<{ error: string | null }> => {
    if (!nutritionId) {
      return { error: 'O ID do registro de nutrição e desenvolvimento é obrigatório.' };
    }

    try {
      const result = await db
        .updateTable('attendance_nutrition_development')
        .set(updatedFields)
        .where('id', '=', nutritionId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        return { error: 'Nenhum registro foi atualizado. Verifique os dados.' };
      }

      const { error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .update(updatedFields)
        .eq('id', nutritionId);

      if (error) {
        return {
          error:
            'Erro ao sincronizar atualização do registro de nutrição e desenvolvimento: ' +
            error.message,
        };
      }

      return { error: null };
    } catch (error: any) {
      return {
        error: 'Erro ao atualizar o registro de nutrição e desenvolvimento: ' + error.message,
      };
    }
  };

  return (
    <AttendanceNutritionDevelopmentContext.Provider
      value={{
        nutritionDevelopment,
        setNutritionDevelopment,
        createNutritionDevelopment,
        updateNutritionDevelopment,
      }}>
      {children}
    </AttendanceNutritionDevelopmentContext.Provider>
  );
};

export const useAttendanceNutritionDevelopment = (): AttendanceNutritionDevelopmentContextType => {
  const context = useContext(AttendanceNutritionDevelopmentContext);
  if (!context) {
    throw new Error(
      'useAttendanceNutritionDevelopment deve ser usado dentro de um AttendanceNutritionDevelopmentProvider'
    );
  }
  return context;
};
