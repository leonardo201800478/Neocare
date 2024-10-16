//app/medications/api/CalculadoraMedicamentos.ts

import { calcularDosagemMedicamento } from './LogicaMedicamentos';
import { verificarContraindicacoes, PacienteInfo } from './VerificacaoContraindicacoes';

// Função principal que calcula a dosagem e verifica contraindicações
export const calcularMedicamento = (
  medicamento: string,
  peso: number,
  idade: number,
  pacienteInfo: PacienteInfo
): { dosage: string; alertas: string[] } => {
  // Cálculo da dosagem com base no medicamento, peso e idade
  const dosage = calcularDosagemMedicamento(medicamento, peso, idade);

  // Verificação de contraindicações usando as informações do paciente
  const alertas = verificarContraindicacoes(medicamento, pacienteInfo);

  return { dosage, alertas };
};

export { verificarContraindicacoes };
