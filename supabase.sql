create table
  public.doctors (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    email text not null,
    name text null,
    auth_user_id uuid null default auth.uid (),
    constraint doctors_pkey primary key (id)
  ) tablespace pg_default;

create index if not exists doctors_email_idx on public.doctors using btree (email) tablespace pg_default;

create table
  public.patients (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null default now(),
    name text not null,
    cpf text not null,
    birth_date text not null,
    gender text null,
    phone_number text null,
    address text null,
    city text null,
    uf text null,
    zip_code text null,
    created_by uuid null default auth.uid (),
    doctor_id uuid null,
    constraint patients_pkey primary key (id),
    constraint patients_cpf_unique unique (cpf),
    constraint patients_created_by_fkey foreign key (created_by) references auth.users (id) on delete set null,
    constraint patients_doctor_id_fkey foreign key (doctor_id) references doctors (id) on update cascade on delete set default
  ) tablespace pg_default;

create index if not exists patients_cpf_idx on public.patients using btree (cpf) tablespace pg_default;

create table
  public.attendances (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null default now(),
    patient_id uuid not null,
    created_by uuid null default auth.uid (),
    data_atendimento text not null,
    primeira_consulta text null,
    consulta_retorno text null,
    motivo_consulta text null,
    doctor_id uuid null,
    constraint attendances_pkey primary key (id),
    constraint attendances_doctor_id_fkey foreign key (doctor_id) references doctors (id) on update cascade on delete set default,
    constraint attendances_patient_id_fkey foreign key (patient_id) references patients (id) on delete cascade,
    constraint attendances_registrado_por_fkey foreign key (created_by) references auth.users (id) on delete set null
  ) tablespace pg_default;

  create table
  public.attendance_vitals (
    id uuid not null default gen_random_uuid (),
    attendance_id uuid not null,
    peso_kg text null,
    comprimento_cm text null,
    perimetro_cefalico_cm text null,
    numero_respiracoes_por_minuto text null,
    constraint attendance_vitals_pkey primary key (id),
    constraint attendance_vitals_attendance_id_fkey foreign key (attendance_id) references attendances (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.attendance_symptoms (
    id uuid not null default gen_random_uuid (),
    attendance_id uuid not null,
    nao_bebe_ou_mama text null,
    vomita_tudo text null,
    convulsoes text null,
    letargica text null,
    enchimento_capilar text null,
    batimento_asa text null,
    tem_tosse text null,
    sibilancia text null,
    tem_diarreia text null,
    tem_febre text null,
    rigidez_nuca text null,
    problema_ouvido text null,
    dor_garganta text null,
    gemido text null,
    cianose_periferica text null,
    ictericia text null,
    distensao_abdominal text null,
    emagrecimento text null,
    edema text null,
    constraint attendance_symptoms_pkey primary key (id),
    constraint attendance_symptoms_attendance_id_fkey foreign key (attendance_id) references attendances (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.attendance_nutrition_development (
    id uuid not null default gen_random_uuid (),
    attendance_id uuid not null,
    amamentando text null,
    quantas_vezes_amamenta text null,
    amamenta_noite text null,
    alimentos_liquidos text null,
    quantidade_refeicoes text null,
    tipo_alimentacao text null,
    mudou_alimentacao text null,
    como_mudou_alimentacao text null,
    perda_peso_primeira_semana text null,
    tendencia_crescimento text null,
    habilidades_desenvolvimento text null,
    atividade_fisica_vezes_semana text null,
    tempo_atividade_fisica text null,
    tempo_sedentario text null,
    avaliacao_violencia text null,
    outros_problemas text null,
    constraint attendance_nutrition_development_pkey primary key (id),
    constraint attendance_nutrition_development_attendance_id_fkey foreign key (attendance_id) references attendances (id) on delete cascade
  ) tablespace pg_default;


-- Publicar tabelas para sincronização no powersync;

CREATE PUBLICATION powersync FOR TABLE
  public.doctors,
  public.patients,
  public.attendances;
  public.attendance_vitals;
  public.attendance_symptoms;
  public.attendance_nutrition_development;
