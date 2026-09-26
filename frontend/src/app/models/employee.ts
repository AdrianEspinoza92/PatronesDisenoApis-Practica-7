export interface Employee {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
}

export type EmployeeInput = Omit<Employee, 'id'>;
export interface ApiResponse<T> { success: boolean; message: string; data: T; errors?: unknown; }
export interface EmployeePage { items: Employee[]; total: number; page: number; limit: number; pages: number; }
