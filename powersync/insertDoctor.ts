import * as Crypto from 'expo-crypto';

import { system } from '~/powersync/PowerSync'; // Importa o system diretamente

export const insertDoctor = async (doctorData: { nome_user: string; owner_id: string }) => {
  const { db } = system; // Acessa diretamente a instância do sistema sem hooks
  try {
    await db
      .insertInto('doctors')
      .values({
        id: Crypto.randomUUID(), // Gera UUID usando expo-crypto
        name_user: doctorData.nome_user,
        owner_id: doctorData.owner_id,
        created_at: new Date().toISOString(),
        inserted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .execute();
    console.log('Doutor inserido com sucesso');
  } catch (error) {
    console.error('Erro ao inserir doutor:', error);
  }
};
