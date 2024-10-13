// app/context/AllergiesContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Allergy } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type AllergyContextType = {
  allergies: Allergy | null;
  setAllergies: (allergies: Allergy | null) => void;
  createAllergy: (allergy: Partial<Allergy>, patientId: string, doctorId: string) => Promise<void>;
  updateAllergy: (allergyId: string, updatedFields: Partial<Allergy>) => Promise<void>;
  fetchAllergiesByPatient: (patientId: string) => Promise<Allergy | null>;
};

const AllergyContext = createContext<AllergyContextType | undefined>(undefined);

export const AllergyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allergies, setAllergies] = useState<Allergy | null>(null);
  const { db, supabaseConnector } = useSystem();

  const createAllergy = async (allergy: Partial<Allergy>, patientId: string, doctorId: string) => {
    if (!patientId || !doctorId) {
      throw new Error('Both patientId and doctorId are required.');
    }

    try {
      const allergyId = uuid();
      const newAllergy = {
        id: allergyId,
        patient_id: patientId,
        doctor_id: doctorId,
        created_at: new Date().toISOString(),
        updated_at: null,
        allergy_milk: allergy.allergy_milk ?? null,
        allergy_eggs: allergy.allergy_eggs ?? null,
        allergy_beef: allergy.allergy_beef ?? null,
        allergy_fish: allergy.allergy_fish ?? null,
        allergy_shellfish: allergy.allergy_shellfish ?? null,
        allergy_cat: allergy.allergy_cat ?? null,
        allergy_dog: allergy.allergy_dog ?? null,
        allergy_bee: allergy.allergy_bee ?? null,
        allergy_ant: allergy.allergy_ant ?? null,
        allergy_venomous_animals: allergy.allergy_venomous_animals ?? null,
        allergy_insects: allergy.allergy_insects ?? null,
        allergy_dipyrone: allergy.allergy_dipyrone ?? null,
        allergy_aspirin: allergy.allergy_aspirin ?? null,
        allergy_diclofenac: allergy.allergy_diclofenac ?? null,
        allergy_paracetamol: allergy.allergy_paracetamol ?? null,
        allergy_penicillin: allergy.allergy_penicillin ?? null,
        allergy_magnesium_bisulphate: allergy.allergy_magnesium_bisulphate ?? null,
        allergy_rivaroxaban: allergy.allergy_rivaroxaban ?? null,
        allergy_losartan_potassium: allergy.allergy_losartan_potassium ?? null,
        allergy_metformin: allergy.allergy_metformin ?? null,
        allergy_butylscopolamine: allergy.allergy_butylscopolamine ?? null,
      };

      await db.insertInto('allergies').values(newAllergy).execute();
      setAllergies(newAllergy);

      const { error } = await supabaseConnector.client.from('allergies').insert([newAllergy]);

      if (error) {
        console.warn('Error syncing allergy with Supabase:', error.message);
        throw new Error('Allergy created locally but sync with Supabase failed.');
      }
    } catch (error) {
      console.error('Error creating allergy:', error);
      throw new Error('Failed to create allergy.');
    }
  };

  const updateAllergy = async (allergyId: string, updatedFields: Partial<Allergy>) => {
    if (!allergyId) {
      throw new Error('The allergy ID is required to update.');
    }

    try {
      await db.updateTable('allergies').set(updatedFields).where('id', '=', allergyId).execute();

      const { error } = await supabaseConnector.client
        .from('allergies')
        .update(updatedFields)
        .eq('id', allergyId);

      if (error) {
        console.warn('Error syncing updated allergy with Supabase:', error.message);
        throw new Error('Allergy updated locally but sync with Supabase failed.');
      }
    } catch (error) {
      console.error('Error updating allergy:', error);
      throw new Error('Failed to update allergy.');
    }
  };

  const fetchAllergiesByPatient = async (patientId: string) => {
    if (!patientId) {
      throw new Error('Patient ID is required to fetch allergies.');
    }

    try {
      const result = await db
        .selectFrom('allergies')
        .selectAll()
        .where('patient_id', '=', patientId)
        .execute();

      if (result.length === 0) {
        return null; // Não retornar erro, apenas retornar null se não houver alergias
      }

      const patientAllergies = result[0];
      setAllergies(patientAllergies);

      const { data, error } = await supabaseConnector.client
        .from('allergies')
        .select('*')
        .eq('patient_id', patientId);

      if (error) {
        console.warn('Error syncing allergies with Supabase:', error.message);
        throw new Error('Failed to fetch allergies from Supabase.');
      }

      return patientAllergies;
    } catch (error) {
      console.error('Error fetching allergies by patient ID:', error);
      throw new Error('Failed to fetch allergies.');
    }
  };

  return (
    <AllergyContext.Provider
      value={{ allergies, setAllergies, createAllergy, updateAllergy, fetchAllergiesByPatient }}>
      {children}
    </AllergyContext.Provider>
  );
};

export const useAllergy = (): AllergyContextType => {
  const context = useContext(AllergyContext);
  if (!context) {
    throw new Error('useAllergy must be used within an AllergyProvider.');
  }
  return context;
};
