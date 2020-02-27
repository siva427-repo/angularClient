import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Router} from '@angular/router';
import {Employee} from '../employee.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private employeeServie: EmployeeService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      // title: ['', Validators.required],
      id : ['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.employeeServie.createEmployee(this.addForm.value)
      .subscribe(data => {
        console.log(data);
        this.gotList();
      }, error => console.log(error));

  }

  gotList() {
    this.router.navigate(['employeeList']);
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }
}
