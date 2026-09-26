import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  cargo: { type: String, required: true, trim: true },
  departamento: { type: String, required: true, trim: true },
  sueldo: { type: Number, required: true, min: 0 },
}, { timestamps: true, versionKey: false });

employeeSchema.set('toJSON', {
  transform: (_document, value: Record<string, unknown>) => {
    value.id = String(value._id);
    delete value._id;
    return value;
  },
});

export const EmployeeModel = model('Employee', employeeSchema);
