import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Adiciona um médico à tabela de médicos, se ele não existir.
 * @param client Instância do cliente Supabase
 * @param userID ID do usuário autenticado
 * @param email Email do usuário autenticado
 */
export const addDoctorIfNotExists = async (
  client: SupabaseClient,
  userID: string,
  email: string
) => {
  try {
    const { data, error } = await client.from('doctors').select('id').eq('id', userID).single();

    if (error && error.code === 'PGRST116') {
      // Insere um novo médico com nome nulo, pois ele será registrado depois
      const { error: insertError } = await client.from('doctors').insert({
        id: userID,
        email,
        created_at: new Date().toISOString(),
        name: null,
      });

      if (insertError) throw insertError;
      console.log('Novo médico adicionado com sucesso.');
    }
  } catch (error) {
    console.error('Erro ao adicionar médico se não existir:', error);
  }
};
