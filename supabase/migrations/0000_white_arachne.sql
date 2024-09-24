CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"tattooId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tattoo" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"document" text NOT NULL,
	"birthday" text NOT NULL,
	"whereFoundUs" text,
	"healthRQ1" text NOT NULL,
	"healthQ1" text,
	"healthRQ2" text NOT NULL,
	"healthQ2" text,
	"healthRQ3" text NOT NULL,
	"healthQ3" text,
	"healthRQ4" text NOT NULL,
	"healthQ4" text,
	"beforeProcedureRQ1" text NOT NULL,
	"beforeProcedureRQ2" text NOT NULL,
	"beforeProcedureRQ3" text NOT NULL,
	"beforeProcedureRQ4" text NOT NULL,
	"art" text NOT NULL,
	"price" text NOT NULL,
	"bodyPart" text NOT NULL,
	"afterProcedureRQ1" boolean NOT NULL,
	"afterProcedureRQ2" boolean NOT NULL,
	"afterProcedureRQ3" boolean,
	"artistSignature" text NOT NULL,
	"clientSignature" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "note" ADD CONSTRAINT "note_tattooId_tattoo_id_fk" FOREIGN KEY ("tattooId") REFERENCES "public"."tattoo"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
