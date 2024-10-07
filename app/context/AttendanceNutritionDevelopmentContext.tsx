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
  ) => Promise<void>;
  updateNutritionDevelopment: (
    nutritionId: string,
    updatedFields: Partial<AttendanceNutritionDevelopment>
  ) => Promise<void>;
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
  ) => {
    if (!attendanceId) {
      throw new Error('O ID do atendimento é obrigatório.');
    }

    try {
      // Gerar um UUID para o novo registro de nutrição e desenvolvimento
      const nutritionId = uuid();

      // Criar um novo registro de nutrição e desenvolvimento localmente
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
      console.log('Nutrição e desenvolvimento criados localmente:', nutritionId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .insert([newNutritionDevelopment]);

      if (error) {
        console.warn(
          'Erro ao sincronizar nutrição e desenvolvimento com o Supabase:',
          error.message
        );
        throw new Error(
          'Nutrição e desenvolvimento adicionados localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Nutrição e desenvolvimento sincronizados com sucesso:', nutritionId);
    } catch (error) {
      console.error('Erro ao criar nutrição e desenvolvimento:', error);
      throw new Error('Erro ao criar o registro de nutrição e desenvolvimento.');
    }
  };

  const updateNutritionDevelopment = async (
    nutritionId: string,
    updatedFields: Partial<AttendanceNutritionDevelopment>
  ) => {
    if (!nutritionId) {
      throw new Error(
        'O ID do registro de nutrição e desenvolvimento é obrigatório para a atualização.'
      );
    }

    try {
      console.log(
        'Iniciando atualização do registro de nutrição e desenvolvimento. ID:',
        nutritionId,
        'Campos a serem atualizados:',
        updatedFields
      );

      // Atualizar o registro de nutrição e desenvolvimento localmente
      const result = await db
        .updateTable('attendance_nutrition_development')
        .set(updatedFields)
        .where('id', '=', nutritionId)
        .execute();

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        console.error('Nenhum registro foi atualizado. Verifique o ID e os campos enviados.');
        throw new Error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
      }

      console.log('Nutrição e desenvolvimento atualizado localmente:', nutritionId);

      // Tentar sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .update(updatedFields)
        .eq('id', nutritionId);

      if (error) {
        console.warn(
          'Erro ao sincronizar atualização do registro de nutrição e desenvolvimento com o Supabase:',
          error.message
        );
        throw new Error(
          'Registro atualizado localmente, mas a sincronização com o Supabase falhou.'
        );
      }

      console.log('Nutrição e desenvolvimento sincronizados com sucesso:', nutritionId);
    } catch (error) {
      console.error('Erro ao atualizar o registro de nutrição e desenvolvimento:', error);
      throw new Error('Ocorreu um erro ao atualizar o registro de nutrição e desenvolvimento.');
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
