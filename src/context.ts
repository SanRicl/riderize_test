import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  token?: string;
}

export const context = ({ req }: { req: Request }): Context => {
  const context = {
    req,
    token: req?.headers?.authorization,
  };
  return {
    token: context.token,
    prisma,
  };
};
