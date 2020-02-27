import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Observable} from 'rxjs';
import {Employee} from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  constructor(private router: Router,  private employeeServie: EmployeeService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeServie.getEmployeeList();
  }

  deleteEmployee(id: number) {
    this.employeeServie.deleteEmployee(id)
      .subscribe(
        data => {
          console.log("===="+data);
          this.reloadData();
       },
        error => console.log(error));
  }

  editEmployee(emp: Employee): void {
    window.localStorage.removeItem('editEmpId');
    window.localStorage.setItem('editEmpId', emp.id.toString());
    this.router.navigate(['editEmployee']);
  }

  gotList() {
    this.router.navigate(['employeeList']);
  }
}
