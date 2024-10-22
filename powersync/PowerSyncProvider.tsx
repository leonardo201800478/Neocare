import { PowerSyncContext } from '@powersync/react-native'; // Importando o contexto do PowerSync
import React, { ReactNode, useMemo } from 'react';

import { useSystem } from './PowerSync'; // Função customizada para acessar a instância do PowerSync

// Definindo o componente PowerSyncProvider para envolver a aplicação com o contexto do PowerSync
export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  // Obtendo a instância do PowerSync através do hook useSystem
  const { powersync } = useSystem();

  // Memoizando o banco de dados do PowerSync para evitar recriação desnecessária
  const db = useMemo(() => {
    return powersync;
  }, [powersync]);

  // Retornando o contexto do PowerSync com o banco de dados providenciado
  return <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>;
};
