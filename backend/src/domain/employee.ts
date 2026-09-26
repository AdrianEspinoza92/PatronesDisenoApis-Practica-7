export interface Employee {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateEmployee = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEmployee = Partial<CreateEmployee>;
export interface EmployeePage { items: Employee[]; total: number; page: number; limit: number; pages: number; }
