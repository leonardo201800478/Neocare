-- Tabela doctors
CREATE TABLE
 public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  nome_user TEX NOT NULL,
  email_user TEX,
  owner_id uuid NOT NULL, -- O ID do usuário registrado (auth.users)
  CONSTRAINT doctors_pkey PRIMARY KEY (id),
  CONSTRAINT doctors_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Tabela patients
CREATE TABLE
 public.patients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  nome_patients TEX NOT NULL,
  cpf_patients TEX UNIQUE NOT NULL,
  data_nasc_patients TEXT NOT NULL,
  email_patients TEXT), 
  fone_patients TEXT,
  cep_patients TEXT,
  uf_patients TEXT,
  cidade_patients TEXT,
  bairro_patients TEXT,
  logradouro_patients TEX,
  numero_patients TEXT,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  doctor_id uuid NOT NULL, -- Relacionado ao médico responsável
  modified_by uuid NOT NULL, -- ID do médico que fez a última modificação
  CONSTRAINT patients_pkey PRIMARY KEY (id),
  CONSTRAINT patients_created_by_fkey FOREIGN KEY (created_by) references auth.users (id) on delete set null,
  CONSTRAINT patients_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES auth.users (id) ON DELETE CASCADE,
  CONSTRAINT patients_modified_by_fkey FOREIGN KEY (modified_by) REFERENCES auth.users (id) ON DELETE CASCADE SET NULL
) TABLESPACE pg_default;

-- Tabela attendances (prontuários)
CREATE TABLE
 public.attendances (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by uuid NOT NULL, -- Quem criou o prontuário (doctor_id)
  patient_id uuid NOT NULL, -- Relacionado ao paciente
  tipo TEXT) NOT NULL, -- Tipo da consulta
  tax_mae TEXT,
  peso_mae TEXT,
  estatura_mae TEXT,
  paMae TEXT,
  tipo_sang_mae TEXT,
  tax TEXT,
  apgar_1 TEXT,
  apgar_5 TEXT,
  peso TEXT,
  comprimento TEXT,
  pc TEXT,
  gesta TEXT,
  para TEXT,
  cesareas TEXT,
  abortos TEXT,
  abot_espon TEXT,
  vacinas_mae TEXT,
  nasc_vivos TEXT,
  mort_neo TEXT,
  filhos TEXT,
  intern TEXT,
  cirg TEXT,
  quant_cirg TEXT,
  consul_pre TEXT,
  quant_consul_pre TEXT,
  trat_mae TEXT,
  descr_mae TEXT,
  inserted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT attendances_pkey PRIMARY KEY (id),
  CONSTRAINT attendances_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT attendances_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Publicação powersync para sincronizar as tabelas
CREATE PUBLICATION powersync FOR TABLE doctors, patients, attendances;

-- Habilitar RLS (Row Level Security) nas tabelas
ALTER TABLE public.doctors
 ENABLE ROW LEVEL SECURITY;
 
ALTER TABLE public.patients
 ENABLE ROW LEVEL SECURITY;
 
ALTER TABLE public.attendances
 ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para acesso e manipulação de dados


-- This trigger automatically creates some sample data when a user registers.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user_sample_data()
returns trigger as $$
declare
  new_doctors_id uuid;
begin
  insert into public.doctors (nome, owner_id)
    values ('João', new.id)
    returning id into new_doctors_id;
  
  insert into public.patients(description, doctors_id, created_by)
    values ('Pedro', new_doctors_id, new.id);

  insert into public.patients(description, doctors_id, created_by)
    values ('Carlos', new_doctors_id, new.id);

  return new;
end;
$$ language plpgsql security definer;

create trigger new_user_sample_data after insert on auth.users for each row execute procedure public.handle_new_user_sample_data();





-- Triggers para atualização de timestamp
CREATE TRIGGER update_doctors_timestamp
BEFORE UPDATE ON public.doctors
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_patients_timestamp
BEFORE UPDATE ON public.patients
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_attendances_timestamp
BEFORE UPDATE ON public.attendances
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
