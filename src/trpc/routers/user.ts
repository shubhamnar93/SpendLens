import { baseProcedure, createTRPCRouter } from '../init';
import { z } from 'zod';
import { db } from '../../db/index';
import { users, audits } from '../../db/schema';
import { runAudit as runAuditEngine } from '../../server/audit-engine/engine';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import OpenAI from 'openai';

export const userRouter = createTRPCRouter({
  runAudit: baseProcedure
    .input(z.object({
      email: z.string(),
      companyName: z.string().optional(),
      role: z.string().optional(),
      teamSize: z.number().optional(),
      isConsulting: z.boolean().optional(),
      shareLinkId: z.string(),
    }))
    .mutation(async (opts) => {
      if (!db) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database is not configured. Set DATABASE_URL and restart the app.',
        });
      }
      const { email, companyName, role, teamSize, isConsulting, shareLinkId } = opts.input;
      const userId = randomUUID();

      await db.insert(users).values({
        id: userId,
        email: email,
        companyName,
        role,
        teamSize,
        consultationRequested: isConsulting,
      })

      await db
        .update(audits)
        .set({
          userId: userId,
        })
        .where(eq(audits.shareLinkId, shareLinkId))
        .returning()

      return;
    }),
})

export type userRouter = typeof userRouter;
