import { baseProcedure, createTRPCRouter } from '../init';
import { z } from 'zod';
import { db } from '../../db/index';
import { users, audits } from '../../db/schema';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import nodemailer from 'nodemailer'; // 1. Import nodemailer

// 2. Initialize the SMTP transporter once
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const userRouter = createTRPCRouter({
  createUser: baseProcedure
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
      const user = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      })
      const userId = user?.id ? user.id : randomUUID();
      if (!user) {
        const res = await db.insert(users).values({
          id: userId,
          email: email,
          companyName,
          role,
          teamSize,
          consultationRequested: isConsulting,
        })
        console.log(res)
      }

      await db
        .update(audits)
        .set({
          userId: userId,
        })
        .where(eq(audits.shareLinkId, shareLinkId))
        .returning()
      let subject = ""
      let text = ""
      let html = ""
      if (isConsulting) {
        // Consulting users → partner will contact them
        subject = `Consulting request genrated Successfully`
        text = `Hello,
Your consulting request has been initiated.
Our partner Credex will shortly reach out to you.
`;

        html = `
    <p>Hello,</p>
    <p>Your audit has been initiated.</p>
    <p>Our partner <b>Credex</b> will shortly reach out to you.</p>
  `;
      } else {
        // Non-consulting users → report coming soon + partner offer
        subject = `Download request genrated Successfully`
        text = `Hello,
Your download request has been initiated.
We will shortly send your audit report.
In the meantime, you can check our partner Credex to save up to 60% on AI models & cloud credits.
`;

        html = `
    <p>Hello,</p>
    <p>Your audit has been initiated.</p>
    <p>We will shortly send your audit report.</p>
    <p>
      In the meantime, check our partner 
      <a href="https://credex.rocks/" target="_blank">
        Credex
      </a> to save up to <b>60%</b> on AI models & cloud credits.
    </p>
  `;
      }
      try {
        await transporter.sendMail({
          from: `"Audit Team" <${process.env.SMTP_FROM}>`,
          to: email,
          subject,
          text,
          html,
        });
      } catch (error) {
        // Log error but don't fail the registration mutation
        console.error('SMTP Email transmission error:', error);
      }


      return;
    }),
})

export type userRouter = typeof userRouter;
