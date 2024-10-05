// app/context/PatientContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient } from '../../powersync/AppSchema';

type PatientContextType = {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <PatientContext.Provider value={{ selectedPatient, setSelectedPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient deve ser usado dentro de um PatientProvider');
  }
  return context;
};
