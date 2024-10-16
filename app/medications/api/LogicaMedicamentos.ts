//app/medications/api/LogicaMedicamentos.ts

// Funções de cálculo para cada medicamento

export const calculateSRODosage = (peso: number): string => {
  const dosage = `${50 * peso} - ${100 * peso} ml, dependendo do nível de desidratação`;
  return dosage;
};

export const calculateSulfatoFerrosoDosage = (peso: number, idade: number): string => {
  if (idade < 18) {
    return `${(3 * peso).toFixed(2)} - ${(6 * peso).toFixed(2)} mg/dia de ferro elementar para crianças`;
  } else {
    return `60 - 120 mg/dia para adultos`;
  }
};

export const calculateAmoxicilinaDosage = (peso: number): string => {
  const dosage = `${(20 * peso).toFixed(2)} - ${(40 * peso).toFixed(2)} mg/kg/dia, dividido em 2-3 doses`;
  return dosage;
};

export const calculateCotrimoxazolDosage = (peso: number, idade: number): string => {
  if (idade < 18) {
    return `${(8 * peso).toFixed(2)} mg/kg/dia de trimetoprima para crianças`;
  } else {
    return `160-800 mg duas vezes ao dia para adultos`;
  }
};

export const calculateEritromicinaDosage = (peso: number): string => {
  const dosage = `${(30 * peso).toFixed(2)} - ${(50 * peso).toFixed(2)} mg/kg/dia, dividido em 4 doses`;
  return dosage;
};

export const calculateZincoDosage = (idade: number): string => {
  if (idade < 18) {
    return `10-20 mg uma vez ao dia por 10-14 dias para crianças`;
  } else {
    return `20 mg para adultos`;
  }
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
  if (idade < 1) {
    return `100.000 UI dose única a cada 4-6 meses para menores de 1 ano`;
  } else {
    return `200.000 UI dose única a cada 4-6 meses para maiores de 1 ano`;
  }
};

export const calculateAlbendazolDosage = (idade: number): string => {
  if (idade > 2) {
    return `400 mg dose única`;
  } else {
    return `200 mg dose única para menores de 2 anos`;
  }
};

export const calculateMebendazolDosage = (): string => {
  return `100 mg, duas vezes ao dia por 3 dias`;
};

export const calculateAcidoFolicoDosage = (): string => {
  return `0,1-0,4 mg uma vez ao dia`;
};

export const calculateMetronidazolDosage = (peso: number): string => {
  const dosage = `${(7.5 * peso).toFixed(2)} mg/kg por dose, a cada 8 horas`;
  return dosage;
};

export const calculateCloroquinaPrimaquinaDosage = (): string => {
  return `Sob supervisão médica, dependendo da condição clínica`;
};

export const calculateSalbutamolDosage = (peso: number): string => {
  const dosage = `${(0.1 * peso).toFixed(2)} - ${(0.2 * peso).toFixed(2)} mg/kg por dose, até 3-4 vezes ao dia`;
  return dosage;
};

export const calculateNistatinaDosage = (): string => {
  return `100.000 UI, 4 vezes ao dia`;
};

export const calculatePermetrinaBenzoatoDosage = (): string => {
  return `Aplicar topicamente conforme necessário`;
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
  return `1-2 gotas em cada olho, a cada 4-6 horas`;
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
    case 'Vitamina A':
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
    default:
      return 'Medicamento desconhecido';
  }
};
