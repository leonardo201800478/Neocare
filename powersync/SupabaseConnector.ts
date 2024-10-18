import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import {
  AbstractPowerSyncDatabase,
  CrudEntry,
  PowerSyncBackendConnector,
  UpdateType,
} from '@powersync/react-native';
import Constants from 'expo-constants'; // Para acessar variáveis de ambiente no Expo

// Acessando as variáveis de ambiente a partir de Constants.expoConfig
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;
const powersyncUrl = Constants.expoConfig?.extra?.powersyncUrl;

// Definindo códigos de resposta fatais que não podem ser recuperados por meio de novas tentativas
const FATAL_RESPONSE_CODES = [
  new RegExp('^22...$'), // Class 22 — Data Exception (ex.: tipo de dado incorreto)
  new RegExp('^23...$'), // Class 23 — Integrity Constraint Violation (ex.: restrições NOT NULL, UNIQUE, etc.)
  new RegExp('^42501$'), // INSUFFICIENT PRIVILEGE - geralmente uma violação de segurança em nível de linha
];

export class SupabaseConnector implements PowerSyncBackendConnector {
  client: SupabaseClient;

  constructor() {
    // Verificando se as variáveis de ambiente estão disponíveis
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is not defined');
    }

    console.log('Initializing Supabase client...');
    // Inicializando o cliente Supabase com AsyncStorage para armazenar a sessão
    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
      },
    });
    console.log('Supabase client initialized successfully.');
  }

  // Função para login utilizando o e-mail e senha do usuário
  async login(username: string, password: string) {
    console.log(`Attempting login for user: ${username}`);
    const { error } = await this.client.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      console.error('Login failed:', error.message);
      throw error;
    }

    console.log('Login successful');
  }

  // Obtém as credenciais de autenticação do Supabase
  async fetchCredentials() {
    console.log('Fetching Supabase credentials...');
    const { data: { session }, error } = await this.client.auth.getSession();

    if (!session || error) {
      console.error('Could not fetch Supabase credentials:', error);
      throw new Error(`Could not fetch Supabase credentials: ${error?.message}`);
    }

    console.debug('Session expires at', session.expires_at);

    return {
      client: this.client,
      endpoint: powersyncUrl,
      token: session.access_token ?? '',
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined,
      userID: session.user.id,
    };
  }

  // Função para fazer upload dos dados (sincronização) com o PowerSync e Supabase
  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    console.log('Starting data upload...');
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      console.log('No pending transactions to upload.');
      return;
    }

    let lastOp: CrudEntry | null = null;
    try {
      for (const op of transaction.crud) {
        lastOp = op;
        const table = this.client.from(op.table);
        let result: any = null;

        console.log(`Uploading operation: ${op.op} on table: ${op.table}`);
        switch (op.op) {
          case UpdateType.PUT:
            const record = { ...op.opData, id: op.id };
            result = await table.upsert(record);
            break;
          case UpdateType.PATCH:
            result = await table.update(op.opData).eq('id', op.id);
            break;
          case UpdateType.DELETE:
            result = await table.delete().eq('id', op.id);
            break;
        }

        if (result.error) {
          console.error(`Failed to ${op.op} data to Supabase:`, result.error.message);
          throw new Error(`Could not ${op.op} data to Supabase. Error: ${JSON.stringify(result.error)}`);
        }
      }

      console.log('Data upload completed successfully.');
      await transaction.complete();
    } catch (ex: any) {
      console.error('Error during data upload:', ex.message);
      if (
        typeof ex.code === 'string' &&
        FATAL_RESPONSE_CODES.some((regex) => regex.test(ex.code))
      ) {
        console.error(`Data upload error - discarding ${lastOp}`, ex);
        await transaction.complete();
      } else {
        throw ex;
      }
    }
  }
}
