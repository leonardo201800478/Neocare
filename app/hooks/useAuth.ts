// app/hooks/useAuth.ts

import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useSystem } from '../../powersync/PowerSync'; // Acessar Supabase e Powersync
import { useDoctor } from '../context/DoctorContext'; // Acessar o contexto de médicos

export const useAuth = () => {
  const { supabaseConnector } = useSystem();
  const router = useRouter();
  const { createOrUpdateDoctor } = useDoctor(); // Função para criar ou atualizar médico no contexto

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        // Verificar a autenticação do usuário no Supabase
        console.log('Verificando autenticação...');
        const credentials = await supabaseConnector.fetchCredentials();
        const { client } = credentials;

        // Obter o usuário autenticado
        const { data, error } = await client.auth.getUser();
        if (error || !data?.user) {
          console.error('Erro ao obter usuário autenticado:', error);
          return;
        }

        const userId = data.user.id;
        const email = data.user.email;

        // Criar ou atualizar o médico usando o contexto
        console.log('Criando ou atualizando o registro do médico...');
        await createOrUpdateDoctor({
          auth_user_id: userId,
          email,
        });

        // Verificar o status do médico para definir o redirecionamento
        const { data: doctorData, error: doctorError } = await client
          .from('doctors')
          .select('name, terms_accepted')
          .eq('auth_user_id', userId)
          .single();

        if (doctorError) {
          console.error('Erro ao buscar dados do médico:', doctorError);
          return;
        }

        // Verificar se o médico já preencheu o nome
        if (!doctorData?.name) {
          console.log('Médico sem nome. Redirecionando para cadastro de nome...');
          router.replace('/(tabs)/doctors/register'); // Redirecionar para cadastro de nome do médico
        } else if (doctorData.terms_accepted !== 1) {
          console.log('Termos de aceite não aceitos. Redirecionando...');
          router.replace('/terms/'); // Redirecionar para tela de termos de aceite
        } else {
          console.log('Tudo certo. Redirecionando para Home...');
          router.replace('/(tabs)/home'); // Redirecionar para a tela principal
        }
      } catch (e) {
        console.error('Erro ao verificar a autenticação e status do médico:', e);
      }
    };

    checkUserAndRedirect();
  }, [router, supabaseConnector, createOrUpdateDoctor]);
};
