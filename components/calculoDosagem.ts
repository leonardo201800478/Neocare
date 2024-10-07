// Importações necessárias
import * as SQLite from 'expo-sqlite';
import { Kysely, SqliteDialect } from '@kysely/expo';
import { column, Schema, Table } from '@powersync/react-native';

// Configurando a conexão com SQLite usando Kysely e Powersync
const db = SQLite.openDatabase('patients.db');
export const kyselyDb = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({ database: db }),
});

// Definindo o esquema do banco de dados
interface DatabaseSchema {
  patients: {
    id: string;
    name: string;
    weight: number; // Peso em kg
    age: number; // Idade em anos
    gender: string; // 'Masculino' ou 'Feminino'
    height: number; // Altura em cm
    allergies: string; // Lista de alergias separadas por vírgula
    conditions: string; // Lista de condições separadas por vírgula
    pressaoArterial: string; // 'alta', 'normal', 'baixa'
    temDiabetes: boolean;
    temDoencaHepatica: boolean;
    temInsuficienciaRenal: boolean;
  };
}

const patients = new Table({
  id: column.text,
  name: column.text,
  weight: column.float,
  age: column.integer,
  gender: column.text,
  height: column.float,
  allergies: column.text,
  conditions: column.text,
  pressaoArterial: column.text,
  temDiabetes: column.boolean,
  temDoencaHepatica: column.boolean,
  temInsuficienciaRenal: column.boolean,
});

export const AppSchema = new Schema({
  patients,
});

export type Database = (typeof AppSchema)['types'];
export type Patient = Database['patients'];

