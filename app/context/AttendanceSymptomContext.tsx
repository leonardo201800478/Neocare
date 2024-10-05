// app/context/AttendanceSymptomContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AttendanceSymptom } from '../../powersync/AppSchema';

type AttendanceSymptomContextType = {
  symptoms: AttendanceSymptom | null;
  setSymptoms: (symptoms: AttendanceSymptom | null) => void;
};

const AttendanceSymptomContext = createContext<AttendanceSymptomContextType | undefined>(undefined);

export const AttendanceSymptomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<AttendanceSymptom | null>(null);

  return (
    <AttendanceSymptomContext.Provider value={{ symptoms, setSymptoms }}>
      {children}
    </AttendanceSymptomContext.Provider>
  );
};

export const useAttendanceSymptom = (): AttendanceSymptomContextType => {
  const context = useContext(AttendanceSymptomContext);
  if (!context) {
    throw new Error('useAttendanceSymptom deve ser usado dentro de um AttendanceSymptomProvider');
  }
  return context;
};
