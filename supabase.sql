-- Create tables
create table
  public.doctors (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    name text not null,
    owner_id uuid not null,
    constraint doctors_pkey primary key (id),
    constraint doctors_owner_id_fkey foreign key (owner_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create table
  public.patients (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    nome_patients text not null,
    cpf_patients text unique not null,
    data_nasc_patients text,
    sexo_patients text,
    email_patients text,
    fone_patients text,
    cep_patients text,
    uf_patients text,
    cidade_patients text,
    endereco_patients text,
    numero_endereco_patients text,
    created_by uuid null,
    doctor_id uuid not null,
    constraint patients_pkey primary key (id),
    constraint patients_created_by_fkey foreign key (created_by) references auth.users (id) on delete set null,
    constraint patients_doctor_id_fkey foreign key (doctor_id) references doctors (id) on delete cascade
  ) tablespace pg_default;

-- Create attendances table
create table
  public.attendances (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    tipo text not null, -- Tipo da consulta
    tax_mae text,
    peso_mae text,
    estatura_mae text,
    pa_mae text, -- Pressão arterial
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
    patient_id uuid not null,
    doctor_id uuid not null,
    doctor_name text not null, -- Nome do doutor responsável
    created_by uuid not null, -- ID do usuário que criou o prontuário
    constraint attendances_pkey primary key (id),
    constraint attendances_patient_id_fkey foreign key (patient_id) references patients (id) on delete cascade,
    constraint attendances_doctor_id_fkey foreign key (doctor_id) references doctors (id) on delete cascade
  ) tablespace pg_default;

-- Create publication for powersync
create publication powersync for table doctors, patients, attendances;

-- Set up Row Level Security (RLS)
-- Enable RLS for the relevant tables
alter table public.doctors enable row level security;
alter table public.patients enable row level security;
alter table public.attendances enable row level security;

-- Policies for 'patients' table
create policy "patients view" on public.patients for SELECT using (
  true
);
create policy "patients update" on public.patients for UPDATE using (
  auth.uid() = created_by
);
create policy "patients delete" on public.patients for DELETE using (
  auth.uid() = created_by
);

-- Policies for 'attendances' table
create policy "attendances view" on public.attendances for SELECT using (
  true
);
create policy "attendances update" on public.attendances for UPDATE using (
  auth.uid() = created_by
);
create policy "attendances delete" on public.attendances for DELETE using (
  auth.uid() = created_by
);

-- This trigger automatically creates some sample data when a user registers.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user_sample_data()
returns trigger as $$
declare
  new_doctor_id uuid;
begin
  insert into public.doctors (name, owner_id)
    values ('Doctor Sample', new.id)
    returning id into new_doctor_id;
  
  insert into public.patients(nome_patients, cpf_patients, doctor_id, created_by)
    values ('Patient 1', '12345678900', new_doctor_id, new.id);

  insert into public.patients(nome_patients, cpf_patients, doctor_id, created_by)
    values ('Patient 2', '09876543211', new_doctor_id, new.id);

  return new;
end;
$$ language plpgsql security definer;

create trigger new_user_sample_data after insert on auth.users for each row execute procedure public.handle_new_user_sample_data();

-- Trigger to update 'updated_at' on the 'attendances' table
create function public.update_attendance_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_attendance_updated_at before update on public.attendances for each row execute procedure public.update_attendance_updated_at();

-- Attachments
-- Ensure you have created a storage bucket named: 'media'
-- Policies for storage allowing users to read and write their own files
CREATE POLICY "Select media" ON storage.objects FOR SELECT TO public USING (bucket_id = 'media');
CREATE POLICY "Insert media" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'media');
CREATE POLICY "Update media" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'media');
CREATE POLICY "Delete media" ON storage.objects FOR DELETE TO public USING (bucket_id = 'media');