// types.ts
export interface BasicInfo {
  motivo_consulta: string | undefined;
  consulta_retorno: string | undefined;
  primeira_consulta: string | undefined;
  data_atendimento: string | undefined;
  peso_kg?: string;
  comprimento_cm?: string;
  perimetro_cefalico_cm?: string;
  numero_respiracoes_por_minuto?: string;
}

export interface GeneralSymptoms {
  tosse_ha_quanto_tempo: string | undefined;
  numero_respiracoes_por_minuto: string | undefined;
  respiracao_rapida: string | undefined;
  tiragem_subcostal: string | undefined;
  estridor: string | undefined;
  sibilancia_ha_quanto_tempo: string | undefined;
  primeira_crise: string | undefined;
  broncodilatador: string | undefined;
  nao_bebe_ou_mama?: string;
  vomita_tudo?: string;
  convulsoes?: string;
  letargica?: string;
  enchimento_capilar?: string;
  batimento_asa?: string;
  tem_tosse?: string;
  sibilancia?: string;
  tem_diarreia?: string;
  tem_febre?: string;
  rigidez_nuca?: string;
  problema_ouvido?: string;
  dor_garganta?: string;
  gemido?: string;
  cianose_periferica?: string;
  ictericia?: string;
  distensao_abdominal?: string;
  emagrecimento?: string;
  edema?: string;
}

export interface NutritionDevelopment {
  amamentando?: string;
  quantas_vezes_amamenta?: string;
  amamenta_noite?: string;
  alimentos_liquidos?: string;
  quantidade_refeicoes?: string;
  tipo_alimentacao?: string;
  mudou_alimentacao?: string;
  como_mudou_alimentacao?: string;
  perda_peso_primeira_semana?: string;
  tendencia_crescimento?: string;
  habilidades_desenvolvimento?: string;
  atividade_fisica_vezes_semana?: string;
  tempo_atividade_fisica?: string;
  tempo_sedentario?: string;
  avaliacao_violencia?: string;
  outros_problemas?: string;
}
