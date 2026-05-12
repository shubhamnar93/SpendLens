import { relations } from "drizzle-orm"
import { users, audits, tools, recommendations } from "./schema"

/* User → Audits */
export const userRelations = relations(users, ({ many }) => ({
  audits: many(audits),
}))

/* Audit → User + children */
export const auditRelations = relations(audits, ({ one, many }) => ({
  user: one(users, {
    fields: [audits.userId],
    references: [users.id],
  }),
  tools: many(tools),
  recommendations: many(recommendations),
}))

/* Tool → Audit */
export const toolRelations = relations(tools, ({ one }) => ({
  audit: one(audits, {
    fields: [tools.auditId],
    references: [audits.id],
  }),
}))

/* Recommendation → Audit */
export const recommendationRelations = relations(recommendations, ({ one }) => ({
  audit: one(audits, {
    fields: [recommendations.auditId],
    references: [audits.id],
  }),
}))
