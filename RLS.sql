-- RLS para a tabela patients

-- Habilitar RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Política para permitir que médicos vejam seus pacientes ou os pacientes criados por eles
CREATE POLICY select_patient ON public.patients
FOR SELECT USING (
  doctor_id = auth.uid() OR created_by = auth.uid()
);

-- Política para permitir que médicos criem pacientes
CREATE POLICY insert_patient ON public.patients
FOR INSERT WITH CHECK (
  doctor_id = auth.uid()
);

-- Política para permitir que médicos atualizem os dados dos seus pacientes
CREATE POLICY update_patient ON public.patients
FOR UPDATE USING (
  doctor_id = auth.uid()
);


-- RLS para a tabela attendances
-- Habilitar RLS
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;

-- Política para permitir que médicos vejam os prontuários dos pacientes que eles atenderam
CREATE POLICY select_attendance ON public.attendances
FOR SELECT USING (
  doctor_id = auth.uid() OR created_by = auth.uid()
);

-- Política para permitir que médicos criem prontuários para os pacientes que eles atendem
CREATE POLICY insert_attendance ON public.attendances
FOR INSERT WITH CHECK (
  doctor_id = auth.uid()
);

-- Política para permitir que médicos atualizem prontuários que eles mesmos criaram
CREATE POLICY update_attendance ON public.attendances
FOR UPDATE USING (
  doctor_id = auth.uid() OR created_by = auth.uid()
);


