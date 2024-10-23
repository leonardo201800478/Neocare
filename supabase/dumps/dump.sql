

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."allergies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "patient_id" "uuid" NOT NULL,
    "doctor_id" "uuid" NOT NULL,
    "allergy_milk" "text",
    "allergy_eggs" "text",
    "allergy_beef" "text",
    "allergy_fish" "text",
    "allergy_shellfish" "text",
    "allergy_cat" "text",
    "allergy_dog" "text",
    "allergy_bee" "text",
    "allergy_ant" "text",
    "allergy_venomous_animals" "text",
    "allergy_insects" "text",
    "allergy_dipyrone" "text",
    "allergy_aspirin" "text",
    "allergy_diclofenac" "text",
    "allergy_paracetamol" "text",
    "allergy_penicillin" "text",
    "allergy_magnesium_bisulphate" "text",
    "allergy_rivaroxaban" "text",
    "allergy_losartan_potassium" "text",
    "allergy_metformin" "text",
    "allergy_butylscopolamine" "text",
    "allergy_cephalosporin" "text",
    "allergy_salbutamol" "text",
    "allergy_acido_folico" "text",
    "allergy_isotretinoina" "text"
);


ALTER TABLE "public"."allergies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendance_nutrition_development" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "amamentando" "text",
    "quantas_vezes_amamenta" "text",
    "amamenta_noite" "text",
    "alimentos_liquidos" "text",
    "quantidade_refeicoes" "text",
    "tipo_alimentacao" "text",
    "mudou_alimentacao" "text",
    "como_mudou_alimentacao" "text",
    "perda_peso_primeira_semana" "text",
    "tendencia_crescimento" "text",
    "habilidades_desenvolvimento" "text",
    "atividade_fisica_vezes_semana" "text",
    "tempo_atividade_fisica" "text",
    "tempo_sedentario" "text",
    "avaliacao_violencia" "text",
    "outros_problemas" "text",
    "patient_id" "text",
    "doctor_id" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."attendance_nutrition_development" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendance_symptoms" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nao_bebe_ou_mama" "text",
    "vomita_tudo" "text",
    "convulsoes" "text",
    "letargica" "text",
    "enchimento_capilar" "text",
    "batimento_asa" "text",
    "tem_tosse" "text",
    "sibilancia" "text",
    "tem_diarreia" "text",
    "tem_febre" "text",
    "rigidez_nuca" "text",
    "problema_ouvido" "text",
    "dor_garganta" "text",
    "gemido" "text",
    "cianose_periferica" "text",
    "ictericia" "text",
    "distensao_abdominal" "text",
    "emagrecimento" "text",
    "edema" "text",
    "patient_id" "text",
    "doctor_id" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."attendance_symptoms" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendance_vitals" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "peso_kg" "text",
    "comprimento_cm" "text",
    "perimetro_cefalico_cm" "text",
    "numero_respiracoes_por_minuto" "text",
    "doctor_id" "text",
    "patient_id" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "public"."attendance_vitals" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendances" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "patient_id" "text" NOT NULL,
    "motivo_consulta" "text",
    "doctor_id" "text",
    "hipertensao" "text",
    "diabetes" "text",
    "doenca_hepatica" "text",
    "deficiencia_g6pd" "text"
);


ALTER TABLE "public"."attendances" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."doctors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text" NOT NULL,
    "name" "text",
    "auth_user_id" "text",
    "terms_accepted" bigint
);


ALTER TABLE "public"."doctors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."medical_records" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "attendance_id" "uuid" NOT NULL,
    "vital_id" "uuid",
    "symptom_id" "uuid",
    "nutrition_id" "uuid",
    "doctor_id" "uuid" NOT NULL,
    "patient_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."medical_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."medications" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "patient_id" "uuid" NOT NULL,
    "doctor_id" "uuid" NOT NULL,
    "dosage_info" "text",
    "max_dosage_info" "text",
    "indication" "text",
    "contraindications" "text",
    "instructions" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."medications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."patients" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "name" "text" NOT NULL,
    "cpf" "text" NOT NULL,
    "birth_date" "text" NOT NULL,
    "gender" "text",
    "phone_number" "text",
    "address" "text",
    "city" "text",
    "uf" "text",
    "zip_code" "text",
    "doctor_id" "uuid"
);


ALTER TABLE "public"."patients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vaccinations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "patient_id" "uuid" NOT NULL,
    "vaccine_name" "text" NOT NULL,
    "dose_number" "text" NOT NULL,
    "administered_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "doctor_id" "uuid" NOT NULL
);


