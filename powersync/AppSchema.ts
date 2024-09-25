// powersync/AppSchema.ts

import { column, Schema, Table } from '@powersync/react-native';

// Nome das tabelas
export const DOCTORS_TABLE = 'doctors';
export const PATIENTS_TABLE = 'patients';
export const ATTENDANCES_TABLE = 'attendances';

// Tabela doctors
const doctors = new Table(
  {
    id: column.text,
    created_at: column.text,
    name_user: column.text,
    owner_id: column.text, // Dono do registro (usuário)
    inserted_at: column.text,
    updated_at: column.text,
  },
  {
    indexes: {
      owner_id_index: ['owner_id'],
    },
  }
);

// Tabela patients
const patients = new Table(
  {
    id: column.text,
    created_at: column.text,
    nome_patients: column.text,
    cpf_patients: column.text, // CPF como inteiro
    data_nasc_patients: column.text,
    email_patients: column.text,
    fone_patients: column.text, // Telefone como inteiro
    cep_patients: column.text, // CEP como inteiro
    uf_patients: column.text,
    cidade_patients: column.text,
    endereco_patients: column.text,
    inserted_at: column.text,
    updated_at: column.text,
    doctor_id: column.text, // Médico responsável pelo paciente
    modified_by: column.text, // Último médico que modificou o registro
  },
  {
    indexes: {
      doctor_id_index: ['doctor_id'],
      modified_by_index: ['modified_by'], // Índice para rastrear quem modificou
    },
  }
);

// Tabela attendances (prontuários)
const attendances = new Table(
  {
    id: column.text,
    created_at: column.text,
    created_by: column.text, // Médico que criou o prontuário
    doctor_id: column.text, // Médico responsável pelo paciente
    patient_id: column.text, // Paciente relacionado ao prontuário
    consultation_id: column.text,
    tipo: column.text,
    tax_mae: column.text,
    peso_mae: column.text,
    estatura_mae: column.text,
    pa_mae: column.text,
    tipo_sang_mae: column.text,
    tax: column.text,
    apgar_1: column.text,
    apgar_5: column.text,
    peso: column.text,
    comprimento: column.text,
    pc: column.text,
    gesta: column.text,
    para: column.text,
    cesareas: column.text,
    abortos: column.text,
    abot_espon: column.text,
    vacinas_mae: column.text,
    nasc_vivos: column.text,
    mort_neo: column.text,
    filhos: column.text,
    intern: column.text,
    cirg: column.text,
    quant_cirg: column.text,
    consul_pre: column.text,
    quant_consul_pre: column.text,
    trat_mae: column.text,
    descr_mae: column.text,
    inserted_at: column.text,
    updated_at: column.text,
  },
  {
    indexes: {
      doctor_patient_index: ['doctor_id', 'patient_id'], // Índice para interligar médico e paciente
    },
  }
);

// Definindo o schema para o App
export const AppSchema = new Schema({
  doctors,
  patients,
  attendances,
});

// Definição de tipos para as tabelas
export type Database = (typeof AppSchema)['types'];
