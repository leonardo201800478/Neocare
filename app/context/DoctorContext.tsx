// app/context/DoctorContext.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react';

import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

// Definindo o tipo para o médico
type Doctor = {
  id: string;
  created_at: string;
  email: string;
  name: string | null;
  auth_user_id: string;
  terms_accepted: number | null;
};

// Definindo o tipo de contexto
type DoctorContextType = {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  createOrUpdateDoctor: (doctor: Partial<Doctor>) => Promise<void>;
  fetchDoctorById: (doctorId: string) => Promise<Doctor | null>; // Adicionando função para buscar médico pelo ID
};

// Inicializando o contexto
const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { supabaseConnector } = useSystem(); // Acessando Supabase através de Powersync

  // Função para criar ou atualizar o médico verificando duplicidade
  const createOrUpdateDoctor = async (doctor: Partial<Doctor>) => {
    try {
      // Obter o cliente do Supabase através do Powersync
      console.log('[INFO] Tentando obter o cliente do Supabase...');
      const { client } = await supabaseConnector.fetchCredentials();

      if (!client) {
        console.error('[ERRO] Supabase client não encontrado.');
        throw new Error('Erro ao acessar o Supabase.');
      }

      console.log('[INFO] Supabase client obtido com sucesso.');

      // Verificar se o médico já existe com base no 'auth_user_id'
      console.log(
        `[INFO] Verificando se o médico com auth_user_id=${doctor.auth_user_id} já existe...`
      );
      const { data: existingDoctor, error: doctorError } = await client
        .from('doctors')
        .select('id')
        .eq('auth_user_id', doctor.auth_user_id)
        .single();

      if (doctorError) {
        console.error(`[ERRO] Erro ao buscar médico: ${doctorError.message}`);
        if (doctorError.code !== 'PGRST116') {
          throw new Error(`Erro ao buscar médico: ${doctorError.message}`);
        }
      }

      if (existingDoctor) {
        // Se o médico já existir, atualize os dados
        console.log(
          `[INFO] Médico com auth_user_id=${doctor.auth_user_id} encontrado. Atualizando dados...`
        );
        const { error: updateError } = await client
          .from('doctors')
          .update(doctor)
          .eq('auth_user_id', doctor.auth_user_id);

        if (updateError) {
          console.error(`[ERRO] Erro ao atualizar médico: ${updateError.message}`);
          throw new Error(`Erro ao atualizar médico: ${updateError.message}`);
        }

        console.log('[INFO] Médico atualizado com sucesso.');
      } else {
        // Se não existir, crie um novo registro com auth_user_id
        console.log(
          `[INFO] Médico com auth_user_id=${doctor.auth_user_id} não encontrado. Criando novo registro...`
        );
        const { error: insertError } = await client.from('doctors').insert({
          id: uuid(), // Gerando um UUID
          created_at: new Date().toISOString(),
          ...doctor,
        });

        if (insertError) {
          console.error(`[ERRO] Erro ao criar médico: ${insertError.message}`);
          throw new Error(`Erro ao criar médico: ${insertError.message}`);
        }

        console.log('[INFO] Médico criado com sucesso.');
      }
    } catch (error) {
      console.error('[ERRO] Erro ao criar ou atualizar médico:', error);
      throw error;
    }
  };

  // Função para buscar médico pelo ID
  const fetchDoctorById = async (doctorId: string): Promise<Doctor | null> => {
    try {
      const { data, error } = await supabaseConnector.client
        .from('doctors')
        .select('*')
        .eq('id', doctorId)
        .single();

      if (error) {
        console.error('Erro ao buscar médico pelo ID:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro ao buscar médico:', error);
      return null;
    }
  };

  return (
    <DoctorContext.Provider
      value={{ selectedDoctor, setSelectedDoctor, createOrUpdateDoctor, fetchDoctorById }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

// Hook para acessar o contexto
export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor deve ser usado dentro de um DoctorProvider');
  }
  return context;
};
