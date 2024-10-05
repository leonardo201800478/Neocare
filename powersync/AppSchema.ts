// powersync/AppSchema.ts

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
    registered_by: column.text, // ID do profissional que fez o atendimento
    data_atendimento: column.text, // Data do atendimento
    primeira_consulta: column.text, // Primeira consulta (Sim/Não)
    consulta_retorno: column.text, // Consulta de retorno (Sim/Não)
    motivo_consulta: column.text, // Motivo da consulta
    peso_kg: column.text, // Peso do paciente (kg)
    comprimento_cm: column.text, // Comprimento do paciente (cm)
    perimetro_cefalico_cm: column.text, // Perímetro cefálico (cm)
    problemas_da_crianca: column.text, // Quais os problemas da criança

    // Avaliar sinais gerais de perigo
    nao_bebe_ou_mama: column.text, // Sim/Não
    vomita_tudo: column.text, // Sim/Não
    convulsoes: column.text, // Sim/Não
    letargica: column.text, // Sim/Não
    enchimento_capilar: column.text, // Sim/Não
    batimento_asa: column.text, // Sim/Não

    // Tosse ou dificuldade para respirar
    tem_tosse: column.text, // Sim/Não
    tosse_ha_quanto_tempo: column.text, // Há quanto tempo tem tosse (dias)
    numero_respiracoes_por_minuto: column.text, // Número de respirações por minuto
    respiracao_rapida: column.text, // Respiração rápida? (Sim/Não)
    tiragem_subcostal: column.text, // Sim/Não
    estridor: column.text, // Sim/Não
    sibilancia: column.text, // Sim/Não
    sibilancia_ha_quanto_tempo: column.text, // Sibilância há quanto tempo (dias)
    primeira_crise: column.text, // Primeira crise? (Sim/Não)
    broncodilatador: column.text, // Uso de broncodilatador nas últimas 24h (Sim/Não)

    // Diarreia
    tem_diarreia: column.text, // Criança tem diarreia? (Sim/Não)
    diarreia_ha_quanto_tempo: column.text, // Diarreia há quanto tempo (dias)
    sangue_nas_fezes: column.text, // Sangue nas fezes? (Sim/Não)

    // Febre
    tem_febre: column.text, // Criança está com febre? (Sim/Não)
    area_risco_malaria: column.text, // Área com risco de malária ('sem risco', 'alto risco', 'baixo risco')
    febre_ha_quanto_tempo: column.text, // Febre há quanto tempo (dias)
    febre_todos_os_dias: column.text, // Febre todos os dias? (Sim/Não)
    rigidez_nuca: column.text, // Rigidez de nuca? (Sim/Não)
    petequias: column.text, // Presença de petéquias (Sim/Não)
    abaulamento_fontanela: column.text, // Abaulamento da fontanela (Sim/Não)

    // Problemas de ouvido
    problema_ouvido: column.text, // Criança tem problema de ouvido? (Sim/Não)
    dor_no_ouvido: column.text, // Dor no ouvido? (Sim/Não)
    secrecao_ouvido: column.text, // Secreção no ouvido? (Sim/Não)
    secrecao_ha_quanto_tempo: column.text, // Secreção há quanto tempo (dias)

    // Dor de garganta
    dor_garganta: column.text, // Criança está com dor de garganta? (Sim/Não)
    ganglios_cervicais: column.text, // Gânglios cervicais aumentados/dolorosos (Sim/Não)
    abaulamento_palato: column.text, // Abaulamento de palato (Sim/Não)
    amigdalas_membrana: column.text, // Amígdalas com membrana branco-acinzentada (Sim/Não)
    amigdalas_pontos_purulentos: column.text, // Pontos purulentos nas amígdalas (Sim/Não)
    vesiculas_hiperemia: column.text, // Presença de vesículas e/ou hiperemia (Sim/Não)

    // Doença grave ou infecção local (para recém-nascidos)
    gemido: column.text, // Gemido, estridor ou sibilância (Sim/Não)
    cianose_periferica: column.text, // Cianose periférica (Sim/Não)
    ictericia: column.text, // Icterícia (Sim/Não)
    secrecao_umbilical: column.text, // Secreção purulenta no umbigo (Sim/Não)
    distensao_abdominal: column.text, // Distensão abdominal (Sim/Não)
    anomalias_congenitas: column.text, // Anomalias congênitas (Sim/Não)

    // Desnutrição ou anemia
    emagrecimento: column.text, // Emagrecimento acentuado? (Sim/Não)
    edema: column.text, // Edema (Sim/Não)
    palidez_palmar: column.text, // Palidez palmar ('leve' ou 'grave')
    peso_para_idade: column.text, // Peso para idade ('muito baixo', 'baixo', 'adequado', 'elevado')
    ganho_insuficiente_peso: column.text, // Ganho insuficiente de peso (Sim/Não)

    // Alimentação da criança
    amamentando: column.text, // Está amamentando? (Sim/Não)
    quantas_vezes_amamenta: column.text, // Quantas vezes amamenta por dia
    amamenta_noite: column.text, // Amamenta à noite? (Sim/Não)
    alimentos_liquidos: column.text, // Recebe outros líquidos/alimentos?
    quantidade_refeicoes: column.text, // Quantas refeições por dia
    recebe_proporcao: column.text, // Recebe proporção adequada? (Sim/Não)
    tipo_alimentacao: column.text, // Tipo de alimentação (mamadeira/copo/colher)
    mudou_alimentacao: column.text, // Mudou a alimentação recentemente? (Sim/Não)
    como_mudou_alimentacao: column.text, // Como mudou a alimentação?

    // Avaliar desenvolvimento
    perda_peso_primeira_semana: column.text, // Perda de peso maior que 10% na primeira semana? (Sim/Não)
    tendencia_crescimento: column.text, // Tendência de crescimento
    habilidades_desenvolvimento: column.text, // Habilidades de desenvolvimento alcançadas

    // Prática de atividade física
    atividade_fisica_vezes_semana: column.text, // Quantas vezes por semana pratica atividade física?
    tempo_atividade_fisica: column.text, // Por quanto tempo?
    tempo_sedentario: column.text, // Tempo sedentário (TV/computador/celular)

    // Possibilidade de violência e outros problemas
    avaliacao_violencia: column.text, // Possibilidade de violência
    outros_problemas: column.text, // Outros problemas
  },
  {
    indexes: {
      patientIdIndex: ['patient_id'], // Índice para acelerar buscas por paciente
      registeredByIdIndex: ['registered_by'], // Índice para acelerar buscas por profissional
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
