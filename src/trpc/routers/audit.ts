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
      const allRecommendations = runResults.flatMap((result) => result.recommendations);
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
        userId: null,

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
        })
      }

      return {
        shareLinkId,
      };
    }),
});

export type auditRouter = typeof auditRouter;
