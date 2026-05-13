import { baseProcedure, createTRPCRouter } from '../init';
import { z } from 'zod';
import { db } from '../../db/index';
import { audits, recommendations } from '../../db/schema';
import { runAudit as runAuditEngine } from '../../server/audit-engine/engine';
import { randomUUID } from 'crypto';

const auditInputSchema = z.object({
  toolName: z.string(),
  planName: z.string(),
  currentSpend: z.number().optional(),
  InputPrice: z.number().optional(),
  OutputPrice: z.number().optional(),
  usageLevel: z.enum(['low', 'medium', 'high']),
  teamSize: z.number(),
  primaryUseCase: z.enum(['coding', 'writing', 'research', 'mixed', 'data', 'api']),
});

export const auditRouter = createTRPCRouter({
  runAudit: baseProcedure
    .input(z.object({
      tools: z.array(auditInputSchema).min(1),
    }))
    .mutation(async (opts) => {
      const { tools } = opts.input;
      console.log('with tools', tools)

      const runResults = tools.map((toolInput) => runAuditEngine(toolInput));
      const allRecommendations = runResults.flatMap((result) =>
        result.recommendations.map((rec) => ({
          ...rec,
          category: rec.category ?? 'mixed',
        })),
      );
      const allInsights = runResults.flatMap((result) => result.insights);

      const totalMonthlySavings = runResults.reduce(
        (sum, result) => sum + (result.totalMonthlySavings ?? 0),
        0,
      );
      const totalAnnualSavings = runResults.reduce(
        (sum, result) => sum + (result.totalAnnualSavings ?? 0),
        0,
      );
      const totalCurrentSpend = tools.reduce(
        (sum, tool) => sum + (tool.currentSpend ?? 0),
        0,
      );
      const totalOptimizedSpend = totalCurrentSpend - totalMonthlySavings;

      const auditId = randomUUID();
      const shareLinkId = randomUUID();

      await db.insert(audits).values({
        id: auditId,
        userId: 'anonymous',
        monthlySaving: totalMonthlySavings,
        annualSaving: totalAnnualSavings,
        totalCurrentSpend,
        totalOptimizedSpend,
        summary: allInsights.join('\n'),
        teamSize: tools.reduce((sum, tool) => sum + tool.teamSize, 0),
        shareLinkId,
      });
      for (const rec of allRecommendations) {
        await db.insert(recommendations).values({
          id: randomUUID(),
          action: rec.action,
          reason: rec.reason,
          toolName: rec.toolName,
          currentSpend: rec.currentSpend,
          newSpend: rec.newSpend,
          auditId,
          savings: rec.savings,
          category: rec.category,
          planName: rec.planName,
          usageBudget: rec.usageBudget,
        })
      }

      return {
        shareLinkId,
        audit: {
          monthlySaving: totalMonthlySavings,
          annualSaving: totalAnnualSavings,
          totalCurrentSpend,
          totalOptimizedSpend,
          summary: allInsights.join('\n'),
          teamSize: tools.reduce((sum, tool) => sum + tool.teamSize, 0),
        }
      };
    }),
  getAudit: baseProcedure.input(z.object({
    shareLinkId: z.string(),
  })).query(async (opts) => {
    const { shareLinkId } = opts.input
    const audit = await db.query.audits.findFirst({
      where: (audit, { eq }) => eq(audit.shareLinkId, shareLinkId),
    })
    const recommendations = await db.query.recommendations.findMany({
      where: (rec, { eq }) => eq(rec.auditId, audit?.id ?? ''),
    })
    if (!audit) return null
    return { audit, recommendations }
  }),
});

export type auditRouter = typeof auditRouter;
