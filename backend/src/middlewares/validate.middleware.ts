import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';
import { HttpError } from '../errors/http-error.js';

type RequestPart = 'body' | 'params' | 'query';
export const validate = (schema: ZodType, part: RequestPart) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const result = schema.safeParse(request[part]);
    if (!result.success) {
      next(new HttpError(400, 'Solicitud inválida', result.error.flatten()));
      return;
    }
    response.locals[part] = result.data;
    next();
  };
