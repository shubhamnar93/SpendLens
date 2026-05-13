import { relations } from "drizzle-orm"
import { users, audits, recommendations } from "./schema"

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
  recommendations: many(recommendations),
}))

/* Recommendation → Audit */
export const recommendationRelations = relations(recommendations, ({ one }) => ({
  audit: one(audits, {
    fields: [recommendations.auditId],
    references: [audits.id],
  }),
}))
