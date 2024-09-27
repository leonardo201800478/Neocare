// powersync/SupabaseConnector.ts
import {
  AbstractPowerSyncDatabase,
  CrudEntry,
  PowerSyncBackendConnector,
  UpdateType,
} from '@powersync/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Necessário para lidar com URLs no React Native

// Define códigos de erro fatais do Postgres que não podem ser resolvidos por tentativas
const FATAL_RESPONSE_CODES = [
  new RegExp('^22...$'), // Data Exception (exemplo: tipo de dado incorreto)
  new RegExp('^23...$'), // Violação de restrição de integridade (exemplo: UNIQUE, NOT NULL)
  new RegExp('^42501$'), // Privilegios insuficientes
];

// URLs e chaves do Supabase e PowerSync
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
const powersyncUrl = process.env.EXPO_PUBLIC_POWERSYNC_URL as string;

export class SupabaseConnector implements PowerSyncBackendConnector {
  from(DOCTORS_TABLE: string) {
    throw new Error('Method not implemented.');
  }
  updateTable(DOCTORS_TABLE: string) {
    throw new Error('Method not implemented.');
  }
  selectFrom(DOCTORS_TABLE: string) {
    throw new Error('Method not implemented.');
  }
  client: SupabaseClient;

  constructor() {
    // Inicializa o cliente Supabase com o armazenamento de sessão no AsyncStorage
    this.client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
      },
    });
  }

  // Realiza login com email e senha
  async login(email: string, password: string) {
    const { error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }

  // Obtem as credenciais do Supabase para autenticação
  async fetchCredentials() {
    const {
      data: { session },
      error,
    } = await this.client.auth.getSession();

    if (!session || error) {
      throw new Error(`Erro ao obter sessão do Supabase: ${error}`);
    }

    return {
      client: this.client,
      endpoint: powersyncUrl,
      token: session.access_token ?? '',
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000) : undefined,
      userID: session.user.id,
    };
  }

  // Envia dados para o Supabase a partir do banco de dados local gerido pelo PowerSync
  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return; // Sem transações pendentes
    }

    let lastOp: CrudEntry | null = null;
    try {
      for (const op of transaction.crud) {
        lastOp = op;
        const table = this.client.from(op.table);
        let result: any = null;

        switch (op.op) {
          case UpdateType.PUT:
            {
              const record = { ...op.opData, id: op.id };
              result = await table.upsert(record);
            }
            break;
          case UpdateType.PATCH:
            result = await table.update(op.opData).eq('id', op.id);
            break;
          case UpdateType.DELETE:
            result = await table.delete().eq('id', op.id);
            break;
        }

        if (result.error) {
          throw new Error(`Erro ao ${op.op} dados no Supabase: ${JSON.stringify(result)}`);
        }
      }

      // Marca a transação como completa
      await transaction.complete();
    } catch (ex: any) {
      console.error('Erro durante a transação PowerSync:', ex);
      if (
        typeof ex.code === 'string' &&
        FATAL_RESPONSE_CODES.some((regex) => regex.test(ex.code))
      ) {
        // Erro fatal - descarta a operação e completa a transação
        console.error(`Erro fatal ao processar operação: ${lastOp?.op}`, ex);
        await transaction.complete();
      } else {
        throw ex; // Outros erros são propagados
      }
    }
  }

  // Desconecta e limpa as credenciais do usuário
  async logout() {
    await this.client.auth.signOut();
  }
}
