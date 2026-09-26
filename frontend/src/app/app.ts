import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeesPageComponent } from './pages/employees-page/employees-page';

@Component({ selector: 'app-root', imports: [EmployeesPageComponent], template: '<app-employees-page />', changeDetection: ChangeDetectionStrategy.OnPush })
export class App {}
