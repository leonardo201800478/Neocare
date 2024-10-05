// app/context/AttendanceContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Attendance } from '../../powersync/AppSchema';

type AttendanceContextType = {
  selectedAttendance: Attendance | null;
  setSelectedAttendance: (attendance: Attendance | null) => void;
};

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

  return (
    <AttendanceContext.Provider value={{ selectedAttendance, setSelectedAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance deve ser usado dentro de um AttendanceProvider');
  }
  return context;
};
