// powersync/AppSchema.ts

import { column, Schema, Table } from '@powersync/react-native';

// Nome das tabelas
export const DOCTORS_TABLE = 'doctors';
export const PATIENTS_TABLE = 'patients';
export const ATTENDANCES_TABLE = 'attendances';

// Definir tipos customizados para UUID e Timestamp como textos
const uuid = column.text; // UUID será armazenado como string/texto
const timestamp = column.text; // Timestamps também como string/texto

// Tabela doctors
const doctors = new Table(
  {
    id: uuid, // UUID como string
    created_at: timestamp, // Timestamp como string
    name: column.text, // Nome do médico
    owner_id: uuid, // UUID do proprietário (usuário)
    updated_at: timestamp, // Timestamp como string
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
    id: uuid, // UUID como string
    created_at: timestamp, // Timestamp como string
    nome_patients: column.text, // Nome do paciente
    cpf_patients: column.text, // CPF como string
    data_nasc_patients: column.text, // Data de nascimento como string
    email_patients: column.text, // Email como string
    fone_patients: column.text, // Telefone como string
    cep_patients: column.text, // CEP como string
    uf_patients: column.text, // UF como string
    cidade_patients: column.text, // Cidade como string
    endereco_patients: column.text, // Endereço como string
    created_by: uuid, // UUID do criador como string
    updated_at: timestamp, // Timestamp como string
    doctor_id: uuid, // UUID do médico responsável como string
  },
  {
    indexes: {
      doctor_id_index: ['doctor_id'],
      created_by_index: ['created_by'],
    },
  }
);

// Tabela attendances (prontuários)
const attendances = new Table(
  {
    id: uuid, // UUID como string
    created_at: timestamp, // Timestamp como string
    updated_at: timestamp, // Timestamp como string
    created_by: uuid, // UUID do criador como string
    doctor_id: uuid, // UUID do médico responsável como string
    patient_id: uuid, // UUID do paciente como string
    consultation_id: column.text, // Consulta como string
    tipo: column.text, // Tipo da consulta como string
    tax_mae: column.text, // Taxas da mãe como string
    peso_mae: column.text, // Peso da mãe como string
    estatura_mae: column.text, // Estatura da mãe como string
    pa_mae: column.text, // Pressão arterial como string
    tipo_sang_mae: column.text, // Tipo sanguíneo da mãe como string
    tax: column.text, // Taxa como string
    apgar_1: column.text, // Apgar 1 como string
    apgar_5: column.text, // Apgar 5 como string
    peso: column.text, // Peso do bebê como string
    comprimento: column.text, // Comprimento do bebê como string
    pc: column.text, // PC como string
    gesta: column.text, // Gestações como string
    para: column.text, // Partos como string
    cesareas: column.text, // Cesáreas como string
    abortos: column.text, // Abortos como string
    abot_espon: column.text, // Abortos espontâneos como string
    vacinas_mae: column.text, // Vacinas da mãe como string
    nasc_vivos: column.text, // Nascidos vivos como string
    mort_neo: column.text, // Mortes neonatais como string
    filhos: column.text, // Filhos como string
    intern: column.text, // Internações como string
    cirg: column.text, // Cirurgias como string
    quant_cirg: column.text, // Quantidade de cirurgias como string
    consul_pre: column.text, // Consultas prévias como string
    quant_consul_pre: column.text, // Quantidade de consultas prévias como string
    trat_mae: column.text, // Tratamentos da mãe como string
    descr_mae: column.text, // Descrição da mãe como string
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
