// app/context/VaccinationContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Vaccination } from '../../powersync/AppSchema';

type VaccinationContextType = {
  vaccinations: Vaccination[];
  addVaccination: (vaccination: Vaccination) => void;
  removeVaccination: (id: string) => void;
};

const VaccinationContext = createContext<VaccinationContextType | undefined>(undefined);

export const VaccinationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  const addVaccination = (vaccination: Vaccination) => {
    setVaccinations((prev) => [...prev, vaccination]);
  };

  const removeVaccination = (id: string) => {
    setVaccinations((prev) => prev.filter((vacc) => vacc.id !== id));
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
