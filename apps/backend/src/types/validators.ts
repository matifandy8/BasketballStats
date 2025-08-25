import { object, string, number, union, literal, uuid, pipe } from 'valibot';

export const ScheduleParamsSchema = object({
  year: number(), // vendrá como string, lo parseamos abajo
  type: union([literal('PRE'), literal('REG'), literal('CC'), literal('PST')])
});

export const PbpParamsSchema = object({
  gameId: pipe(string(), uuid())
});

export const parseYear = (raw: string) => {
  const y = Number(raw);
  if (!Number.isInteger(y) || y < 2000 || y > 2100) throw new Error('Invalid year');
  return y;
};