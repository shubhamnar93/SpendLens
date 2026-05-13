import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

/* ======================================================
   USERS
====================================================== */

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  email: text("email").notNull().unique(),

  companyName: text("company_name"),
  role: text("role"),
  teamSize: integer("team_size"),

  consultationRequested: boolean("consultation_requested")
    .default(false)
    .notNull(),

  consultationCompleted: boolean("consultation_completed")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

/* ======================================================
   AUDITS
====================================================== */

export const audits = pgTable(
  "audits",
  {
    id: text("id").primaryKey().notNull(),

    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" }),

    monthlySaving: real("monthly_saving"),
    annualSaving: real("annual_saving"),
    totalCurrentSpend: real("total_current_spend"),
    totalOptimizedSpend: real("total_optimized_spend"),

    summary: text("summary"),
    teamSize: integer("team_size"),

    shareLinkId: text("share_link_id"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("audit_user_idx").on(table.userId),
    shareLinkUnique: uniqueIndex("audit_share_link_unique").on(
      table.shareLinkId
    ),
  })
)

/* ======================================================
   RECOMMENDATIONS
====================================================== */

export const recommendations = pgTable(
  "recommendations",
  {
    id: text("id").primaryKey().notNull(),

    auditId: text("audit_id")
      .notNull()
      .references(() => audits.id, { onDelete: "cascade" }),

    toolName: text("tool_name").notNull(),
    action: text("action").notNull(),
    reason: text("reason").notNull(),
    inputSavings: real("input_savings"),
    outputSavings: real("output_savings"),
    inputPrice: real("input_price"),
    outputPrice: real("output_price"),

    category: text("category").notNull(),
    planName: text("plan_name").notNull(),
    usageBudget: text("usage_budget").notNull(),
    currentSpend: real("current_spend"),
    newSpend: real("new_spend"),
    savings: real("savings"),
  },
  (table) => ({
    auditIdx: index("rec_audit_idx").on(table.auditId),
  })
)

/* ======================================================
   RELATIONS (for Drizzle joins)
====================================================== */

export const usersRelations = relations(users, ({ many }) => ({
  audits: many(audits),
}))

export const auditsRelations = relations(audits, ({ one, many }) => ({
  user: one(users, {
    fields: [audits.userId],
    references: [users.id],
  }),
  recommendations: many(recommendations),
}))


export const recommendationsRelations = relations(
  recommendations,
  ({ one }) => ({
    audit: one(audits, {
      fields: [recommendations.auditId],
      references: [audits.id],
    }),
  })
)