// Estrutura de dados para armazenar informações sobre medicamentos
const medicamentos = {
  "solução de reidratação oral (sro)": {
    dosagem: (patient: PatientData) => `50-100 ml/kg para reposição de líquidos, dependendo da desidratação.`,
    contraindications: []
  },
  "sulfato ferroso": {
    dosagem: (patient: PatientData) => patient.age < 12
      ? `3-6 mg/kg/dia de ferro elementar, dividido em 2-3 doses diárias.`
      : `60-120 mg/dia de ferro elementar, dividido em 1-2 doses.`,
    contraindications: ["hemocromatose"]
  },
  "amoxicilina": {
    dosagem: (patient: PatientData) => `${patient.weight * 20} - ${patient.weight * 40} mg por dia, dividido em 2-3 doses.`,
    contraindications: ["penicilina"]
  },
  "cotrimoxazol": {
    dosagem: (patient: PatientData) => patient.age < 12
      ? `8 mg/kg/dia de trimetoprima, dividido em 2 doses.`
      : `160-800 mg (2 vezes ao dia) para adultos.`,
    contraindications: ["sulfa", "diabetes"]
  },
  "eritromicina": {
    dosagem: (patient: PatientData) => `${patient.weight * 30} - ${patient.weight * 50} mg por dia, dividido em 4 doses.`,
    contraindications: []
  },
  "zinco (suplemento)": {
    dosagem: (patient: PatientData) => patient.age < 5
      ? `10-20 mg uma vez ao dia por 10-14 dias.`
      : `20 mg uma vez ao dia.`,
    contraindications: []
  },
  "paracetamol": {
    dosagem: (patient: PatientData) => `${patient.weight * 10} mg por dose, até 4 vezes ao dia (máximo: 40 mg/kg/dia).`,
    contraindications: ["doenca_hepatica"]
  },
  "ibuprofeno": {
    dosagem: (patient: PatientData) => `${patient.weight * 5} - ${patient.weight * 10} mg por dose, a cada 6-8 horas (máximo: 40 mg/kg/dia).`,
    contraindications: ["aine", "hipertensao"]
  },
  "vitamina a": {
    dosagem: (patient: PatientData) => patient.age < 1
      ? `100.000 UI, dose única.`
      : `200.000 UI, dose única a cada 4-6 meses.`,
    contraindications: []
  },
  "albendazol": {
    dosagem: (patient: PatientData) => patient.age >= 2
      ? `400 mg, dose única.`
      : `200 mg, dose única.`,
    contraindications: []
  },
  "mebendazol": {
    dosagem: (patient: PatientData) => patient.age >= 2
      ? `100 mg, duas vezes ao dia por 3 dias.`
      : `Não recomendado para menores de 2 anos.`,
    contraindications: []
  },
  "ácido fólico": {
    dosagem: () => `0,1 a 0,4 mg uma vez ao dia.`,
    contraindications: []
  },
  "metronidazol (oral)": {
    dosagem: (patient: PatientData) => `${patient.weight * 7.5} mg/kg por dose, a cada 8 horas.`,
    contraindications: ["metronidazol"]
  },
  "cloroquina/primaquina": {
    dosagem: () => `Dose depende da condição clínica e supervisão médica rigorosa.`,
    contraindications: ["g6pd"]
  },
  "salbutamol (xarope ou inalatório)": {
    dosagem: (patient: PatientData) => `0,1-0,2 mg/kg por dose, até 3-4 vezes ao dia.`,
    contraindications: ["salbutamol"]
  },
  "nistatina (oral)": {
    dosagem: () => `100.000 UI, 4 vezes ao dia para tratamento de candidíase oral.`,
    contraindications: []
  },
  "permetrina/benzoato de benzila": {
    dosagem: () => `Aplicar topicamente conforme necessário para tratamento de escabiose/pediculose.`,
    contraindications: []
  },
  "cefalexina": {
    dosagem: (patient: PatientData) => `${patient.weight * 25} - ${patient.weight * 50} mg por dia, dividido em 4 doses.`,
    contraindications: ["cefalosporinas"]
  },
  "claritromicina": {
    dosagem: (patient: PatientData) => `7,5 mg/kg a cada 12 horas (máximo: 500 mg por dose).`,
    contraindications: []
  },
  "gentamicina colírio": {
    dosagem: () => `1-2 gotas em cada olho, a cada 4-6 horas.`,
    contraindications: ["gentamicina"]
  },
  "hidroxizina": {
    dosagem: (patient: PatientData) => `0,5 mg/kg por dose, a cada 6-8 horas.`,
    contraindications: []
  },
  "bromoprida": {
    dosagem: (patient: PatientData) => `0,5-1 mg/kg por dia, dividido em 3 doses.`,
    contraindications: []
  },
  "aciclovir (oral)": {
    dosagem: (patient: PatientData) => `20 mg/kg por dose, 4 vezes ao dia, por 5 dias.`,
    contraindications: []
  },
  "clorexidina tópica": {
    dosagem: () => `Aplicar conforme necessário para limpeza/desinfecção.`,
    contraindications: []
  },
  "tetraciclina (pomada oftálmica)": {
    dosagem: () => `Aplicar 2-4 vezes ao dia na área afetada.`,
    contraindications: ["tetraciclina"]
  },
  "povidona iodada": {
    dosagem: () => `Aplicar conforme necessário para limpeza de feridas.`,
    contraindications: []
  },
  "metoclopramida": {
    dosagem: (patient: PatientData) => `0,1-0,2 mg/kg por dose, até 3 vezes ao dia.`,
    contraindications: []
  },
  "dexametasona (gota oftálmica)": {
    dosagem: () => `1-2 gotas, 4-6 vezes ao dia.`,
    contraindications: []
  },
  "miconazol (creme ou pomada)": {
    dosagem: () => `Aplicar 2 vezes ao dia, conforme indicado.`,
    contraindications: []
  },
  "salicilato de metila": {
    dosagem: () => `Aplicar topicamente conforme necessário para alívio da dor.`,
    contraindications: []
  },
  "corticosteroides tópicos": {
    dosagem: () => `Aplicar 1-2 vezes ao dia conforme necessário.`,
    contraindications: []
  },
  "lidocaína gel": {
    dosagem: () => `Aplicar uma pequena quantidade na área afetada, conforme necessário.`,
    contraindications: []
  },
  "sulfacetamida (colírio)": {
    dosagem: () => `1-2 gotas em cada olho, a cada 3-4 horas.`,
    contraindications: []
  },
  "permetrina 1% (xampu ou loção)": {
    dosagem: () => `Aplicar conforme necessário para tratamento de piolhos.`,
    contraindications: []
  },
  "prednisolona (oral)": {
    dosagem: (patient: PatientData) => `1-2 mg/kg por dia, dividido em 1-2 doses.`,
    contraindications: ["hipertensao", "diabetes"]
  },
  "isotretinoína tópica": {
    dosagem: () => `Aplicar uma vez ao dia, sob supervisão médica.`,
    contraindications: []
  },
  "vitamina d": {
    dosagem: () => `400-1000 UI uma vez ao dia, dependendo da idade e condição clínica.`,
    contraindications: []
  },
};

