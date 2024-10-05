-- Tabela Doctors (Médicos)
CREATE TABLE public.doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  owner_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  UNIQUE (owner_id)
);

-- Tabela Patients (Pacientes)
CREATE TABLE public.patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  nome_patients text NOT NULL,
  cpf_patients text UNIQUE NOT NULL,
  data_nasc_patients date,
  sexo_patients text,
  email_patients text,
  fone_patients text,
  cep_patients text,
  uf_patients text,
  cidade_patients text,
  endereco_patients text,
  numero_endereco_patients text,
  created_by uuid NULL REFERENCES auth.users (id) ON DELETE SET NULL,
  doctor_id uuid NOT NULL REFERENCES public.doctors (id) ON DELETE CASCADE,
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE (cpf_patients)
);

-- Tabela Attendances (Prontuários)
CREATE TABLE public.attendances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients (id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  -- Informações gerais
  data_atendimento text NOT NULL,
  primeira_consulta text, -- Sim/Não
  consulta_retorno text, -- Sim/Não
  motivo_consulta text,
  peso_kg text,
  comprimento_cm text,
  perimetro_cefalico_cm text,
  
  -- Pergunta: Quais os problemas da criança?
  problemas_da_crianca text,
  
  -- Avaliar sinais gerais de perigo
  nao_bebe_ou_mama text, -- Sim/Não
  vomita_tudo text, -- Sim/Não
  convulsoes text, -- Sim/Não
  letargica text, -- Sim/Não
  enchimento_capilar text, -- Sim/Não
  batimento_asa text, -- Sim/Não
  
  -- Tosse ou dificuldade para respirar
  tem_tosse text, -- Sim/Não
  tosse_ha_quanto_tempo text,
  numero_respiracoes_por_minuto text,
  respiracao_rapida text, -- Sim/Não
  tiragem_subcostal text, -- Sim/Não
  estridor text, -- Sim/Não
  sibilancia text, -- Sim/Não
  sibilancia_ha_quanto_tempo text,
  primeira_crise text, -- Sim/Não
  broncodilatador text, -- Sim/Não
  
  -- Diarreia
  tem_diarreia text, -- Sim/Não
  diarreia_ha_quanto_tempo text,
  sangue_nas_fezes text, -- Sim/Não
  
  -- Febre
  tem_febre text, -- Sim/Não
  area_risco_malaria text, -- 'sem risco', 'alto risco', 'baixo risco'
  febre_ha_quanto_tempo text,
  febre_todos_os_dias text, -- Sim/Não
  rigidez_nuca text, -- Sim/Não
  petequias text, -- Sim/Não
  abaulamento_fontanela text, -- Sim/Não
  
  -- Problemas de ouvido
  problema_ouvido text, -- Sim/Não
  dor_no_ouvido text, -- Sim/Não
  secrecao_ouvido text, -- Sim/Não
  secrecao_ha_quanto_tempo text,
  
  -- Dor de garganta
  dor_garganta text, -- Sim/Não
  ganglios_cervicais text, -- Sim/Não
  abaulamento_palato text, -- Sim/Não
  amigdalas_membrana text, -- Sim/Não
  amigdalas_pontos_purulentos text, -- Sim/Não
  vesiculas_hiperemia text, -- Sim/Não

  -- Doença grave ou infecção local (para recém-nascidos)
  gemido text, -- Sim/Não
  cianose_periferica text, -- Sim/Não
  ictericia text, -- Sim/Não
  secrecao_umbilical text, -- Sim/Não
  distensao_abdominal text, -- Sim/Não
  anomalias_congenitas text, -- Sim/Não

  -- Desnutrição ou anemia
  emagrecimento text, -- Sim/Não
  edema text, -- Sim/Não
  palidez_palmar text, -- 'leve' ou 'grave'
  peso_para_idade text, -- 'muito baixo', 'baixo', 'adequado', 'elevado'
  ganho_insuficiente_peso text, -- Sim/Não

  -- Alimentação da criança
  amamentando text, -- Sim/Não
  quantas_vezes_amamenta text,
  amamenta_noite text, -- Sim/Não
  alimentos_liquidos text,
  quantidade_refeicoes text,
  recebe_proporcao text, -- Sim/Não
  tipo_alimentacao text,
  mudou_alimentacao text, -- Sim/Não
  como_mudou_alimentacao text,

  -- Avaliar desenvolvimento
  perda_peso_primeira_semana text, -- Sim/Não
  tendencia_crescimento text,
  habilidades_desenvolvimento text,

  -- Prática de atividade física
  atividade_fisica_vezes_semana text,
  tempo_atividade_fisica text,
  tempo_sedentario text,

  -- Possibilidade de violência e outros problemas
  avaliacao_violencia text,
  outros_problemas text,

  -- Registro do profissional que fez o atendimento
  registrado_por uuid NULL REFERENCES auth.users (id) ON DELETE SET NULL
);




-- Publicar tabelas para sincronização no powersync;

CREATE PUBLICATION powersync FOR TABLE
  public.doctors,
  public.patients,
  public.attendances;
