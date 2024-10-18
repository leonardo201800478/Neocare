// Funções de cálculo para cada medicamento

export const calculateSRODosage = (peso: number): string => {
  const dosage = `${50 * peso} - ${100 * peso} ml, dependendo do nível de desidratação`;
  return dosage;
};

export const calculateSulfatoFerrosoDosage = (peso: number, idade: number): string => {
  const dosage =
    idade < 18
      ? `${(3 * peso).toFixed(2)} - ${(6 * peso).toFixed(2)} mg/dia de ferro elementar para crianças`
      : `60 - 120 mg/dia para adultos`;
  return dosage;
};

export const calculateAmoxicilinaDosage = (peso: number): string => {
  const dosage = `${(20 * peso).toFixed(2)} - ${(40 * peso).toFixed(2)} mg/kg/dia, dividido em 2-3 doses`;
  return dosage;
};

export const calculateCotrimoxazolDosage = (peso: number, idade: number): string => {
  const dosage =
    idade < 18
      ? `${(8 * peso).toFixed(2)} mg/kg/dia de trimetoprima para crianças`
      : `160-800 mg duas vezes ao dia para adultos`;
  return dosage;
};

export const calculateEritromicinaDosage = (peso: number): string => {
  const dosage = `${(30 * peso).toFixed(2)} - ${(50 * peso).toFixed(2)} mg/kg/dia, dividido em 4 doses`;
  return dosage;
};

export const calculateZincoDosage = (idade: number): string => {
  const dosage =
    idade < 18 ? `10-20 mg uma vez ao dia por 10-14 dias para crianças` : `20 mg para adultos`;
  return dosage;
};

export const calculateParacetamolDosage = (peso: number): string => {
  const dosage = `10 mg/kg por dose, até 4 vezes ao dia (máximo: 40 mg/kg/dia)`;
  return dosage;
};

export const calculateIbuprofenoDosage = (peso: number): string => {
  const dosage = `5-10 mg/kg por dose, a cada 6-8 horas (máximo: 40 mg/kg/dia)`;
  return dosage;
};

export const calculateVitaminaADosage = (idade: number): string => {
  const dosage =
    idade < 1
      ? `100.000 UI dose única a cada 4-6 meses para menores de 1 ano`
      : `200.000 UI dose única a cada 4-6 meses para maiores de 1 ano`;
  return dosage;
};

export const calculateAlbendazolDosage = (idade: number): string => {
  const dosage = idade > 2 ? `400 mg dose única` : `200 mg dose única para menores de 2 anos`;
  return dosage;
};

export const calculateMebendazolDosage = (): string => {
  const dosage = `100 mg, duas vezes ao dia por 3 dias`;
  return dosage;
};

export const calculateAcidoFolicoDosage = (): string => {
  const dosage = `0,1-0,4 mg uma vez ao dia`;
  return dosage;
};

export const calculateMetronidazolDosage = (peso: number): string => {
  const dosage = `${(7.5 * peso).toFixed(2)} mg/kg por dose, a cada 8 horas`;
  return dosage;
};

export const calculateCloroquinaPrimaquinaDosage = (): string => {
  const dosage = `Sob supervisão médica, dependendo da condição clínica`;
  return dosage;
};

export const calculateSalbutamolDosage = (peso: number): string => {
  const dosage = `${(0.1 * peso).toFixed(2)} - ${(0.2 * peso).toFixed(2)} mg/kg por dose, até 3-4 vezes ao dia`;
  return dosage;
};

export const calculateNistatinaDosage = (): string => {
  const dosage = `100.000 UI, 4 vezes ao dia`;
  return dosage;
};

export const calculatePermetrinaBenzoatoDosage = (): string => {
  const dosage = `Aplicar topicamente conforme necessário`;
  return dosage;
};

export const calculateCefalexinaDosage = (peso: number): string => {
  const dosage = `${(25 * peso).toFixed(2)} - ${(50 * peso).toFixed(2)} mg/kg por dia, dividido em 4 doses`;
  return dosage;
};

export const calculateClaritromicinaDosage = (peso: number): string => {
  const dosage = `${(7.5 * peso).toFixed(2)} mg/kg a cada 12 horas`;
  return dosage;
};

export const calculateGentamicinaColirioDosage = (): string => {
  const dosage = `1-2 gotas em cada olho, a cada 4-6 horas`;
  return dosage;
};

export const calculatePrednisolonaDosage = (peso: number): string => {
  const dosage = `1-2 mg/kg por dia, dividido em 1-2 doses`;
  return dosage || '1-2 mg/kg por dia';
};

export const calculateAciclovirDosage = (peso: number): string => {
  const dosage = `${(20 * peso).toFixed(2)} mg/kg por dose, 4 vezes ao dia, por 5 dias`;
  return dosage || '20 mg/kg por dose';
};

export const calculateHidroxizinaDosage = (peso: number): string => {
  const dosage = `0,5 mg/kg por dose, a cada 6-8 horas`;
  return dosage || '0,5 mg/kg por dose';
};

export const calculateBromopridaDosage = (peso: number): string => {
  const dosage = `0,5 - 1 mg/kg por dia, dividido em 3 doses`;
  return dosage || '0,5 - 1 mg/kg por dia';
};

