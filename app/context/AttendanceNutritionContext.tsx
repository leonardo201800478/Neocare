import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceNutritionDevelopment } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AttendanceNutritionContextType = {
  nutrition: AttendanceNutritionDevelopment[] | null;
  setNutrition: (nutrition: AttendanceNutritionDevelopment[] | null) => void;
  createNutrition: (
    nutrition: Partial<AttendanceNutritionDevelopment>,
    doctorId: string,
    patientId: string
  ) => Promise<{ nutritionId: string | null; error: string | null }>;
  fetchNutritionById: (nutritionId: string) => Promise<AttendanceNutritionDevelopment | null>;
  fetchNutritionByAttendanceId: (
    attendanceId: string
  ) => Promise<AttendanceNutritionDevelopment[] | null>;
};

const NutritionContext = createContext<AttendanceNutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [nutrition, setNutrition] = useState<AttendanceNutritionDevelopment[] | null>(null);
  const { db, supabaseConnector } = useSystem();

  // Função para criar um novo registro de nutrição e desenvolvimento
  const createNutrition = async (
    nutrition: Partial<AttendanceNutritionDevelopment>,
    doctorId: string,
    patientId: string
  ): Promise<{ nutritionId: string | null; error: string | null }> => {
    if (!doctorId || !patientId) {
      return { nutritionId: null, error: 'ID do médico e paciente são obrigatórios.' };
    }

    try {
      const nutritionId = uuid();

      const newNutrition: AttendanceNutritionDevelopment = {
        id: nutritionId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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
        doctor_id: doctorId,
        patient_id: patientId,
      };

      // Salvar localmente
      await db.insertInto('attendance_nutrition_development').values(newNutrition).execute();

      // Atualizar o estado
      setNutrition((prev) => (prev ? [...prev, newNutrition] : [newNutrition]));

      // Sincronizar com o Supabase
      const { error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .insert([newNutrition]);

      if (error) {
        return {
          nutritionId: null,
          error: 'Erro ao sincronizar nutrição e desenvolvimento com o Supabase: ' + error.message,
        };
      }

      return { nutritionId, error: null };
    } catch (error) {
      return {
        nutritionId: null,
        error: 'Erro ao criar nutrição e desenvolvimento: ' + (error as Error).message,
      };
    }
  };

  // Função para buscar registro de nutrição por ID específico
  const fetchNutritionById = async (
    nutritionId: string
  ): Promise<AttendanceNutritionDevelopment | null> => {
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

  // Função para buscar registros de nutrição por ID de atendimento
  const fetchNutritionByAttendanceId = async (
    attendanceId: string
  ): Promise<AttendanceNutritionDevelopment[] | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('attendance_nutrition_development')
        .select('*')
        .eq('attendance_id', attendanceId);

      if (error) {
        console.error(
          'Erro ao buscar dados de nutrição e desenvolvimento pelo ID de atendimento:',
          error.message
        );
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar dados de nutrição e desenvolvimento:', error);
      return null;
    }
  };

  return (
    <NutritionContext.Provider
      value={{
        nutrition,
        setNutrition,
        createNutrition,
        fetchNutritionById,
        fetchNutritionByAttendanceId,
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
