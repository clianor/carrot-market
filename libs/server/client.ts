import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient;
}

const client: PrismaClient = global.client || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
