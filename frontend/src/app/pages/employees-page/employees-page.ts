import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { EmployeeListComponent } from '../../components/employee-list/employee-list';
import type { Employee, EmployeeInput } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-page',
  imports: [AsyncPipe, EmployeeFormComponent, EmployeeListComponent],
  templateUrl: './employees-page.html',
  styleUrl: './employees-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  private readonly service = inject(EmployeeService);
  readonly employees$ = this.service.employees$;
  readonly loading$ = this.service.loading$;
  readonly error$ = this.service.error$;
  selected: Employee | null = null;

  constructor() { this.service.load(); }
  select(employee: Employee): void { this.selected = { ...employee }; }
  cancel(): void { this.selected = null; }
  save(input: EmployeeInput): void {
    if (this.selected) this.service.update(this.selected.id, input);
    else this.service.create(input);
    this.selected = null;
  }
  remove(id: string): void { this.service.delete(id); }
}
