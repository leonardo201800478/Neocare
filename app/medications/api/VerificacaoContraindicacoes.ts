// app/medications/api/VerificacaoContraindicacoes.ts

// Tipo para armazenar informações do paciente
export interface PacienteInfo {
  alergias: string[];
  condicoesClinicas: string[];
}

// Função para verificar contraindicações
export const verificarContraindicacoes = (
  medicamento: string,
  pacienteInfo: PacienteInfo
): string[] => {
  const { alergias, condicoesClinicas } = pacienteInfo;
  const alertas: string[] = [];

  // Verificação de contraindicações por medicamento
  switch (medicamento) {
    case 'SulfatoFerroso':
      if (condicoesClinicas.includes('Hemocromatose')) {
        alertas.push(
          'Sulfato Ferroso contraindicado para pacientes com Hemocromatose (sobrecarga de ferro).'
        );
      }
      break;

    case 'Amoxicilina':
      if (alergias.includes('Penicilina')) {
        alertas.push('Amoxicilina é contraindicado para pacientes com alergia à Penicilina.');
      }
      break;

    case 'Cotrimoxazol':
      if (alergias.includes('Sulfa')) {
        alertas.push('Cotrimoxazol é contraindicado para pacientes com alergia a Sulfa.');
      }
      if (condicoesClinicas.includes('Diabetes')) {
        alertas.push(
          'Cuidado: Cotrimoxazol pode interferir no controle da glicose em pacientes diabéticos.'
        );
      }
      break;

    case 'Ibuprofeno':
      if (condicoesClinicas.includes('Hipertensão')) {
        alertas.push('Ibuprofeno é contraindicado para pacientes com hipertensão.');
      }
      if (alergias.includes('AINEs')) {
        alertas.push(
          'Ibuprofeno é contraindicado para pacientes com alergia a anti-inflamatórios não esteroides (AINEs).'
        );
      }
      break;

    case 'Paracetamol':
      if (condicoesClinicas.includes('Doença Hepática')) {
        alertas.push('Paracetamol deve ser usado com cautela em pacientes com doença hepática.');
      }
      break;

    case 'CloroquinaPrimaquina':
      if (condicoesClinicas.includes('Deficiência de G6PD')) {
        alertas.push(
          'Cloroquina/Primaquina é contraindicado para pacientes com deficiência de G6PD.'
        );
      }
      break;

    case 'GentamicinaColirio':
      if (alergias.includes('Gentamicina')) {
        alertas.push('Gentamicina é contraindicado para pacientes com alergia à gentamicina.');
      }
      break;

    case 'Cefalexina':
      if (alergias.includes('Cefalosporinas')) {
        alertas.push('Cefalexina é contraindicado para pacientes com alergia à cefalosporinas.');
      }
      break;

    case 'Prednisolona':
      if (condicoesClinicas.includes('Hipertensão')) {
        alertas.push(
          'Prednisolona pode aumentar a pressão arterial e deve ser usada com cautela em hipertensos.'
        );
      }
      if (condicoesClinicas.includes('Diabetes')) {
        alertas.push('Prednisolona pode aumentar os níveis de glicose em pacientes diabéticos.');
      }
      break;

    default:
      alertas.push('Nenhuma contraindicação específica encontrada para este medicamento.');
      break;
  }

  return alertas;
};
