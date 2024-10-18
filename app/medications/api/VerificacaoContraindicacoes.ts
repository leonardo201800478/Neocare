// Definição do tipo para armazenar informações do paciente
export interface PacienteInfo {
  alergias: Record<string, string | boolean>;
  condicoesClinicas: Record<string, string | boolean>;
}

// Função para verificar contraindicações
export const verificarContraindicacoes = (
  medicamento: string,
  pacienteInfo: PacienteInfo
): string[] => {
  const { alergias, condicoesClinicas } = pacienteInfo;
  const alertas: string[] = [];

  // Função auxiliar para padronizar comparações de strings
  const isYes = (value: string | boolean | undefined): boolean =>
    typeof value === 'string' ? value.trim().toLowerCase() === 'yes' : value === true;

  // Verificação de contraindicações por medicamento
  switch (medicamento) {
    case 'SulfatoFerroso':
      if (isYes(condicoesClinicas.hemocromatose)) {
        alertas.push(
          'Sulfato Ferroso é contraindicado para pacientes com Hemocromatose (sobrecarga de ferro).'
        );
      }
      break;

    case 'Amoxicilina':
      if (isYes(alergias.allergy_penicillin)) {
        alertas.push('Amoxicilina é contraindicado para pacientes com alergia à Penicilina.');
      }
      break;

    case 'Cotrimoxazol':
      if (isYes(alergias.allergy_sulfa)) {
        alertas.push('Cotrimoxazol é contraindicado para pacientes com alergia a Sulfa.');
      }
      if (isYes(condicoesClinicas.diabetes)) {
        alertas.push(
          'Cuidado: Cotrimoxazol pode interferir no controle da glicose em pacientes diabéticos.'
        );
      }
      break;

    case 'Ibuprofeno':
      if (isYes(condicoesClinicas.hipertensao)) {
        alertas.push('Ibuprofeno é contraindicado para pacientes com hipertensão.');
      }
      if (isYes(alergias.allergy_diclofenac)) {
        alertas.push(
          'Ibuprofeno é contraindicado para pacientes com alergia a AINEs (anti-inflamatórios não esteroides).'
        );
      }
      break;

    case 'Paracetamol':
      if (isYes(condicoesClinicas.doenca_hepatica)) {
        alertas.push('Paracetamol deve ser usado com cautela em pacientes com doença hepática.');
      }
      break;

    case 'Salbutamol':
      if (isYes(alergias.allergy_salbutamol)) {
        alertas.push('Paciente alérgico a Salbutamol.');
      }
      break;

    case 'CloroquinaPrimaquina':
      if (isYes(condicoesClinicas.deficiencia_g6pd)) {
        alertas.push(
          'Cloroquina/Primaquina é contraindicado para pacientes com deficiência de G6PD.'
        );
      }
      break;

    case 'GentamicinaColirio':
      if (isYes(alergias.allergy_gentamicina)) {
        alertas.push('Gentamicina é contraindicado para pacientes com alergia à gentamicina.');
      }
      break;

    case 'Cefalexina':
      if (isYes(alergias.allergy_cephalosporin)) {
        alertas.push('Cefalexina é contraindicado para pacientes com alergia à cefalosporinas.');
      }
      break;

    case 'Prednisolona':
      if (isYes(condicoesClinicas.hipertensao)) {
        alertas.push(
          'Prednisolona pode aumentar a pressão arterial e deve ser usada com cautela em hipertensos.'
        );
      }
      if (isYes(condicoesClinicas.diabetes)) {
        alertas.push('Prednisolona pode aumentar os níveis de glicose em pacientes diabéticos.');
      }
      break;
  }

  return alertas;
};
