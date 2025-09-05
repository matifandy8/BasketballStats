import { BaseSchema, safeParse, BaseIssue } from 'valibot';
import { RequestHandler } from 'express';

type RequestData = 'params' | 'query' | 'body';

export const validate =
  <T, K extends RequestData = 'params'>(
    schema: BaseSchema<T, T, BaseIssue<unknown>>,
    pick?: K
  ): RequestHandler =>
  (req, res, next) => {
    const key = pick || 'params';
    const data = req[key] as unknown;
    const result = safeParse(schema, data);

    if (!result.success) {
      return res.status(400).json({ error: 'ValidationError', issues: result.issues });
    }

    (req[key] as unknown) = result.output;
    next();
  };
