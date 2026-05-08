-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT,
    "role" TEXT,
    "teamSize" INTEGER,
    "consultationRequested" BOOLEAN NOT NULL DEFAULT false,
    "consultationCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthlySaving" DOUBLE PRECISION,
    "annualSaving" DOUBLE PRECISION,
    "totalCurrentSpend" DOUBLE PRECISION,
    "totalOptimizedSpend" DOUBLE PRECISION,
    "summary" TEXT,
    "teamSize" INTEGER,
    "shareLinkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "useCase" TEXT,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL,
    "auditId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "currentSpend" DOUBLE PRECISION,
    "newSpend" DOUBLE PRECISION,
    "savings" DOUBLE PRECISION,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Audit_shareLinkId_key" ON "Audit"("shareLinkId");

-- CreateIndex
CREATE INDEX "Audit_userId_idx" ON "Audit"("userId");

-- CreateIndex
CREATE INDEX "Tool_auditId_idx" ON "Tool"("auditId");

-- CreateIndex
CREATE INDEX "Recommendation_auditId_idx" ON "Recommendation"("auditId");

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
