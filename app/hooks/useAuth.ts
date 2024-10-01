// app/hooks/useAuth.ts

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useSystem } from '../../powersync/PowerSync'; // Corrigindo a importação para pegar o sistema

export const useAuth = () => {
  const { supabaseConnector, db } = useSystem(); // Certifique-se de usar 'useSystem' para acessar o supabaseConnector
  const router = useRouter();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        const credentials = await supabaseConnector.fetchCredentials();
        const { client, userID } = credentials;

        // Obter o usuário autenticado
        const { data, error } = await client.auth.getUser();

        if (error) {
          console.error('Erro ao obter usuário autenticado:', error);
          return;
        }

        // Verificar se o usuário está registrado como médico
        const { data: doctorData, error: doctorError } = await client
          .from('doctors')
          .select('id, name')
          .eq('id', userID)
          .single();

        if (doctorError) {
          // Se o registro do médico não existir, cria um com um nome nulo
          if (doctorError.code === 'PGRST116') {
            await addDoctorIfNotExists(userID, data?.user?.email, client);
            router.replace('/doctors/register');
          } else {
            throw doctorError;
          }
        } else if (!doctorData?.name) {
          // Se o médico existir, mas o nome não estiver definido, redireciona para o registro
          router.replace('/doctors/register');
        } else {
          // Médico existe e nome está definido, pode prosseguir para a Home
          router.replace('/home/');
        }
      } catch (e) {
        console.error('Erro ao verificar a autenticação:', e);
      }
    };

    checkUserAndRedirect();
  }, [router, supabaseConnector, db]);
};

// Função para adicionar o médico se não existir
const addDoctorIfNotExists = async (userID: string, email?: string, client?: any) => {
  try {
    const { error: insertError } = await client.from('doctors').insert({
      id: userID,
      email,
      created_at: new Date().toISOString(),
      name: null,
    });

    if (insertError) {
      throw insertError;
    }
    console.log('Novo médico adicionado com sucesso.');
  } catch (error) {
    console.error('Erro ao adicionar médico:', error);
  }
};
