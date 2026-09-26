import { z } from 'zod';

const textField = z.string().trim().min(3, 'Debe contener al menos 3 caracteres').max(100);
export const employeeIdSchema = z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'El ID no es un ObjectId válido') });
export const createEmployeeSchema = z.object({
  nombre: textField,
  cargo: textField,
  departamento: textField,
  sueldo: z.number().finite().nonnegative('El sueldo no puede ser negativo'),
}).strict();
export const updateEmployeeSchema = createEmployeeSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  'Debe proporcionar al menos un campo',
);
export const employeeQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
