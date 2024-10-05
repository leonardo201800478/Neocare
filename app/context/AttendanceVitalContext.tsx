// app/context/AttendanceVitalContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AttendanceVital } from '../../powersync/AppSchema';

type AttendanceVitalContextType = {
  vitalSigns: AttendanceVital | null;
  setVitalSigns: (vitals: AttendanceVital | null) => void;
};

const AttendanceVitalContext = createContext<AttendanceVitalContextType | undefined>(undefined);

export const AttendanceVitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vitalSigns, setVitalSigns] = useState<AttendanceVital | null>(null);

  return (
    <AttendanceVitalContext.Provider value={{ vitalSigns, setVitalSigns }}>
      {children}
    </AttendanceVitalContext.Provider>
  );
};

export const useAttendanceVital = (): AttendanceVitalContextType => {
  const context = useContext(AttendanceVitalContext);
  if (!context) {
    throw new Error('useAttendanceVital deve ser usado dentro de um AttendanceVitalProvider');
  }
  return context;
};
