CREATE TABLE "audits" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"monthly_saving" real,
	"annual_saving" real,
	"total_current_spend" real,
	"total_optimized_spend" real,
	"summary" text,
	"team_size" integer,
	"share_link_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"id" text PRIMARY KEY NOT NULL,
	"audit_id" text NOT NULL,
	"tool_name" text NOT NULL,
	"action" text NOT NULL,
	"reason" text NOT NULL,
	"current_spend" real,
	"new_spend" real,
	"savings" real
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" text PRIMARY KEY NOT NULL,
	"audit_id" text NOT NULL,
	"tool_name" text NOT NULL,
	"seats" integer NOT NULL,
	"use_case" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"company_name" text,
	"role" text,
	"team_size" integer,
	"consultation_requested" boolean DEFAULT false NOT NULL,
	"consultation_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "audit_user_idx" ON "audits" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "audit_share_link_unique" ON "audits" USING btree ("share_link_id");--> statement-breakpoint
CREATE INDEX "rec_audit_idx" ON "recommendations" USING btree ("audit_id");--> statement-breakpoint
CREATE INDEX "tool_audit_idx" ON "tools" USING btree ("audit_id");