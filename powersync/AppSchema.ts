import { column, Schema, Table } from '@powersync/react-native';

// Tabela de médicos
export const DOCTORS_TABLE = 'doctors';

const doctors = new Table({
  id: column.text,
  created_at: column.text,
  email: column.text,
  name: column.text,
  auth_user_id: column.text, // Mantendo a relação com o auth.users
  terms_accepted: column.integer, // Definindo como boolean para aceitar true/false
});

// Tabela de pacientes
export const PATIENTS_TABLE = 'patients';

const patients = new Table({
  id: column.text,
  created_at: column.text,
  updated_at: column.text,
  name: column.text,
  cpf: column.text,
  birth_date: column.text,
  gender: column.text,
  phone_number: column.text,
  address: column.text,
  city: column.text,
  uf: column.text,
  zip_code: column.text,
  created_by: column.text, // Relacionado ao ID do usuário (auth.users)
  doctor_id: column.text, // Associado ao ID do médico (doctors)
});

// Tabela de prontuários
export const ATTENDANCES_TABLE = 'attendances';

const attendances = new Table({
  id: column.text,
  created_at: column.text,
  updated_at: column.text,
  patient_id: column.text,
  created_by: column.text, // Criado pelo ID do usuário (auth.users)
  primeira_consulta: column.text,
  consulta_retorno: column.text,
  motivo_consulta: column.text,
  doctor_id: column.text, // Associado ao ID do médico (doctors)
});

// Tabela de sinais vitais
export const ATTENDANCE_VITALS_TABLE = 'attendance_vitals';

const attendance_vitals = new Table({
  id: column.text,
  attendance_id: column.text,
  peso_kg: column.text,
  comprimento_cm: column.text,
  perimetro_cefalico_cm: column.text,
  numero_respiracoes_por_minuto: column.text,
});

// Tabela de sintomas
export const ATTENDANCE_SYMPTOMS_TABLE = 'attendance_symptoms';

const attendance_symptoms = new Table({
  id: column.text,
  attendance_id: column.text,
  nao_bebe_ou_mama: column.text,
  vomita_tudo: column.text,
  convulsoes: column.text,
  letargica: column.text,
  enchimento_capilar: column.text,
  batimento_asa: column.text,
  tem_tosse: column.text,
  sibilancia: column.text,
  tem_diarreia: column.text,
  tem_febre: column.text,
  rigidez_nuca: column.text,
  problema_ouvido: column.text,
  dor_garganta: column.text,
  gemido: column.text,
  cianose_periferica: column.text,
  ictericia: column.text,
  distensao_abdominal: column.text,
  emagrecimento: column.text,
  edema: column.text,
});

// Tabela de nutrição e desenvolvimento
export const ATTENDANCE_NUTRITION_DEVELOPMENT_TABLE = 'attendance_nutrition_development';

const attendance_nutrition_development = new Table({
  id: column.text,
  attendance_id: column.text,
  amamentando: column.text,
  quantas_vezes_amamenta: column.text,
  amamenta_noite: column.text,
  alimentos_liquidos: column.text,
  quantidade_refeicoes: column.text,
  tipo_alimentacao: column.text,
  mudou_alimentacao: column.text,
  como_mudou_alimentacao: column.text,
  perda_peso_primeira_semana: column.text,
  tendencia_crescimento: column.text,
  habilidades_desenvolvimento: column.text,
  atividade_fisica_vezes_semana: column.text,
  tempo_atividade_fisica: column.text,
  tempo_sedentario: column.text,
  avaliacao_violencia: column.text,
  outros_problemas: column.text,
});

// Tabela de vacinações
export const VACCINATIONS_TABLE = 'vaccinations';

const vaccinations = new Table({
  id: column.text,
  patient_id: column.text,
  doctor_id: column.text,
  vaccine_name: column.text,
  dose_number: column.text,
  administered_at: column.text,
});

// Criando o esquema
export const AppSchema = new Schema({
  doctors,
  patients,
  attendances,
  attendance_vitals,
  attendance_symptoms,
  attendance_nutrition_development,
  vaccinations,
});

// Definindo o tipo Database
export type Database = (typeof AppSchema)['types'];
export type Doctor = Database['doctors'];
export type Patient = Database['patients'];
export type Attendance = Database['attendances'];
export type AttendanceVital = Database['attendance_vitals'];
export type AttendanceSymptom = Database['attendance_symptoms'];
export type AttendanceNutritionDevelopment = Database['attendance_nutrition_development'];
export type Vaccination = Database['vaccinations'];
