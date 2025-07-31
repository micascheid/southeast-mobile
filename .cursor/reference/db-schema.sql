

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


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."fisheries" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "last_updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."fisheries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."landings" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "fishery_id" "uuid" NOT NULL,
    "season_year" integer NOT NULL,
    "opening_date" timestamp without time zone NOT NULL,
    "closing_date" timestamp without time zone NOT NULL,
    "species" "text" NOT NULL,
    "avg_weight" numeric,
    "avg_price" numeric,
    "numbers" integer NOT NULL
);


ALTER TABLE "public"."landings" OWNER TO "postgres";


ALTER TABLE ONLY "public"."fisheries"
    ADD CONSTRAINT "fisheries_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."fisheries"
    ADD CONSTRAINT "fisheries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."landings"
    ADD CONSTRAINT "landings_fishery_id_season_year_species_key" UNIQUE ("fishery_id", "season_year", "species");



ALTER TABLE ONLY "public"."landings"
    ADD CONSTRAINT "landings_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_landings_fishery_year" ON "public"."landings" USING "btree" ("fishery_id", "season_year");



ALTER TABLE ONLY "public"."landings"
    ADD CONSTRAINT "landings_fishery_id_fkey" FOREIGN KEY ("fishery_id") REFERENCES "public"."fisheries"("id") ON DELETE CASCADE;



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."fisheries" TO "anon";
GRANT ALL ON TABLE "public"."fisheries" TO "authenticated";
GRANT ALL ON TABLE "public"."fisheries" TO "service_role";



GRANT ALL ON TABLE "public"."landings" TO "anon";
GRANT ALL ON TABLE "public"."landings" TO "authenticated";
GRANT ALL ON TABLE "public"."landings" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






RESET ALL;