export const calculateClorexidinaTopicaDosage = (): string => {
  const dosage = `Aplicar conforme necessário para limpeza/desinfecção`;
  return dosage;
};

export const calculateTetraciclinaPomadaDosage = (): string => {
  const dosage = `Aplicar 2-4 vezes ao dia`;
  return dosage;
};

export const calculatePovidonaIodadaDosage = (): string => {
  const dosage = `Aplicar conforme necessário`;
  return dosage;
};

export const calculateMetoclopramidaDosage = (peso: number): string => {
  const dosage = `0,1-0,2 mg/kg por dose, até 3 vezes ao dia`;
  return dosage;
};

export const calculateDexametasonaOftalmicaDosage = (): string => {
  const dosage = `1-2 gotas, 4-6 vezes ao dia`;
  return dosage;
};

export const calculateMiconazolDosage = (): string => {
  const dosage = `Aplicar 2 vezes ao dia`;
  return dosage;
};

export const calculateSalicilatoDeMetilaDosage = (): string => {
  const dosage = `Aplicar topicamente conforme necessário para alívio da dor`;
  return dosage;
};

export const calculateCorticosteroideTopicoDosage = (): string => {
  const dosage = `Aplicar 1-2 vezes ao dia`;
  return dosage;
};

export const calculateLidocainaGelDosage = (): string => {
  const dosage = `Aplicar uma pequena quantidade na área afetada`;
  return dosage;
};

export const calculateSulfacetamidaColirioDosage = (): string => {
  const dosage = `1-2 gotas em cada olho, a cada 3-4 horas`;
  return dosage;
};

export const calculatePermetrina1Dosage = (): string => {
  const dosage = `Aplicar conforme necessário para tratamento de piolhos`;
  return dosage;
};

export const calculateIsotretinoinaTopicaDosage = (): string => {
  const dosage = `Aplicar uma vez ao dia, sob supervisão médica`;
  return dosage;
};

export const calculateVitaminaDDosage = (): string => {
  const dosage = `400-1000 UI uma vez ao dia`;
  return dosage;
};

// Função principal que seleciona o cálculo com base no medicamento escolhido
export const calcularDosagemMedicamento = (
  medicamento: string,
  peso: number,
  idade: number
): string => {
  switch (medicamento) {
    case 'SRO':
      return calculateSRODosage(peso);
    case 'SulfatoFerroso':
      return calculateSulfatoFerrosoDosage(peso, idade);
    case 'Amoxicilina':
      return calculateAmoxicilinaDosage(peso);
    case 'Cotrimoxazol':
      return calculateCotrimoxazolDosage(peso, idade);
    case 'Eritromicina':
      return calculateEritromicinaDosage(peso);
    case 'Zinco':
      return calculateZincoDosage(idade);
    case 'Paracetamol':
      return calculateParacetamolDosage(peso);
    case 'Ibuprofeno':
      return calculateIbuprofenoDosage(peso);
    case 'VitaminaA':
      return calculateVitaminaADosage(idade);
    case 'Albendazol':
      return calculateAlbendazolDosage(idade);
    case 'Mebendazol':
      return calculateMebendazolDosage();
    case 'AcidoFolico':
      return calculateAcidoFolicoDosage();
    case 'Metronidazol':
      return calculateMetronidazolDosage(peso);
    case 'CloroquinaPrimaquina':
      return calculateCloroquinaPrimaquinaDosage();
    case 'Salbutamol':
      return calculateSalbutamolDosage(peso);
    case 'Nistatina':
      return calculateNistatinaDosage();
    case 'PermetrinaBenzoato':
      return calculatePermetrinaBenzoatoDosage();
    case 'Cefalexina':
      return calculateCefalexinaDosage(peso);
    case 'Claritromicina':
      return calculateClaritromicinaDosage(peso);
    case 'GentamicinaColirio':
      return calculateGentamicinaColirioDosage();
    case 'Prednisolona':
      return calculatePrednisolonaDosage(peso);
    case 'Aciclovir':
      return calculateAciclovirDosage(peso);
    case 'Hidroxizina':
      return calculateHidroxizinaDosage(peso);
    case 'Bromoprida':
      return calculateBromopridaDosage(peso);
    case 'ClorexidinaTopica':
      return calculateClorexidinaTopicaDosage();
    case 'TetraciclinaPomada':
      return calculateTetraciclinaPomadaDosage();
    case 'PovidonaIodada':
      return calculatePovidonaIodadaDosage();
    case 'Metoclopramida':
      return calculateMetoclopramidaDosage(peso);
    case 'DexametasonaOftalmica':
      return calculateDexametasonaOftalmicaDosage();
    case 'Miconazol':
      return calculateMiconazolDosage();
    case 'SalicilatoDeMetila':
      return calculateSalicilatoDeMetilaDosage();
    case 'CorticosteroideTopico':
      return calculateCorticosteroideTopicoDosage();
    case 'LidocainaGel':
      return calculateLidocainaGelDosage();
    case 'SulfacetamidaColirio':
      return calculateSulfacetamidaColirioDosage();
    case 'Permetrina1':
      return calculatePermetrina1Dosage();
    case 'IsotretinoinaTopica':
      return calculateIsotretinoinaTopicaDosage();
    case 'VitaminaD':
      return calculateVitaminaDDosage();
    default:
      return 'Medicamento desconhecido';
  }
};
