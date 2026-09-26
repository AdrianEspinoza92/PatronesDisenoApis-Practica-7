import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import type { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CurrencyPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  @Input({ required: true }) employees: readonly Employee[] = [];
  @Output() edit = new EventEmitter<Employee>();
  @Output() remove = new EventEmitter<string>();
}
