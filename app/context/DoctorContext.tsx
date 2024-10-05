// app/context/DoctorContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type DoctorContextType = {
  doctorId: string | null;
  setDoctorId: (id: string | null) => void;
};

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctorId, setDoctorId] = useState<string | null>(null);

  return (
    <DoctorContext.Provider value={{ doctorId, setDoctorId }}>{children}</DoctorContext.Provider>
  );
};

export const useDoctor = (): DoctorContextType => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor must be used within a DoctorProvider');
  }
  return context;
};
