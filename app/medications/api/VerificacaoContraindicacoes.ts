// Tipo para armazenar informações do paciente
export interface PacienteInfo {
  alergias: Record<string, string | boolean>; // As alergias vêm da tabela allergies
  condicoesClinicas: Record<string, string | boolean>; // As condições clínicas vêm da tabela attendances
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
      if (condicoesClinicas.hemocromatose === 'yes') {
        alertas.push(
          'Sulfato Ferroso é contraindicado para pacientes com Hemocromatose (sobrecarga de ferro).'
        );
      }
      break;

    case 'Amoxicilina':
      if (alergias.allergy_penicillin === 'yes') {
        alertas.push('Amoxicilina é contraindicado para pacientes com alergia à Penicilina.');
      }
      break;

    case 'Cotrimoxazol':
      if (alergias.allergy_sulfa === 'yes') {
        alertas.push('Cotrimoxazol é contraindicado para pacientes com alergia a Sulfa.');
      }
      if (condicoesClinicas.diabetes === 'yes') {
        alertas.push(
          'Cuidado: Cotrimoxazol pode interferir no controle da glicose em pacientes diabéticos.'
        );
      }
      break;

    case 'Ibuprofeno':
      if (condicoesClinicas.hipertensao === 'yes') {
        alertas.push('Ibuprofeno é contraindicado para pacientes com hipertensão.');
      }
      if (alergias.allergy_diclofenac === 'yes') {
        alertas.push(
          'Ibuprofeno é contraindicado para pacientes com alergia a AINEs (anti-inflamatórios não esteroides).'
        );
      }
      break;

    case 'Paracetamol':
      if (condicoesClinicas.doenca_hepatica === 'yes') {
        alertas.push('Paracetamol deve ser usado com cautela em pacientes com doença hepática.');
      }
      break;

    case 'CloroquinaPrimaquina':
      if (condicoesClinicas.deficiencia_g6pd === 'yes') {
        alertas.push(
          'Cloroquina/Primaquina é contraindicado para pacientes com deficiência de G6PD.'
        );
      }
      break;

    case 'GentamicinaColirio':
      if (alergias.allergy_gentamicina === 'yes') {
        alertas.push('Gentamicina é contraindicado para pacientes com alergia à gentamicina.');
      }
      break;

    case 'Cefalexina':
      if (alergias.allergy_cephalosporin === 'yes') {
        alertas.push('Cefalexina é contraindicado para pacientes com alergia à cefalosporinas.');
      }
      break;

    case 'Prednisolona':
      if (condicoesClinicas.hipertensao === 'yes') {
        alertas.push(
          'Prednisolona pode aumentar a pressão arterial e deve ser usada com cautela em hipertensos.'
        );
      }
      if (condicoesClinicas.diabetes === 'yes') {
        alertas.push('Prednisolona pode aumentar os níveis de glicose em pacientes diabéticos.');
      }
      break;

    default:
      alertas.push('Nenhuma contraindicação específica encontrada para este medicamento.');
      break;
  }

  return alertas;
};
