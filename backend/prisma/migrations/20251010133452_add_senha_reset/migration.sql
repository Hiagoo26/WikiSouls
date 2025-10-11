-- CreateTable
CREATE TABLE "SenhaReset" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiaEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SenhaReset_pkey" PRIMARY KEY ("id")
);
