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
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  tax_mae text,
  peso_mae text,
  estatura_mae text,
  pa_mae text,
  tipo_sang_mae text,
  tax text,
  apgar_1 text,
  apgar_5 text,
  peso text,
  comprimento text,
  pc text,
  gesta text,
  para text,
  cesareas text,
  abortos text,
  abot_espon text,
  vacinas_mae text,
  nasc_vivos text,
  mort_neo text,
  filhos text,
  intern text,
  cirg text,
  quant_cirg text,
  consul_pre text,
  quant_consul_pre text,
  trat_mae text,
  descr_mae text,
  patient_id uuid NOT NULL REFERENCES public.patients (id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES public.doctors (id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users (id) ON DELETE SET NULL
);

-- Publicar tabelas para sincronização no powersync;

CREATE PUBLICATION powersync FOR TABLE
  public.doctors,
  public.patients,
  public.attendances;
