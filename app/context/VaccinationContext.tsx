import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Vaccination } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type VaccinationContextType = {
  vaccinations: Vaccination[];
  addVaccination: (
    vaccination: Partial<Vaccination>,
    doctorId: string,
    patientId: string
  ) => Promise<void>;
  removeVaccination: (id: string) => Promise<void>;
};

const VaccinationContext = createContext<VaccinationContextType | undefined>(undefined);

export const VaccinationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const { db, supabaseConnector } = useSystem();

  const addVaccination = async (
    vaccination: Partial<Vaccination>,
    doctorId: string,
    patientId: string
  ) => {
    if (!doctorId || !patientId || !vaccination.vaccine_name) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
    }

    try {
      const vaccinationId = uuid();

      const newVaccination = {
        id: vaccinationId,
        patient_id: patientId,
        doctor_id: doctorId,
        vaccine_name: vaccination.vaccine_name,
        dose_number: vaccination.dose_number ? String(vaccination.dose_number) : '1',
        administered_at: vaccination.administered_at || new Date().toISOString(),
        created_at: new Date().toISOString(),
      };

      await db.insertInto('vaccinations').values(newVaccination).execute();
      setVaccinations((prev) => [...prev, newVaccination]);

      const { error } = await supabaseConnector.client
        .from('vaccinations')
        .insert([newVaccination]);

      if (error) {
        console.warn('Erro ao sincronizar vacinação com o Supabase:', error.message);
        throw new Error(
          'Vacinação adicionada localmente, mas a sincronização com o Supabase falhou.'
        );
      }
    } catch (error) {
      console.error('Erro ao adicionar vacinação:', error);
      throw new Error('Erro ao adicionar a vacinação.');
    }
  };

  const removeVaccination = async (id: string) => {
    if (!id) {
      throw new Error('O ID da vacinação é obrigatório para a remoção.');
    }

    try {
      await db.deleteFrom('vaccinations').where('id', '=', id).execute();
      setVaccinations((prev) => prev.filter((vaccination) => vaccination.id !== id));

      const { error } = await supabaseConnector.client.from('vaccinations').delete().eq('id', id);
      if (error) {
        console.warn('Erro ao remover vacinação do Supabase:', error.message);
        throw new Error('Vacinação removida localmente, mas a remoção do Supabase falhou.');
      }
    } catch (error) {
      console.error('Erro ao remover vacinação:', error);
      throw new Error('Erro ao remover a vacinação.');
    }
  };

  return (
    <VaccinationContext.Provider value={{ vaccinations, addVaccination, removeVaccination }}>
      {children}
    </VaccinationContext.Provider>
  );
};

export const useVaccination = (): VaccinationContextType => {
  const context = useContext(VaccinationContext);
  if (!context) {
    throw new Error('useVaccination deve ser usado dentro de um VaccinationProvider');
  }
  return context;
};
