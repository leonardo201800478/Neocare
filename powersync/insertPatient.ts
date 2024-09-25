// insertPatient.ts

import { system } from '~/powersync/PowerSync';
import { uuid } from '~/powersync/uuid';

export const insertPatient = async (patientData: {
  nome_patients: string;
  cpf_patients: string;
  doctor_id: string;
  created_by: string;
}) => {
  const { db } = system;

  try {
    await db
      .insertInto('patients')
      .values({
        id: uuid(),
        nome_patients: patientData.nome_patients,
        cpf_patients: patientData.cpf_patients,
        doctor_id: patientData.doctor_id,
        created_by: patientData.created_by,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .execute();

    console.log('Paciente registrado com sucesso');
  } catch (error: any) {
    console.error('Erro ao registrar paciente:', (error as Error).message);
  }
};
