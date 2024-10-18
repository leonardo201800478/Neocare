import '@azure/core-asynciterator-polyfill';
import 'react-native-polyfill-globals/auto';
import { Kysely, wrapPowerSyncWithKysely } from '@powersync/kysely-driver';
import { PowerSyncDatabase } from '@powersync/react-native';
import React from 'react';

import { AppSchema, Database } from './AppSchema';
import { SupabaseConnector } from '../powersync/SupabaseConnector';

export class System {
  supabaseConnector: SupabaseConnector;
  powersync: PowerSyncDatabase;
  db: Kysely<Database>;

  constructor() {
    this.supabaseConnector = new SupabaseConnector();
    this.powersync = new PowerSyncDatabase({
      schema: AppSchema,
      database: {
        dbFilename: 'app.sqlite',
      },
    });
    this.db = wrapPowerSyncWithKysely(this.powersync);
  }

  async init() {
    await this.powersync.init();
    await this.powersync.connect(this.supabaseConnector);
  }
}

export const system = new System();

export const SystemContext = React.createContext(system);
export const useSystem = () => React.useContext(SystemContext);
