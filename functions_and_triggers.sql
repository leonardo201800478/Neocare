-- Função para criar um médico automaticamente ao criar um novo usuário

CREATE FUNCTION public.create_doctor() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.doctors (owner_id, name)
  VALUES (NEW.id, NEW.email); -- Usa o email como nome temporário
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.create_doctor();

-- Função para criar automaticamente um prontuário ao cadastrar um paciente

CREATE FUNCTION public.create_attendance_on_patient_create() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.attendances (
    patient_id, doctor_id, doctor_name, created_by, created_at, updated_at
  )
  VALUES (
    NEW.id, NEW.doctor_id, (SELECT name FROM public.doctors WHERE id = NEW.doctor_id), NEW.created_by, NOW(), NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_patient_created
AFTER INSERT ON public.patients
FOR EACH ROW EXECUTE FUNCTION public.create_attendance_on_patient_create();

