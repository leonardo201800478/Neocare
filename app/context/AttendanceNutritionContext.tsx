import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceNutritionDevelopment } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceNutritionContextType = {
  nutrition: AttendanceNutritionDevelopment[] | null; // Array de registros de nutrição
  setNutrition: (nutrition: AttendanceNutritionDevelopment[] | null) => void;
  createNutrition: (
    nutrition: Partial<AttendanceNutritionDevelopment>,
    attendanceId: string
  ) => Promise<{ error: string | null }>;
  updateNutrition: (
    nutritionId: string,
    updatedFields: Partial<AttendanceNutritionDevelopment>
  ) => Promise<{ error: string | null }>;
  fetchNutritionByAttendance: (
    attendanceId: string
  ) => Promise<AttendanceNutritionDevelopment[] | null>;
  fetchNutritionById: (nutritionId: string) => Promise<AttendanceNutritionDevelopment | null>; // Nova função
};

const NutritionContext = createContext<AttendanceNutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nutrition, setNutrition] = useState<AttendanceNutritionDevelopment[] | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createNutrition = async (
    nutrition: Partial<AttendanceNutritionDevelopment>,
    attendanceId: string
  ): Promise<{ error: string | null }> => {
    if (!attendanceId) {
      return { error: 'O ID do atendimento é obrigatório.' };
    }

    try {
      const nutritionId = uuid();

      const newNutrition: AttendanceNutritionDevelopment = {
        id: nutritionId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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
        doctor_id: nutrition.doctor_id ?? null,
        patient_id: nutrition.patient_id ?? null,
      };

      await db.insertInto('attendance_nutrition_development').values(newNutrition).execute();

      setNutrition((prev) => (prev ? [...prev, newNutrition] : [newNutrition]));

      const { error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .insert([newNutrition]);

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

  const fetchNutritionByAttendance = async (attendanceId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .select('*')
        .eq('attendance_id', attendanceId);

      if (error) {
        console.error('Erro ao buscar dados de nutrição e desenvolvimento:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar dados de nutrição e desenvolvimento:', error);
      return null;
    }
  };

  const fetchNutritionById = async (nutritionId: string) => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .select('*')
        .eq('id', nutritionId)
        .single(); // Retorna um único registro

      if (error) {
        console.error('Erro ao buscar dados de nutrição e desenvolvimento pelo ID:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar dados de nutrição e desenvolvimento:', error);
      return null;
    }
  };

  const updateNutrition = async (
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
    <NutritionContext.Provider
      value={{
        nutrition,
        setNutrition,
        createNutrition,
        updateNutrition,
        fetchNutritionByAttendance,
        fetchNutritionById, // Nova função adicionada ao contexto
      }}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = (): AttendanceNutritionContextType => {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition deve ser usado dentro de um NutritionProvider');
  }
  return context;
};
