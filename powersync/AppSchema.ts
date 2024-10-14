import { column, Schema, Table } from '@powersync/react-native';

// Tabela de médicos
export const DOCTORS_TABLE = 'doctors';

const doctors = new Table({
  id: column.text,
  created_at: column.text,
  email: column.text,
  name: column.text,
  auth_user_id: column.text,
  terms_accepted: column.integer,
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
  doctor_id: column.text,
});

// Tabela de prontuários
export const ATTENDANCES_TABLE = 'attendances';

const attendances = new Table({
  id: column.text,
  created_at: column.text,
  updated_at: column.text,
  patient_id: column.text,
  primeira_consulta: column.text,
  consulta_retorno: column.text,
  motivo_consulta: column.text,
  doctor_id: column.text,
  hipertensao: column.text, // Campo para hipertensão
  diabetes: column.text, // Campo para diabetes
  doenca_hepatica: column.text, // Campo para doença hepática
  deficiencia_g6pd: column.text, // Campo para deficiência de G6PD
});

// Tabela de sinais vitais
export const ATTENDANCE_VITALS_TABLE = 'attendance_vitals';

const attendance_vitals = new Table({
  id: column.text,
  created_at: column.text,
  updated_at: column.text,
  attendance_id: column.text, // Relaciona com a tabela de atendimentos
  peso_kg: column.text,
  comprimento_cm: column.text,
  perimetro_cefalico_cm: column.text,
  numero_respiracoes_por_minuto: column.text,
  doctor_id: column.text,
  patient_id: column.text,
});

// Tabela de sintomas
export const ATTENDANCE_SYMPTOMS_TABLE = 'attendance_symptoms';

const attendance_symptoms = new Table({
  id: column.text,
  created_at: column.text,
  updated_at: column.text,
  attendance_id: column.text, // Relaciona com a tabela de atendimentos
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
  doctor_id: column.text,
  patient_id: column.text,
});

// Tabela de nutrição e desenvolvimento
export const ATTENDANCE_NUTRITION_DEVELOPMENT_TABLE = 'attendance_nutrition_development';

const attendance_nutrition_development = new Table({
  id: column.text,
  created_at: column.text,
  updated_at: column.text,
  attendance_id: column.text, // Relaciona com a tabela de atendimentos
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
  doctor_id: column.text,
  patient_id: column.text,
});

// Tabela de vacinações
export const VACCINATIONS_TABLE = 'vaccinations';

const vaccinations = new Table({
  id: column.text,
  patient_id: column.text,
  created_at: column.text,
  doctor_id: column.text,
  vaccine_name: column.text,
  dose_number: column.text,
  administered_at: column.text,
});

// Tabela de alergias
export const ALLERGIES_TABLE = 'allergies';

const allergies = new Table({
  id: column.text,
  patient_id: column.text,
  created_at: column.text,
  updated_at: column.text,
  doctor_id: column.text,
  allergy_milk: column.text,
  allergy_eggs: column.text,
  allergy_beef: column.text,
  allergy_fish: column.text,
  allergy_shellfish: column.text,
  allergy_cat: column.text,
  allergy_dog: column.text,
  allergy_bee: column.text,
  allergy_ant: column.text,
  allergy_venomous_animals: column.text,
  allergy_insects: column.text,
  allergy_dipyrone: column.text,
  allergy_aspirin: column.text,
  allergy_diclofenac: column.text,
  allergy_paracetamol: column.text,
  allergy_penicillin: column.text,
  allergy_magnesium_bisulphate: column.text,
  allergy_rivaroxaban: column.text,
  allergy_losartan_potassium: column.text,
  allergy_metformin: column.text,
  allergy_butylscopolamine: column.text,
  allergy_cephalosporin: column.text, // Campo para Cefalexina
  allergy_salbutamol: column.text, // Campo para Salbutamol
  allergy_acido_folico: column.text, // Campo para Ácido Fólico
  allergy_isotretinoina: column.text, // Campo para Isotretinoína
});

// Tabela de medicamentos
export const MEDICATIONS_TABLE = 'medications';

const medications = new Table({
  id: column.text,
  name: column.text,
  patient_id: column.text,
  doctor_id: column.text,
  dosage_info: column.text,
  max_dosage_info: column.text,
  indication: column.text,
  contraindications: column.text,
  instructions: column.text,
  created_at: column.text,
  updated_at: column.text,
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
  allergies,
  medications,
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
export type Allergy = Database['allergies'];
export type Medication = Database['medications'];
