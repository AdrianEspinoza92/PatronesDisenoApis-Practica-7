import type { CreateEmployee, Employee, EmployeePage, UpdateEmployee } from '../domain/employee.js';

export interface IEmployeeRepository {
  findAll(page: number, limit: number): Promise<EmployeePage>;
  findById(id: string): Promise<Employee | null>;
  create(input: CreateEmployee): Promise<Employee>;
  update(id: string, input: UpdateEmployee): Promise<Employee | null>;
  delete(id: string): Promise<boolean>;
}
