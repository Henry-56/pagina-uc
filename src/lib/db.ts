import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL || '';

const client = new Pool({ connectionString });

export const db =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: new PrismaPg(client),
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
