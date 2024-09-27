// powersync/PowerSyncProvider.tsx
import { PowerSyncContext } from '@powersync/react-native';
import React, { ReactNode, useMemo } from 'react';

import { useSystem } from '../powersync/PowerSync';

interface PowerSyncProviderProps {
  children: ReactNode;
}

// Provedor de contexto para o PowerSync
export const PowerSyncProvider = ({ children }: PowerSyncProviderProps) => {
  const { powersync } = useSystem(); // Acessa o sistema PowerSync

  // Memoriza o valor do contexto para evitar renderizações desnecessárias
  const db = useMemo(() => powersync, [powersync]);

  return <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>;
};

export default PowerSyncProvider;
