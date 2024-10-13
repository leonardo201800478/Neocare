import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Allergy } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

// Definindo o tipo para o contexto de alergias
type AllergyContextType = {
  allergies: Allergy[] | null;
  setAllergies: (allergies: Allergy[] | null) => void;
  createAllergy: (allergy: Partial<Allergy>, patientId: string, doctorId: string) => Promise<void>;
  updateAllergy: (allergyId: string, updatedFields: Partial<Allergy>) => Promise<void>;
  fetchAllergiesByPatient: (patientId: string) => Promise<Allergy[] | null>;
};

// Inicializando o contexto
const AllergyContext = createContext<AllergyContextType | undefined>(undefined);

// Provider de contexto de alergias
export const AllergyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allergies, setAllergies] = useState<Allergy[] | null>(null);
  const { db, supabaseConnector } = useSystem();

  // Função para criar uma nova alergia
  const createAllergy = async (allergy: Partial<Allergy>, patientId: string, doctorId: string) => {
    if (!patientId || !doctorId) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    try {
      const allergyId = uuid();

      const newAllergy = {
        id: allergyId,
        patient_id: patientId,
        doctor_id: doctorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        allergy_milk: '0', // Setando valores como '0' para o campo string
        allergy_eggs: '0',
        allergy_fish: '0',
        allergy_shellfish: '0',
        allergy_cat: '0',
        allergy_dog: '0',
        allergy_bee: '0',
        allergy_ant: '0',
        allergy_venomous_animals: '0',
        allergy_insects: '0',
        allergy_aspirin: '0',
        allergy_diclofenac: '0',
        allergy_paracetamol: '0',
        allergy_penicillin: '0',
        allergy_magnesium_bisulphate: '0',
        allergy_rivaroxaban: '0',
        allergy_losartan_potassium: '0',
        allergy_metformin: '0',
        allergy_butylscopolamine: '0',
        allergy_beef: '0',
        allergy_dipyrone: '0',
      };

      await db.insertInto('allergies').values(newAllergy).execute();
      setAllergies((prev) => [...(prev || []), newAllergy]);

      const { error } = await supabaseConnector.client.from('allergies').insert([newAllergy]);

      if (error) {
        console.warn('Erro ao sincronizar alergia com o Supabase:', error.message);
        throw new Error('Alergia criada localmente, mas a sincronização com o Supabase falhou.');
      }
    } catch (error) {
      console.error('Erro ao criar alergia:', error);
      throw new Error('Erro ao criar alergia.');
    }
  };

  // Função para atualizar uma alergia
  const updateAllergy = async (allergyId: string, updatedFields: Partial<Allergy>) => {
    if (!allergyId) {
      throw new Error('O ID da alergia é obrigatório.');
    }

    try {
      await db.updateTable('allergies').set(updatedFields).where('id', '=', allergyId).execute();

      const { error } = await supabaseConnector.client
        .from('allergies')
        .update(updatedFields)
        .eq('id', allergyId);

      if (error) {
        console.warn('Erro ao sincronizar atualização com o Supabase:', error.message);
        throw new Error(
          'Alergia atualizada localmente, mas a sincronização com o Supabase falhou.'
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar alergia:', error);
      throw new Error('Erro ao atualizar alergia.');
    }
  };

  // Função para buscar as alergias de um paciente
  const fetchAllergiesByPatient = async (patientId: string): Promise<Allergy[] | null> => {
    if (!patientId) {
      throw new Error('O ID do paciente é obrigatório.');
    }

    try {
      const allergies = await db
        .selectFrom('allergies')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();

      if (allergies.length === 0) {
        console.warn('Nenhuma alergia encontrada para o paciente:', patientId);
        return null;
      }

      setAllergies(allergies);
      return allergies;
    } catch (error) {
      console.error('Erro ao buscar alergias do paciente:', error);
      throw new Error('Erro ao buscar alergias do paciente.');
    }
  };

  return (
    <AllergyContext.Provider
      value={{
        allergies,
        setAllergies,
        createAllergy,
        updateAllergy,
        fetchAllergiesByPatient,
      }}>
      {children}
    </AllergyContext.Provider>
  );
};

// Hook para acessar o contexto de alergias
export const useAllergy = (): AllergyContextType => {
  const context = useContext(AllergyContext);
  if (!context) {
    throw new Error('useAllergy deve ser usado dentro de um AllergyProvider.');
  }
  return context;
};
