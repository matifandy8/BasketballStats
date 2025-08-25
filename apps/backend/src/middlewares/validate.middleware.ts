import { BaseSchema, safeParse } from 'valibot';
import { Request, Response, NextFunction } from 'express';

export const validate =
  <T>(schema: BaseSchema<T, T, any>, pick: 'params' | 'query' | 'body' = 'params') =>
    (req: Request, res: Response, next: NextFunction) => {
      const data = (req as any)[pick];
      const result = safeParse(schema, data);
      if (!result.success) {
        return res.status(400).json({ error: 'ValidationError', issues: result.issues });
      }
      (req as any)[pick] = result.output ?? data;
      next();
    };
