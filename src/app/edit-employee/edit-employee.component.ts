import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee;
  updateForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private employeeServie: EmployeeService) {
  }

  ngOnInit() {
    let empId = window.localStorage.getItem('editEmpId');
    if (!empId) {
      alert('invalid action')
      this.router.navigate(['employeeList']);
      return;
    }
    this.updateForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      // active: ['', Validators.required]
    });
    this.employeeServie.getEmpById(+empId)
      .subscribe(data => {
        this.updateForm.setValue(data);
      });
  }

  get f() {
    return this.updateForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.employeeServie.updateEmployee(this.updateForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['employeeList']);
          /*if(data.status === 200) {
            this.router.navigate(['employeeList']);
          }else {
            alert(data.message);
          }*/
        }, error => {
          alert(error);
        });
  }

  gotList() {
    this.router.navigate(['employeeList']);
  }

}
