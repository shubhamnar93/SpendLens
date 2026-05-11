import { initTRPC } from '@trpc/server';

/**
 * This context creator is used to define the context for tRPC procedures.
 * It accepts headers which can be used for authentication or other purposes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTRPCContext = async (_opts: { headers: Headers }) => {
  return { userId: 'user_123' };
};

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC
  .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
  });

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
