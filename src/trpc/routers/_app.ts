import { createTRPCRouter } from '../init';
import { auditRouter } from './audit';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
  audit: auditRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
