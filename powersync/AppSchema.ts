// powersync/AppSchema.ts

import { column, Schema, TableV2 } from '@powersync/react-native';

// Nome da tabela doctors
export const DOCTORS_TABLE = 'doctors';

// Definindo a tabela de médicos (doctors)
const doctors = new TableV2({
  id: column.text, // ID do médico
  name: column.text, // Nome do médico
  owner_id: column.text, // ID do usuário dono (owner) do médico
  created_at: column.text, // Data de criação armazenada como texto
});

// Nome da tabela patients
export const PATIENTS_TABLE = 'patients';

// Definindo a tabela de pacientes (patients)
const patients = new TableV2({
  id: column.text, // ID do paciente
  nome_patients: column.text, // Nome do paciente
  cpf_patients: column.text, // CPF do paciente
  data_nasc_patients: column.text, // Data de nascimento como string (ISO format)
  sexo_patients: column.text, // Sexo do paciente
  email_patients: column.text, // Email do paciente
  fone_patients: column.text, // Telefone do paciente
  cep_patients: column.text, // CEP do paciente
  uf_patients: column.text, // Estado (UF) do paciente
  cidade_patients: column.text, // Cidade do paciente
  endereco_patients: column.text, // Endereço do paciente
  numero_endereco_patients: column.text, // Número do endereço
  created_by: column.text, // ID do médico que criou o paciente
  doctor_id: column.text, // ID do médico responsável pelo paciente
  created_at: column.text, // Data de criação como texto
});

// Nome da tabela attendances (prontuários)
export const ATTENDANCES_TABLE = 'attendances';

// Definindo a tabela de prontuários (attendances)
const attendances = new TableV2({
  id: column.text, // ID do prontuário
  patient_id: column.text, // ID do paciente relacionado
  doctor_id: column.text, // ID do médico responsável
  doctor_name: column.text, // Nome do médico responsável
  created_by: column.text, // ID do médico que criou o prontuário
  created_at: column.text, // Data de criação do prontuário como texto
  updated_at: column.text, // Data da última atualização como texto
  tax_mae: column.text, // Dados médicos (exemplo: tax_mae)
  peso_mae: column.text, // Peso da mãe
  estatura_mae: column.text, // Estatura da mãe
  pa_mae: column.text, // Pressão arterial da mãe
  tipo_sang_mae: column.text, // Tipo sanguíneo da mãe
  tax: column.text, // Dados médicos do bebê (exemplo: tax)
  apgar_1: column.text, // Apgar 1 minuto
  apgar_5: column.text, // Apgar 5 minutos
  peso: column.text, // Peso do bebê
  comprimento: column.text, // Comprimento do bebê
  pc: column.text, // Perímetro cefálico do bebê
  gesta: column.text, // Número de gestações
  para: column.text, // Número de partos
  cesareas: column.text, // Número de cesáreas
  abortos: column.text, // Número de abortos
  abot_espon: column.text, // Abortos espontâneos
  vacinas_mae: column.text, // Vacinas da mãe
  nasc_vivos: column.text, // Nascidos vivos
  mort_neo: column.text, // Mortalidade neonatal
  filhos: column.text, // Número de filhos
  intern: column.text, // Histórico de internações
  cirg: column.text, // Histórico de cirurgias
  quant_cirg: column.text, // Quantidade de cirurgias
  consul_pre: column.text, // Consultas pré-natais
  quant_consul_pre: column.text, // Quantidade de consultas pré-natais
  trat_mae: column.text, // Tratamentos da mãe
  descr_mae: column.text, // Descrição da mãe
});

// Criando o esquema com as tabelas definidas
export const AppSchema = new Schema({
  doctors,
  patients,
  attendances,
});

// Definindo o tipo Database com base no esquema
export type Database = (typeof AppSchema)['types'];
export type Doctor = Database['doctors']; // Tipagem para a tabela doctors
export type Patient = Database['patients']; // Tipagem para a tabela patients
export type Attendance = Database['attendances']; // Tipagem para a tabela attendances
