import type { CreateEmployee, Employee, EmployeePage, UpdateEmployee } from '../domain/employee.js';
import { EmployeeModel } from '../models/employee.model.js';
import type { IEmployeeRepository } from './employee.repository.js';

const serialize = (document: { toJSON(): unknown }): Employee => document.toJSON() as Employee;

export class MongooseEmployeeRepository implements IEmployeeRepository {
  async findAll(page: number, limit: number): Promise<EmployeePage> {
    const [documents, total] = await Promise.all([
      EmployeeModel.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      EmployeeModel.countDocuments(),
    ]);
    return { items: documents.map(serialize), total, page, limit, pages: Math.ceil(total / limit) };
  }
  async findById(id: string): Promise<Employee | null> {
    const document = await EmployeeModel.findById(id);
    return document ? serialize(document) : null;
  }
  async create(input: CreateEmployee): Promise<Employee> {
    return serialize(await EmployeeModel.create(input));
  }
  async update(id: string, input: UpdateEmployee): Promise<Employee | null> {
    const document = await EmployeeModel.findByIdAndUpdate(id, input, { new: true, runValidators: true });
    return document ? serialize(document) : null;
  }
  async delete(id: string): Promise<boolean> {
    return (await EmployeeModel.findByIdAndDelete(id)) !== null;
  }
}
