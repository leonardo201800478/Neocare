// app/context/AttendanceNutritionDevelopmentContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { AttendanceNutritionDevelopment } from '../../powersync/AppSchema';

type AttendanceNutritionDevelopmentContextType = {
  nutritionDevelopment: AttendanceNutritionDevelopment | null;
  setNutritionDevelopment: (nutrition: AttendanceNutritionDevelopment | null) => void;
};

const AttendanceNutritionDevelopmentContext = createContext<
  AttendanceNutritionDevelopmentContextType | undefined
>(undefined);

export const AttendanceNutritionDevelopmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [nutritionDevelopment, setNutritionDevelopment] =
    useState<AttendanceNutritionDevelopment | null>(null);

  return (
    <AttendanceNutritionDevelopmentContext.Provider
      value={{ nutritionDevelopment, setNutritionDevelopment }}>
      {children}
    </AttendanceNutritionDevelopmentContext.Provider>
  );
};

export const useAttendanceNutritionDevelopment = (): AttendanceNutritionDevelopmentContextType => {
  const context = useContext(AttendanceNutritionDevelopmentContext);
  if (!context) {
    throw new Error(
      'useAttendanceNutritionDevelopment deve ser usado dentro de um AttendanceNutritionDevelopmentProvider'
    );
  }
  return context;
};
