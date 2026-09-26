import type { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpError } from '../errors/http-error.js';
import { errorResponse } from '../http/api-response.js';

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json(errorResponse('Ruta no encontrada'));
};
export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.status).json(errorResponse(error.message, error.details));
    return;
  }
  console.error(error);
  response.status(500).json(errorResponse('Error interno del servidor'));
};
