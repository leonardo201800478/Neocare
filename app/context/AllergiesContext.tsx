import React, { createContext, useContext, useState, ReactNode } from 'react';

import { useSystem } from '../../powersync/PowerSync';

type Allergy = {
  id: string;
  patient_id: string;
  doctor_id: string;
  allergy_milk?: string;
  allergy_eggs?: string;
  allergy_beef?: string;
  allergy_fish?: string;
  allergy_shellfish?: string;
  allergy_cat?: string;
  allergy_dog?: string;
  allergy_bee?: string;
  allergy_ant?: string;
  allergy_venomous_animals?: string;
  allergy_insects?: string;
  allergy_dipyrone?: string;
  allergy_aspirin?: string;
  allergy_diclofenac?: string;
  allergy_paracetamol?: string;
  allergy_penicillin?: string;
  allergy_magnesium_bisulphate?: string;
  allergy_rivaroxaban?: string;
  allergy_losartan_potassium?: string;
  allergy_metformin?: string;
  allergy_butylscopolamine?: string;
  allergy_cephalosporin?: string;
  allergy_salbutamol?: string;
  allergy_acido_folico?: string;
  allergy_isotretinoina?: string;
};

type AllergiesContextType = {
  allergies: Allergy[];
  addOrUpdateAllergy: (
    allergy: Partial<Allergy>,
    doctorId: string,
    patientId: string
  ) => Promise<void>;
  fetchAllergiesByPatient: (patientId: string) => Promise<Allergy[] | null>;
};

const AllergiesContext = createContext<AllergiesContextType | undefined>(undefined);

export const AllergiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allergies] = useState<Allergy[]>([]);
  const { supabaseConnector } = useSystem();

  // Função para adicionar ou atualizar alergias
  const addOrUpdateAllergy = async (
    allergy: Partial<Allergy>,
    doctorId: string,
    patientId: string
  ) => {
    console.log('Iniciando o processo de adicionar ou atualizar alergia:', {
      allergy,
      doctorId,
      patientId,
    });

    try {
      // Verificar se o paciente já possui um registro de alergias
      const { data: existingAllergies, error: fetchError } = await supabaseConnector.client
        .from('allergies')
        .select('*')
        .eq('patient_id', patientId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Erro ao verificar alergias existentes:', fetchError);
        return;
      }

      if (existingAllergies) {
        // Se o registro já existe, atualize-o
        console.log('Registro de alergia existente encontrado, atualizando:', existingAllergies);
        const { error: updateError } = await supabaseConnector.client
          .from('allergies')
          .update({ ...allergy, doctor_id: doctorId })
          .eq('patient_id', patientId);

        if (updateError) {
          console.error('Erro ao atualizar alergia:', updateError.message);
        } else {
          console.log('Alergia atualizada com sucesso!');
        }
      } else {
        // Caso não exista, crie um novo registro
        console.log('Nenhuma alergia existente, criando novo registro.');
        const { error: insertError } = await supabaseConnector.client
          .from('allergies')
          .insert([{ ...allergy, doctor_id: doctorId, patient_id: patientId }]);

        if (insertError) {
          console.error('Erro ao inserir nova alergia:', insertError.message);
        } else {
          console.log('Nova alergia registrada com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro inesperado ao adicionar/atualizar alergia:', error);
    }
  };

  // Função para buscar alergias de um paciente específico
  const fetchAllergiesByPatient = async (patientId: string): Promise<Allergy[] | null> => {
    console.log('Buscando alergias para o paciente:', patientId);

    try {
      const { data, error } = await supabaseConnector.client
        .from('allergies')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        console.error('Erro ao buscar alergias:', error.message);
        return null;
      }

      console.log('Alergias recebidas do Supabase:', data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar alergias:', error);
      return null;
    }
  };

  return (
    <AllergiesContext.Provider value={{ allergies, addOrUpdateAllergy, fetchAllergiesByPatient }}>
      {children}
    </AllergiesContext.Provider>
  );
};

export const useAllergies = (): AllergiesContextType => {
  const context = useContext(AllergiesContext);
  if (!context) {
    throw new Error('useAllergies deve ser usado dentro de um AllergiesProvider');
  }
  return context;
};
