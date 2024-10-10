import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Doctor } from '../../powersync/AppSchema';
import { useSystem } from '../../powersync/PowerSync';
import { uuid } from '../../utils/uuid';

type DoctorContextType = {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  createDoctor: (doctor: Partial<Doctor>) => Promise<void>;
  updateDoctor: (doctorId: string, updatedFields: Partial<Doctor>) => Promise<void>;
};

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { db } = useSystem();

  const createDoctor = async (doctor: Partial<Doctor>) => {
    if (!doctor.name || !doctor.email) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    try {
      // Gerar um UUID para o novo médico
      const doctorId = uuid();

      // Criar um novo registro do médico, incluindo o campo terms_accepted como 0 por padrão
      await db
        .insertInto('doctors')
        .values({
          id: doctorId,
          name: doctor.name,
          email: doctor.email,
          created_at: new Date().toISOString(),
          auth_user_id: doctor.auth_user_id ?? null,
          terms_accepted: 0, // Por padrão, os termos não são aceitos (valor 0 como integer)
        })
        .execute();

      console.log('Médico criado com sucesso:', doctorId);
    } catch (error) {
      console.error('Erro ao criar o médico:', error);
      throw new Error('Ocorreu um erro ao cadastrar o médico.');
    }
  };

  const updateDoctor = async (doctorId: string, updatedFields: Partial<Doctor>) => {
    if (!doctorId) {
      throw new Error('O ID do médico é obrigatório para a atualização');
    }

    try {
      console.log(
        'Iniciando atualização do médico. ID:',
        doctorId,
        'Campos a serem atualizados:',
        updatedFields
      );

      // Atualizar o registro do médico
      const result = await db
        .updateTable('doctors')
        .set(updatedFields)
        .where('id', '=', doctorId)
        .execute();

      console.log('Resultado da atualização do médico:', result);

      const totalUpdatedRows = result.reduce((sum, res) => sum + res.numUpdatedRows, 0n);
      if (totalUpdatedRows === 0n) {
        console.error('Nenhum registro foi atualizado. Verifique o ID e os campos enviados.');
        throw new Error('Nenhum registro foi atualizado. Verifique os dados e tente novamente.');
      }

      console.log('Médico atualizado com sucesso:', doctorId);
    } catch (error) {
      console.error('Erro ao atualizar o médico:', error);
      throw new Error('Ocorreu um erro ao atualizar o médico.');
    }
  };

  return (
    <DoctorContext.Provider
      value={{ selectedDoctor, setSelectedDoctor, createDoctor, updateDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = (): DoctorContextType => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor deve ser usado dentro de um DoctorProvider');
  }
  return context;
};
