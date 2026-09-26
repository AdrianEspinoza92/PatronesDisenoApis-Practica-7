import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Employee, EmployeeInput } from '../../models/employee';

const emptyEmployee = (): EmployeeInput => ({ nombre: '', cargo: '', departamento: '', sueldo: 0 });

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnChanges {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<EmployeeInput>();
  @Output() cancel = new EventEmitter<void>();
  form: EmployeeInput = emptyEmployee();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.form = this.employee
        ? { nombre: this.employee.nombre, cargo: this.employee.cargo, departamento: this.employee.departamento, sueldo: this.employee.sueldo }
        : emptyEmployee();
    }
  }

  submit(): void {
    this.save.emit({ ...this.form });
    if (!this.employee) this.form = emptyEmployee();
  }
}
