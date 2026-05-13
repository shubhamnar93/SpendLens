ALTER TABLE "recommendations" RENAME COLUMN "use_case" TO "category";--> statement-breakpoint
ALTER TABLE "recommendations" ADD COLUMN "plan_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "recommendations" ADD COLUMN "usage_budget" text NOT NULL;