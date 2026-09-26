import { Router } from 'express';
import type { EmployeeController } from '../controllers/employee.controller.js';
import { createEmployeeSchema, employeeIdSchema, employeeQuerySchema, updateEmployeeSchema } from '../dtos/employee.dto.js';
import { validate } from '../middlewares/validate.middleware.js';

export const createEmployeeRouter = (controller: EmployeeController): Router => {
  const router = Router();
  router.get('/', validate(employeeQuerySchema, 'query'), controller.getAll);
  router.post('/', validate(createEmployeeSchema, 'body'), controller.create);
  router.get('/:id', validate(employeeIdSchema, 'params'), controller.getById);
  router.put('/:id', validate(employeeIdSchema, 'params'), validate(createEmployeeSchema, 'body'), controller.update);
  router.patch('/:id', validate(employeeIdSchema, 'params'), validate(updateEmployeeSchema, 'body'), controller.update);
  router.delete('/:id', validate(employeeIdSchema, 'params'), controller.delete);
  return router;
};
