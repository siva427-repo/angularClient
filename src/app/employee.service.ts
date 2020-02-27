import { Injectable } from '@angular/core';
import {Employee} from './employee.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from './api.response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://n19w7ji62h.execute-api.us-east-2.amazonaws.com/dev/employee';
  constructor(private http: HttpClient) { }


  createEmployee(employee: Employee): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/post`,employee);
  }

  updateEmployee(emp: Employee): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/update`, emp);
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all`);
  }

  deleteEmployee(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getEmpById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/get/` + id);
  }
}
