import { Request, Response } from 'express';

export function errorMiddleware(err: Error, _req: Request, res: Response) {
  console.error(err);
  res.status(500).json({
    error: 'InternalServerError',
    message: err?.message ?? 'Unexpected error',
  });
}
