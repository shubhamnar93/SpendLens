import { baseProcedure, createTRPCRouter } from '../init';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { db } from '../../db/index';
import { audits, recommendations } from '../../db/schema';
import { runAudit as runAuditEngine } from '../../server/audit-engine/engine';
import {
  buildAuditSummaryPrompt,
  NvidiaChatResponse,
} from '../../server/audit-engine/auditSummaryPrompt';
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

      try {
        if (!db) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Database is not configured. Set DATABASE_URL and restart the app.',
          });
        }
        const { tools } = opts.input;
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

        const prompt = buildAuditSummaryPrompt({
          tools,
          totalMonthlySavings,
          totalAnnualSavings,
          totalCurrentSpend,
          insights: allInsights,
          recommendations: allRecommendations,
        });

        const response = await fetch(
          "https://integrate.api.nvidia.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              model: "mistralai/mistral-medium-3.5-128b",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.7,
              top_p: 1.0,
              stream: false,
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`NVIDIA API error: ${await response.text()}`);
        }

        const data = (await response.json()) as NvidiaChatResponse;
        const message = data?.choices?.[0]?.message?.content;

        const auditId = randomUUID();
        const shareLinkId = randomUUID();

        await db.insert(audits).values({
          id: auditId,
          userId: 'anonymous',
          monthlySaving: totalMonthlySavings,
          annualSaving: totalAnnualSavings,
          totalCurrentSpend,
          totalOptimizedSpend,
          summary: message,
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
            inputSavings: rec.inputSavings,
            outputSavings: rec.outputSavings,
            inputPrice: rec.InputPrice,
            outputPrice: rec.OutputPrice,
          })
        }

        return {
          shareLinkId,
          audit: {
            monthlySaving: totalMonthlySavings,
            annualSaving: totalAnnualSavings,
            totalCurrentSpend,
            totalOptimizedSpend,
            summary: message ?? allInsights.join('\n'),
            teamSize: tools.reduce((sum, tool) => sum + tool.teamSize, 0),
          }
        };
      } catch (error) {
        console.error('runAudit failed', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred while running the audit.',
        });
      }
    }),
  getAudit: baseProcedure.input(z.object({
    shareLinkId: z.string(),
  })).query(async (opts) => {
    if (!db) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database is not configured. Set DATABASE_URL and restart the app.',
      });
    }

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