ALTER TABLE "public"."vaccinations" OWNER TO "postgres";


ALTER TABLE ONLY "public"."allergies"
    ADD CONSTRAINT "allergies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendance_nutrition_development"
    ADD CONSTRAINT "attendance_nutrition_development_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendance_symptoms"
    ADD CONSTRAINT "attendance_symptoms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendance_vitals"
    ADD CONSTRAINT "attendance_vitals_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendances"
    ADD CONSTRAINT "attendances_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."doctors"
    ADD CONSTRAINT "doctors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."medical_records"
    ADD CONSTRAINT "medical_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."medications"
    ADD CONSTRAINT "medications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_cpf_unique" UNIQUE ("cpf");



ALTER TABLE ONLY "public"."patients"
    ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vaccinations"
    ADD CONSTRAINT "vaccinations_patient_id_vaccine_name_dose_number_key" UNIQUE ("patient_id", "vaccine_name", "dose_number");



ALTER TABLE ONLY "public"."vaccinations"
    ADD CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("id");



CREATE INDEX "doctors_email_idx" ON "public"."doctors" USING "btree" ("email");



CREATE INDEX "idx_allergies_patient_id" ON "public"."allergies" USING "btree" ("patient_id");



CREATE INDEX "idx_medications_doctor_id" ON "public"."medications" USING "btree" ("doctor_id");



CREATE INDEX "idx_medications_patient_id" ON "public"."medications" USING "btree" ("patient_id");



CREATE INDEX "patients_cpf_idx" ON "public"."patients" USING "btree" ("cpf");



CREATE INDEX "vaccinations_doctor_id_idx" ON "public"."vaccinations" USING "btree" ("doctor_id");



CREATE INDEX "vaccinations_patient_id_idx" ON "public"."vaccinations" USING "btree" ("patient_id");



CREATE PUBLICATION "powersync" WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION "powersync" OWNER TO "postgres";




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."allergies";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."attendance_nutrition_development";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."attendance_symptoms";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."attendance_vitals";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."attendances";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."doctors";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."medical_records";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."medications";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."patients";



ALTER PUBLICATION "powersync" ADD TABLE ONLY "public"."vaccinations";



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


















































































































































































































GRANT ALL ON TABLE "public"."allergies" TO "anon";
GRANT ALL ON TABLE "public"."allergies" TO "authenticated";
GRANT ALL ON TABLE "public"."allergies" TO "service_role";



GRANT ALL ON TABLE "public"."attendance_nutrition_development" TO "anon";
GRANT ALL ON TABLE "public"."attendance_nutrition_development" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance_nutrition_development" TO "service_role";



GRANT ALL ON TABLE "public"."attendance_symptoms" TO "anon";
GRANT ALL ON TABLE "public"."attendance_symptoms" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance_symptoms" TO "service_role";



GRANT ALL ON TABLE "public"."attendance_vitals" TO "anon";
GRANT ALL ON TABLE "public"."attendance_vitals" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance_vitals" TO "service_role";



GRANT ALL ON TABLE "public"."attendances" TO "anon";
GRANT ALL ON TABLE "public"."attendances" TO "authenticated";
GRANT ALL ON TABLE "public"."attendances" TO "service_role";



GRANT ALL ON TABLE "public"."doctors" TO "anon";
GRANT ALL ON TABLE "public"."doctors" TO "authenticated";
GRANT ALL ON TABLE "public"."doctors" TO "service_role";



GRANT ALL ON TABLE "public"."medical_records" TO "anon";
GRANT ALL ON TABLE "public"."medical_records" TO "authenticated";
GRANT ALL ON TABLE "public"."medical_records" TO "service_role";



GRANT ALL ON TABLE "public"."medications" TO "anon";
GRANT ALL ON TABLE "public"."medications" TO "authenticated";
GRANT ALL ON TABLE "public"."medications" TO "service_role";



GRANT ALL ON TABLE "public"."patients" TO "anon";
GRANT ALL ON TABLE "public"."patients" TO "authenticated";
GRANT ALL ON TABLE "public"."patients" TO "service_role";



GRANT ALL ON TABLE "public"."vaccinations" TO "anon";
GRANT ALL ON TABLE "public"."vaccinations" TO "authenticated";
GRANT ALL ON TABLE "public"."vaccinations" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