// Função para verificar contraindicações
const verificarContraindicacoes = (medicamento: string, patient: PatientData): string | null => {
  const contraindications = medicamentos[medicamento].contraindications;

  if (contraindications.includes('penicilina') && patient.allergies.includes('Penicilina')) {
    return 'Amoxicilina: Contraindicado devido a alergia à penicilina.';
  }
  if (contraindications.includes('aine') && patient.allergies.includes('AINEs')) {
    return `${medicamento}: Contraindicado devido a alergia a anti-inflamatórios não esteroides (AINEs).`;
  }
  if (contraindications.includes('hipertensao') && patient.pressaoArterial === 'alta') {
    return `${medicamento}: Contraindicado para pacientes com hipertensão.`;
  }
  if (contraindications.includes('diabetes') && patient.temDiabetes) {
    return `${medicamento}: Usar com cautela em pacientes diabéticos.`;
  }
  if (contraindications.includes('doenca_hepatica') && patient.temDoencaHepatica) {
    return `${medicamento}: Deve ser usado com cautela em pacientes com doença hepática.`;
  }
  if (contraindications.includes('g6pd') && patient.conditions.includes('Deficiência de G6PD')) {
    return `${medicamento}: Contraindicado para pacientes com deficiência de G6PD.`;
  }
  return null;
};

// Função principal para calcular a dosagem
export const calcularDosagem = (patient: PatientData, medicamento: string): string => {
  const medicamentoKey = medicamento.toLowerCase();

  if (!medicamentos[medicamentoKey]) {
    return 'Medicamento não encontrado ou não disponível para administração em casa.';
  }

  const contraindicado = verificarContraindicacoes(medicamentoKey, patient);
  if (contraindicado) {
    return contraindicado;
  }

  return medicamentos[medicamentoKey].dosagem(patient);
};

// Função para salvar um paciente no banco de dados
export const salvarPaciente = async (patient: PatientData) => {
  await kyselyDb.insertInto('patients').values({
    name: patient.name,
    weight: patient.weight,
    age: patient.age,
    gender: patient.gender,
    height: patient.height,
    allergies: patient.allergies.join(', '), // Salvando alergias como string separada por vírgula
    conditions: patient.conditions.join(', '), // Salvando condições como string separada por vírgula
    pressaoArterial: patient.pressaoArterial,
    temDiabetes: patient.temDiabetes,
    temDoencaHepatica: patient.temDoencaHepatica,
    temInsuficienciaRenal: patient.temInsuficienciaRenal,
  }).execute();
};

// Função para buscar um paciente pelo ID no banco de dados
export const buscarPaciente = async (id: string): Promise<PatientData | null> => {
  const patientData = await kyselyDb.selectFrom('patients')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  if (!patientData) {
    return null;
  }

  return {
    ...patientData,
    allergies: patientData.allergies.split(', '), // Convertendo para array
    conditions: patientData.conditions.split(', '), // Convertendo para array
    temDiabetes: Boolean(patientData.temDiabetes),
    temDoencaHepatica: Boolean(patientData.temDoencaHepatica),
    temInsuficienciaRenal: Boolean(patientData.temInsuficienciaRenal),
  };
};
