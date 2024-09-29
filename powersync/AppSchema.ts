//powersync/AppSchema.ts

import { column, Schema, Table } from '@powersync/react-native';

// Nome da tabela doctors (médicos)
export const DOCTORS_TABLE = 'doctors';

// Definindo a tabela de médicos (doctors)
const doctors = new Table(
  {
    id: column.text, // ID do médico (UUID)
    created_at: column.text, // Data de criação como texto
    email: column.text, // Email do médico
    name: column.text, // Nome do médico
    user_id: column.text, // ID do usuário relacionado (chave estrangeira)
  },
  {
    indexes: {
      userIdIndex: ['user_id'], // Índice para acelerar buscas por ID de usuário
    },
  }
);

// Nome da tabela patients (pacientes)
export const PATIENTS_TABLE = 'patients';

// Definindo a tabela de pacientes (patients)
const patients = new Table(
  {
    id: column.text, // ID do paciente
    created_at: column.text, // Data de criação como texto
    updated_at: column.text, // Data de atualização como texto
    name: column.text, // Nome do paciente
    cpf: column.text, // CPF do paciente, único
    birth_date: column.text, // Data de nascimento como string (ISO format)
    gender: column.text, // Sexo do paciente
    phone_number: column.text, // Telefone do paciente
    address: column.text, // Endereço do paciente
    city: column.text, // Cidade do paciente
    uf: column.text, // Estado (UF) do paciente
    zip_code: column.text, // CEP do paciente
    created_by: column.text, // ID do médico (chave estrangeira) que criou o paciente
  },
  {
    indexes: {
      cpfIndex: ['cpf'], // Índice para acelerar buscas por CPF
      nameIndex: ['name'], // Índice para acelerar buscas por nome
      createdByIndex: ['created_by'], // Índice para acelerar buscas por quem criou
    },
  }
);

// Nome da tabela attendances (prontuários)
export const ATTENDANCES_TABLE = 'attendances';

// Definindo a tabela de prontuários (attendances)
const attendances = new Table(
  {
    id: column.text, // ID do prontuário
    created_at: column.text, // Data de criação do prontuário como texto
    updated_at: column.text, // Data da última atualização como texto
    patient_id: column.text, // ID do paciente relacionado
    doctor_id: column.text, // ID do médico responsável (usuário)
    doctor_name: column.text, // Nome do médico responsável
    appointment_date: column.text, // Data e hora da consulta como texto (ISO format)
    weight: column.text, // Peso do paciente
    height: column.text, // Altura do paciente
    blood_pressure: column.text, // Pressão arterial do paciente
    apgar_score_at_one_minute: column.text, // Pontuação Apgar após 1 minuto
    apgar_score_at_five_minutes: column.text, // Pontuação Apgar após 5 minutos
    maternal_tax: column.text, // Dados médicos relacionados à mãe
    maternal_weight: column.text, // Peso da mãe
    maternal_height: column.text, // Altura da mãe
    maternal_blood_pressure: column.text, // Pressão arterial da mãe
    maternal_blood_type: column.text, // Tipo sanguíneo da mãe
    number_of_previous_pregnancies: column.text, // Número de gestações anteriores da mãe
    number_of_previous_births: column.text, // Número de partos anteriores
    number_of_cesarean_sections: column.text, // Número de cesarianas
    number_of_abortions: column.text, // Número de abortos
    spontaneous_abortions: column.text, // Abortos espontâneos
    maternal_vaccines: column.text, // Vacinas tomadas pela mãe
    number_of_living_children: column.text, // Número de filhos vivos
    number_of_neonatal_deaths: column.text, // Número de mortes neonatais
    number_of_children: column.text, // Número total de filhos
    maternal_hospitalizations: column.text, // Histórico de hospitalizações da mãe
    maternal_surgeries: column.text, // Histórico de cirurgias da mãe
    number_of_surgeries: column.text, // Quantidade de cirurgias realizadas
    prenatal_consultations: column.text, // Informações sobre consultas pré-natais
    number_of_prenatal_consultations: column.text, // Número de consultas pré-natais
    maternal_treatments: column.text, // Tratamentos realizados pela mãe
    maternal_description: column.text, // Descrição adicional sobre a saúde materna
  },
  {
    indexes: {
      patientIdIndex: ['patient_id'], // Índice para acelerar buscas por paciente
      doctorIdIndex: ['doctor_id'], // Índice para acelerar buscas por médico
    },
  }
);

// Nome da tabela vaccinations (vacinações)
export const VACCINATIONS_TABLE = 'vaccinations';

// Definindo a tabela de vacinações (vaccinations)
const vaccinations = new Table(
  {
    id: column.text, // ID da vacinação (UUID)
    patient_id: column.text, // ID do paciente (chave estrangeira)
    vaccine_name: column.text, // Nome da vacina
    dose_number: column.text, // Número da dose
    administered_at: column.text, // Data e hora da vacinação
    created_at: column.text, // Data de criação da vacinação
    doctor_id: column.text, // ID do médico que administrou a vacina (chave estrangeira)
  },
  {
    indexes: {
      patientIdVaccineIndex: ['patient_id', 'vaccine_name', 'dose_number'], // Índice para garantir unicidade por paciente, vacina e dose
    },
  }
);

// Criando o esquema com as tabelas definidas
export const AppSchema = new Schema({
  doctors,
  patients,
  attendances,
  vaccinations, // Adicionando a tabela de vacinações ao esquema
});

// Definindo o tipo Database com base no esquema
export type Database = (typeof AppSchema)['types'];
export type Doctor = Database['doctors']; // Tipagem para a tabela doctors
export type Patient = Database['patients']; // Tipagem para a tabela patients
export type Attendance = Database['attendances']; // Tipagem para a tabela attendances
export type Vaccination = Database['vaccinations']; // Tipagem para a tabela vaccinations
