import {
  AbstractPowerSyncDatabase,
  CrudEntry,
  PowerSyncBackendConnector,
  UpdateType,
} from '@powersync/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

// Definindo códigos de resposta fatais que não podem ser recuperados por meio de novas tentativas
const FATAL_RESPONSE_CODES: RegExp[] = [
  new RegExp('^22...$'), // Class 22 — Data Exception (ex.: tipo de dado incorreto)
  new RegExp('^23...$'), // Class 23 — Integrity Constraint Violation (ex.: restrições NOT NULL, UNIQUE, etc.)
  new RegExp('^42501$'), // INSUFFICIENT PRIVILEGE - geralmente uma violação de segurança em nível de linha
];

// Função para obter variáveis de ambiente de maneira segura
const getEnvironmentVariable = (key: string) => {
  if (Constants.expoConfig && Constants.expoConfig.extra) {
    return Constants.expoConfig.extra[key];
  }
  throw new Error(`Missing environment variable: ${key}`);
};

// Obtendo variáveis de ambiente do Supabase e PowerSync
const supabaseUrl = getEnvironmentVariable('supabaseUrl');
const supabaseAnonKey = getEnvironmentVariable('supabaseAnonKey');
const powersyncUrl = getEnvironmentVariable('powersyncUrl');

// Verificando se as variáveis estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is not defined');
}

export class SupabaseConnector implements PowerSyncBackendConnector {
  client: SupabaseClient;

  constructor() {
    // Inicializando o cliente Supabase com AsyncStorage para armazenar a sessão
    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
      },
    });
  }

  // Função para login utilizando o e-mail e senha do usuário
  async login(username: string, password: string) {
    const { error } = await this.client.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) {
      throw error;
    }
  }

  // Obtém as credenciais de autenticação do Supabase
  async fetchCredentials() {
    const {
      data: { session },
      error,
    } = await this.client.auth.getSession();

    if (!session || error) {
      throw new Error(`Could not fetch Supabase credentials: ${error?.message}`);
    }

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
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return;
    }

    let lastOp: CrudEntry | null = null;
    try {
      for (const op of transaction.crud) {
        lastOp = op;
        const table = this.client.from(op.table);
        let result: any = null;

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
          throw new Error(
            `Could not ${op.op} data to Supabase. Error: ${JSON.stringify(result.error)}`
          );
        }
      }

      await transaction.complete();
    } catch (ex: any) {
      if (
        typeof ex.code === 'string' &&
        FATAL_RESPONSE_CODES.some((regex: RegExp) => regex.test(ex.code))
      ) {
        await transaction.complete();
      } else {
        throw ex;
      }
    }
  }
}
