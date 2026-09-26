import type { NextFunction, Request, Response } from 'express';
import type { CreateEmployee, UpdateEmployee } from '../domain/employee.js';
import { HttpError } from '../errors/http-error.js';
import { successResponse } from '../http/api-response.js';
import type { IEmployeeRepository } from '../repositories/employee.repository.js';

export class EmployeeController {
  constructor(private readonly repository: IEmployeeRepository) {}
  getAll = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = response.locals['query'] as { page: number; limit: number };
      response.json(successResponse('Empleados obtenidos', await this.repository.findAll(page, limit)));
    } catch (error) { next(error); }
  };
  getById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = response.locals['params'] as { id: string };
      const employee = await this.repository.findById(id);
      if (!employee) throw new HttpError(404, 'Empleado no encontrado');
      response.json(successResponse('Empleado obtenido', employee));
    } catch (error) { next(error); }
  };
  create = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const employee = await this.repository.create(response.locals['body'] as CreateEmployee);
      response.status(201).json(successResponse('Empleado creado', employee));
    } catch (error) { next(error); }
  };
  update = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = response.locals['params'] as { id: string };
      const employee = await this.repository.update(id, response.locals['body'] as UpdateEmployee);
      if (!employee) throw new HttpError(404, 'Empleado no encontrado');
      response.json(successResponse('Empleado actualizado', employee));
    } catch (error) { next(error); }
  };
  delete = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = response.locals['params'] as { id: string };
      if (!(await this.repository.delete(id))) throw new HttpError(404, 'Empleado no encontrado');
      response.json(successResponse('Empleado eliminado', { id }));
    } catch (error) { next(error); }
  };
}
