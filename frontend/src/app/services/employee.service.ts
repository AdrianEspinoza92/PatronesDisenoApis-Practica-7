import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, catchError, finalize, map, tap } from 'rxjs';
import type { ApiResponse, Employee, EmployeeInput, EmployeePage } from '../models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://18-217-123-146.nip.io/api/v1/employees';
  private readonly employeesSubject = new BehaviorSubject<readonly Employee[]>([]);
  private readonly loadingSubject = new BehaviorSubject(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly employees$ = this.employeesSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  load(): void {
    this.run(this.http.get<ApiResponse<EmployeePage>>(this.apiUrl).pipe(
      map((response) => response.data.items),
      tap((employees) => this.employeesSubject.next([...employees])),
    ));
  }

  create(input: EmployeeInput): void {
    this.run(this.http.post<ApiResponse<Employee>>(this.apiUrl, input).pipe(
      map((response) => response.data),
      tap((employee) => this.employeesSubject.next([...this.employeesSubject.value, employee])),
    ));
  }

  update(id: string, input: EmployeeInput): void {
    this.run(this.http.put<ApiResponse<Employee>>(`${this.apiUrl}/${id}`, input).pipe(
      map((response) => response.data),
      tap((updated) => this.employeesSubject.next(
        this.employeesSubject.value.map((employee) => employee.id === id ? { ...updated } : employee),
      )),
    ));
  }

  delete(id: string): void {
    this.run(this.http.delete<ApiResponse<{ id: string }>>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.employeesSubject.next(this.employeesSubject.value.filter((employee) => employee.id !== id))),
    ));
  }

  private run(request$: import('rxjs').Observable<unknown>): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    request$.pipe(
      catchError((error: { error?: { message?: string } }) => {
        this.errorSubject.next(error.error?.message ?? 'No fue posible conectar con la API');
        return EMPTY;
      }),
      finalize(() => this.loadingSubject.next(false)),
    ).subscribe();
  }
}
