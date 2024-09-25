import * as Crypto from 'expo-crypto';

import { system } from '~/powersync/PowerSync'; // Importa o system diretamente

export const insertPatient = async (patientData: {
  nome_patients: string;
  cpf_patients: string;
  doctor_id: string;
}) => {
  const { db } = system;
  try {
    await db
      .insertInto('patients')
      .values({
        id: Crypto.randomUUID(), // Gera UUID usando expo-crypto
        nome_patients: patientData.nome_patients,
        cpf_patients: patientData.cpf_patients,
        doctor_id: patientData.doctor_id,
        created_at: new Date().toISOString(),
        inserted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .execute();
    console.log('Paciente inserido com sucesso');
  } catch (error) {
    console.error('Erro ao inserir paciente:', error);
  }
};
