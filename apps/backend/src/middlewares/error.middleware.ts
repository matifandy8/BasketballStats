import { Request, Response } from 'express';
import logger from '../utils/logger';

export function errorMiddleware(err: Error, _req: Request, res: Response) {
  logger.error(err);
  res.status(500).json({
    error: 'InternalServerError',
    message: err?.message ?? 'Unexpected error',
  });
}
